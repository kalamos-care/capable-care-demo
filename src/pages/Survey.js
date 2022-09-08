import React from "react";
import { useParams } from "react-router-dom";
import { CardMedia, Container, Skeleton } from "@mui/material";

import { Questionnaire } from "../components";
import { useSurvey } from "../fetchDataHooks";

export default function Survey() {
  const { surveyId } = useParams();
  const { survey, isError, isLoading } = useSurvey(surveyId);
  
  if (isLoading) {
    return (
      <Skeleton variant="rectangular" animation="wave" height={280} />
    );
  }

  if (isError) {
    return (
      <div>Woops something went wrong...</div>
    );
  }

  return (
    <>
      <CardMedia
        component="img"
        width="375"
        image={process.env.REACT_APP_LOGO}
        alt={process.env.REACT_APP_NAME}
      />
      <Container sx={{ marginBottom: 5, backgroundColor: "background.paper" }}>
        <Questionnaire survey={survey} />
      </Container>
    </>
  );
}
