import React, { memo } from "react";
import ReactDOMServer from "react-dom/server";
import * as Survey from "survey-react";
import { compact, groupBy, sortBy, toString } from "lodash";
import * as widgets from "surveyjs-widgets";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Typography } from "@mui/material";

import api from "../capableApi/index";

import "survey-react/survey.css";

// Allow to store extra attribute on question object
// required for serialization
Survey.Serializer.addProperty("question", {
  name: "capableId",
  category: "general",
});

Survey.Serializer.addProperty("question", {
  name: "otherAnswerId",
  category: "general",
});

/*
 ** Take Capable API data and transform it fo the SurveyJS lib
 */
const CapableSurveyJSQuestionTypeMappings = {
  CommentQuestion: { type: "comment" },
  MultipleChoiceQuestion: { type: "checkbox" },
  EmailQuestion: {
    type: "text",
    inputType: "email",
    validators: [{ type: "email" }],
  },
  InformationQuestion: { type: "text", inputType: "hidden" },
  NumberQuestion: {
    type: "text",
    inputType: "number",
    validators: [{ type: "numeric" }],
  },
  PhoneNumberQuestion: {
    type: "text",
    inputMask: "phone",
    inputFormat: "(999)-999-9999",
  },
  ScaleQuestion: { type: "rating" },
  SingleChoiceQuestion: { type: "radiogroup" },
  DateQuestion: {
    type: "text",
    inputMask: "datetime",
    inputFormat: "mm/dd/yyyy",
  },
  // "HiddenQuestion": TODO
};

const deserializeQuestion = (question) => {
  const existing_mapping = CapableSurveyJSQuestionTypeMappings[question.type];
  if (!existing_mapping) {
    return {};
  }

  let choices = question.answers;
  let otherAnswerId;

  if (question.metadata.attributes?.hasOther) {
    choices = choices.filter((choice) => {
      if (choice.title === "__OTHER__") {
        otherAnswerId = choice.id;
        return false;
      } else {
        return true;
      }
    });
  }

  return {
    ...CapableSurveyJSQuestionTypeMappings[question.type],
    title: question.title,
    capableId: question.id,
    otherAnswerId: otherAnswerId,
    choices: choices.map(deserializeAnswer),
    ...question.metadata.attributes,
  };
};

const deserializeAnswer = (answer) => ({
  value: answer.id,
  text: answer.title,
});

/*
 ** Take SurveyJS data and transform it for Capable API
 */
const serializeResult = (question, result) => {
  const serializedResponse = {};

  const stringResult = toString(result);
  // Handle "other" specific case
  if (stringResult === "other") {
    serializedResponse.answer_id = question.otherAnswerId;
    serializedResponse.content = question.getQuestionComment();
  } else if (question.displayValue !== result) {
    // If displayed differ from value, it's an answer pick
    // displayed is the title, value is the answer id
    serializedResponse.answer_id = stringResult;
  } else {
    serializedResponse.content = stringResult;
  }

  return serializedResponse;
};

const serializeResults = (results) => {
  const serializedResults = [];

  Object.entries(results.data).forEach(([question_key, values]) => {
    const question = results.getQuestionByValueName(question_key);

    if (!question) {
      return;
    }

    const serializedQuestionResponses = {
      id: question.capableId,
      responses: [],
    };

    if (!Array.isArray(values)) {
      values = [values];
    }

    values.forEach((value) => {
      serializedQuestionResponses["responses"].push(serializeResult(question, value));
    });

    serializedResults.push(serializedQuestionResponses);
  });

  return serializedResults;
};

const PostQuestionnaire = () => {
  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CheckCircleIcon sx={{ color: "#73EBA3", fontSize: "3rem", marginBottom: "1rem" }} />
      <Typography
        sx={{ fontSize: "1rem", lineHeight: "1.5rem", letterSpacing: -0.25, fontWeight: 600 }}
      >
        All set! Your responses have been submitted.
      </Typography>
      <Typography sx={{ fontSize: "0.75rem", lineHeight: "1rem", color: "#4A4A4E" }}>
        Your Care Team will review your responses.
      </Typography>
    </div>
  );
};

const Questionnaire = ({ survey }) => {
  const grouped_questions = groupBy(survey.questions, (question) => question.metadata.page);
  const ordered_pages = sortBy(Object.entries(grouped_questions), (page_number, _questions) =>
    parseInt(page_number)
  );
  const pages = ordered_pages.map(([_, questions]) => {
    const title = compact(questions.map((question) => question.metadata.page_title))[0];
    const page_questions = questions.map(deserializeQuestion);

    return { title: title, questions: page_questions };
  });

  // Add input masks
  widgets.inputmask(Survey);

  const onComplete = async (results) => {
    await api.client.Submission.create({
      body: {
        submission: {
          questionnaire_id: survey.id,
          metadata: {
            submitted_at: new Date(),
          },
          questions: serializeResults(results),
          status: "completed",
        },
      },
    });
  };

  const surveyModel = new Survey.Model({
    showProgressBar: "bottom",
    title: survey.title,
    pages: pages,
    completeText: "Submit",
    completedHtml: ReactDOMServer.renderToString(<PostQuestionnaire />),
  });

  surveyModel.onComplete.add(onComplete);

  return <Survey.Survey model={surveyModel} />;
};

export default memo(Questionnaire);
