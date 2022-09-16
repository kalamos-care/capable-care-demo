import React from "react";
import { useParams } from "react-router-dom";
import { Container, Skeleton, Typography } from "@mui/material";

import { ActionButton, PrimaryHeader, Questionnaire } from "../components";
import { useSurvey } from "../fetchDataHooks";

export default function Survey() {
  const { surveyId } = useParams();
  const { survey, isError, isLoading } = useSurvey(surveyId);

  if (isLoading) {
    return <Skeleton variant="rectangular" animation="wave" height={280} />;
  }

  if (isError) {
    return <div>Woops something went wrong...</div>;
  }

  return (
    <>
      <PrimaryHeader sx={{ position: "relative", textAlign: "center", padding: "16px" }}>
        <ActionButton
          type={"back"}
          route="/"
          sx={{
            alignSelf: "baseline",
            zIndex: 100,
            position: "absolute",
            top: 0,
          }}
        />

        <Typography variant="h4" component="h1" sx={{ width: "70%" }}>
          {survey.title}
        </Typography>
      </PrimaryHeader>
      <Container sx={{ marginBottom: 5 }}>
        <Questionnaire survey={survey} />
      </Container>
    </>
  );
}
