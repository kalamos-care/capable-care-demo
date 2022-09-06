import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Radio,
  RadioGroup,
  Skeleton,
  TextareaAutosize,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Sentry from "@sentry/react";
import CircleIcon from "@mui/icons-material/Circle";

import { BackButton, StyledCard } from "../components";
import { useCurrentPatient, useSurvey } from "../fetchDataHooks";
import api from "../capableApi";
import ErrorMessage from "../components/ErrorMessage";
import groupBy from "../utils/groupBy";
import PrimaryHeader from "../components/PrimaryHeader";

// NOTE: Due to us using a mixture of <input>, MUI <TextareaAutosize>
//       and <TextField>, we need to set a consistent border style.
// TODO: Find a better way to do this. 🤮
const COMMON_BORDER_STYLES = {
  border: "solid",
  borderColor: "#C4C4C4",
  borderRadius: "3px",
  borderWidth: "1px",
};

function CommentInput(props) {
  const style = {
    minHeight: "75px",
    width: "100%",
    marginTop: "0.5rem",
    outlineColor: process.env.REACT_APP_COLOR,
    ...COMMON_BORDER_STYLES,
  };

  return <TextareaAutosize style={style} {...props} />;
}

// Date input for the Survey.
function DateInput(props) {
  const style = {
    fontSize: "0.9rem",
    padding: "0.3rem",
    width: "100%",
    marginTop: "0.5rem",
    outlineColor: process.env.REACT_APP_COLOR,
    ...COMMON_BORDER_STYLES,
  };

  return <input type="date" style={style} {...props} />;
}

// Phone number input for Survey.
function PhoneNumberInput(props) {
  const style = {
    fontSize: "0.9rem",
    padding: "0.3rem",
    width: "100%",
    marginTop: "0.5rem",
    textAlign: "right",
    outlineColor: process.env.REACT_APP_COLOR,
    ...COMMON_BORDER_STYLES,
  };

  // Set a custom invalid message.
  const setInvalidMessage = (event) => {
    const invalidMessage = "The required format is E.164. e.g. +15551234567";
    event.target.setCustomValidity(invalidMessage);
  };
  const resetInvalidMessage = (event) => event.target.setCustomValidity("");

  return (
    <input
      type="tel"
      style={style}
      pattern="^\+[0-9]{11}$"
      onInvalid={setInvalidMessage}
      onInput={resetInvalidMessage}
      {...props}
    />
  );
}

function MultipleChoiceInput({ name, answers, handleAnswers }) {
  const [selectedAnswers, setSelectedAnswers] = useState(new Set());

  // NOTE: The CapableHealth api expects the answers to MultipleChoice
  // questions to be formatted differently to other Question types.
  // It's similar to SingleChoice but with multiple answers so we
  // have a MultipleChoice specific onChange function.
  // 1. Update the state for the MultipleChoiceInput.
  // 2. Format the selected answers to match what the CapableHealth api
  //    will accept.
  // 3. Update the SurveyForm state with these formatted answers.
  const onChange = (e) => {
    const selected = e.target.checked;
    const answerId = e.target.value;

    setSelectedAnswers((state) => {
      selected ? state.add(answerId) : state.delete(answerId);
      return state;
    });

    // Capable is expecting an array of objects, each with the key `answer_id`.
    // One object for each selected answer.
    const responses = [];
    selectedAnswers.forEach((answerId) =>
      responses.push({ answer_id: answerId })
    );

    // Update the SurveyForm's state with the formatted selected answers
    // for this question.
    handleAnswers(name, responses);
  };

  return (
    <FormGroup>
      {answers.map((answer) => {
        return (
          <FormControlLabel
            key={answer.id}
            control={
              <Checkbox name={name} value={answer.id} onChange={onChange} />
            }
            label={answer.title}
          />
        );
      })}
    </FormGroup>
  );
}

function NumberInput(props) {
  const inputProps = {
    style: {
      fontSize: "0.9rem",
      padding: "0.5rem",
      textAlign: "right",
    },
  };

  return (
    <TextField
      type="number"
      fullWidth
      sx={{ marginTop: "0.5rem" }}
      inputProps={inputProps}
      {...props}
    />
  );
}

function ScaleInput({
  answerValue,
  name,
  onChange,
  required,
  min = 1,
  max = 5,
}) {
  if (min >= max)
    console.error("You are providing a min that is >= to the max.");

  const optionButtons = [];
  for (let num = min; num <= max; num++) {
    optionButtons.push(
      <ToggleButton
        name={name}
        key={num}
        // Note: Material UI requires a string as the value, for some reason....
        value={num.toString()}
        aria-label={num}
      >
        {num}
      </ToggleButton>
    );
  }

  const value = answerValue ? answerValue[0].content : "";

  return (
    <>
      {/*
      NOTE: Being a little sneaky here. MUI's ToggleButtonGroup doesn't take
            a `required` prop so in order to make this field required I'm
            adding a hidden `<input>`.
    */}
      <input
        type="hidden"
        name="validation-input"
        required={required}
        value={value}
      />
      <ToggleButtonGroup
        value={value}
        color="primary"
        fullWidth
        exclusive
        onChange={onChange}
        aria-label="scale question"
        sx={{ marginTop: "0.5rem" }}
      >
        {optionButtons}
      </ToggleButtonGroup>
    </>
  );
}

function SingleChoiceInput({ answers, handleAnswers, name }) {
  // NOTE: The CapableHealth api expects the answers to SingleChoice
  // questions to be formatted differently to other Question types.
  // It's similar to MultipleChoice but with only one answer so we
  // have a SingleChoice specific onChange function.
  // 1. Format the selected answers to match what the CapableHealth api
  //    will accept.
  // 2. Update the SurveyForm state with these formatted answers.
  const onChange = (e) => {
    // Capable is expecting an array of objects, each with the key `answer_id`.
    // One object for each selected answer. For single choice there is only one
    // answer so we can submit the latest.
    const responses = [{ answer_id: e.target.value }];

    // Update the SurveyForm's state with the formatted selected answers
    // for this question.
    handleAnswers(name, responses);
  };

  return (
    <FormControl>
      <RadioGroup name={name} onChange={onChange}>
        {answers.map((answer) => (
          <FormControlLabel
            key={answer.id}
            value={answer.id}
            control={<Radio />}
            label={answer.title}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

function AnswerInput(props) {
  const {
    handleAnswers,
    question: { id: name, required, type, answers, metadata },
    answerValue,
  } = props;

  // Format the answers to match what the CapableHealth api will accept.
  // NOTE: MultipleChoiceQuestion & SingleChoiceQuestion define their own
  // `onChange` function.
  const onChange = (e) => {
    const response = [{ content: e.target.value }];
    handleAnswers(name, response);
  };

  switch (type) {
    case "CommentQuestion":
      return (
        <CommentInput onChange={onChange} name={name} required={required} />
      );
    case "DateQuestion":
      return <DateInput onChange={onChange} name={name} required={required} />;
    case "PhoneNumberQuestion":
      return (
        <PhoneNumberInput onChange={onChange} name={name} required={required} />
      );
    case "SingleChoiceQuestion":
      return (
        <SingleChoiceInput
          handleAnswers={handleAnswers}
          name={name}
          required={required}
          answers={answers}
        />
      );
    case "MultipleChoiceQuestion":
      return (
        <MultipleChoiceInput
          handleAnswers={handleAnswers}
          name={name}
          answers={answers}
        />
      );
    case "NumberQuestion":
      return (
        <NumberInput onChange={onChange} name={name} required={required} />
      );
    case "ScaleQuestion":
      return (
        <ScaleInput
          onChange={onChange}
          name={name}
          required={required}
          answerValue={answerValue}
          max={metadata.max}
          min={metadata.min}
        />
      );
    default:
      console.error(`Unsupported survey question type: ${type}`);
      Sentry.captureMessage(`Unsupported survey question type: ${type}`);
      return <></>;
  }
}

// InformationQuestions are for labels and section headers, they do not accept a response
// and do not need a question number displayed with them.
function InformationQuestion({ question }) {
  return <Typography sx={{ marginBottom: 3 }}>{question.title}</Typography>;
}

function QuestionCard({
  question,
  handleAnswers,
  questionNumber,
  answerValue,
}) {
  return (
    <StyledCard sx={{ marginBottom: 3 }}>
      <Typography variant="subtitle" sx={{ fontWeight: "500" }}>
        {`${questionNumber}. ${question.title} ${question.required ? "*" : ""}`}
      </Typography>

      <AnswerInput
        handleAnswers={handleAnswers}
        question={question}
        answerValue={answerValue}
      />
    </StyledCard>
  );
}

function QuestionList({ questions, handleAnswers, answers }) {
  // questionNumber is shown next to the question in the UI.
  let questionNumber = 0;

  return questions.map((question) => {
    if (question.type === "InformationQuestion") {
      return <InformationQuestion key={question.id} question={question} />;
    } else {
      questionNumber++;
      return (
        <QuestionCard
          key={question.id}
          question={question}
          handleAnswers={handleAnswers}
          questionNumber={questionNumber}
          answerValue={answers[question.id]}
        />
      );
    }
  });
}

const SurveyForm = ({ survey, patient, setSubmission }) => {
  const [submissionError, setSubmissionError] = useState(false);
  const [answers, setAnswers] = useState({});
  const [formValid, setFormValid] = useState(false);
  const requiredFields = document.querySelectorAll("[required]");

  useEffect(() => {
    setFormValid(Array.from(requiredFields).every((input) => input.value));
  }, [requiredFields]);

  // Questions can have content or answer_id based responses.
  // See Submissions: https://docs.capablehealth.com/reference/post_surveys-submissions-1
  const handleAnswers = (questionId, answers) => {
    setAnswers((prevState) => ({ ...prevState, [questionId]: answers }));
  };

  // Create a submission for the survey.
  const onSubmit = async (event) => {
    event.preventDefault();
    const questions = [];

    // returned format: [
    //   { id: 'uuid', responses: [{ content: "answer" }]},
    //   { id: 'uuid', responses: [{ answer_id: "uuid" }, ...]},
    //   ...
    // ]
    Object.entries(answers).map(([questionId, responses]) => {
      questions.push({ id: questionId, responses });
    });

    const submission = {
      questionnaire_id: survey.id,
      patient_id: patient.id,
      status: "completed",
      questions,
    };

    try {
      const response = await api.client.Submission.create({
        body: { submission },
      });
      setSubmissionError(false);
      setSubmission(response.body);
    } catch (error) {
      setSubmissionError(true);
      Sentry.captureException(error);
      console.error("Submission failed!", error);
    }
  };

  return (
    <>
      <Box component="form" autoComplete="off" onSubmit={onSubmit}>
        <QuestionList
          questions={survey.questions}
          handleAnswers={handleAnswers}
          answers={answers}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginBottom: "1rem",
          }}
        >
          <Button
            variant="contained"
            disabled={!formValid}
            color="primary"
            type="submit"
          >
            Complete
          </Button>
        </Box>
      </Box>

      <ErrorMessage show={submissionError} />
    </>
  );
};

function MultipleChoiceAnswers({ answers }) {
  return (
    <List>
      {answers.map((answer) => {
        return (
          <ListItem disablePadding key={answer.id}>
            <ListItemIcon sx={{ minWidth: "1.5rem" }}>
              <CircleIcon sx={{ fontSize: "0.5rem" }} />
            </ListItemIcon>
            <ListItemText primary={answer.content} />
          </ListItem>
        );
      })}
    </List>
  );
}

function Response({ questionText, answers }) {
  return (
    <StyledCard sx={{ marginBottom: 3 }}>
      <Typography variant="subtitle" sx={{ fontWeight: "500" }}>
        {questionText}
      </Typography>
      {/* If there are multiple answers and they have an answer_id then show a bulleted list */}
      {answers.length > 1 && answers[0].answer_id ? (
        <MultipleChoiceAnswers answers={answers} />
      ) : (
        <Typography key={answers[0].id}>{answers[0].content}</Typography>
      )}
    </StyledCard>
  );
}

function Submission({ submission }) {
  // NOTE: The CapableHealth api returns the submission responses in a format
  //       such that each selected checkbox from a MultipleChoice question is
  //       in a separate object. This means we need to group the responses by
  //       question_id, so we can render MultipleChoice answers together.
  const responsesByQuestion = Object.entries(
    groupBy(submission.responses, "question_id")
  );
  return responsesByQuestion.map(([questionId, answers]) => {
    // question_content will be the same for every answer due to the grouping.
    const questionText = answers[0].question_content;
    return (
      <Response
        key={questionId}
        questionText={questionText}
        answers={answers}
      />
    );
  });
}

export default function Survey() {
  const { surveyId } = useParams();
  const { currentPatient, isError: patientError } = useCurrentPatient();
  const { survey, isLoading, isError: surveyError } = useSurvey(surveyId);
  const [submission, setSubmission] = useState();

  if (isLoading)
    return <Skeleton variant="rectangular" height="100%" animation="wave" />;

  if (surveyError || patientError)
    return (
      <PrimaryHeader sx={{ paddingTop: 0 }}>
        <BackButton
          route="/profile"
          sx={{ alignSelf: "baseline", zIndex: 100 }}
        />

        <Typography marginBottom={0.5} variant="h4" component="h1">
          Sorry something went wrong
        </Typography>
      </PrimaryHeader>
    );

  return (
    <>
      {survey && currentPatient && (
        <>
          <PrimaryHeader sx={{ paddingTop: 0 }}>
            <BackButton
              route="/profile"
              sx={{ alignSelf: "baseline", zIndex: 100 }}
            />

            <Typography marginBottom={0.5} variant="h4" component="h1">
              {/* if the survey has been submitted, display a thank you message */}
              {submission ? "Thank you!" : survey.title}
            </Typography>
          </PrimaryHeader>

          {/* if the survey has been submitted, display the questions & answers, otherwise show the survey */}
          <Container sx={{ marginY: 5 }}>
            {submission ? (
              <Submission submission={submission} />
            ) : (
              <SurveyForm
                survey={survey}
                patient={currentPatient}
                setSubmission={setSubmission}
              />
            )}
          </Container>
        </>
      )}
    </>
  );
}
