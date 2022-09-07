import {
  Container,
  Skeleton,
} from "@mui/material";
import { useCRMContent } from "../fetchDataHooks";
import { HeaderImage, RichText } from "../components";

export default function AboutCard({ carePlan }) {
  // NOTE: We modify the currentPlan object with content from Contentful here. If you
  //       have forked this app, you most likely will **not** need to do this.
  const { isLoading, data: currentPlan } = useCRMContent(carePlan);

  if (isLoading) {
    return (
      <Skeleton variant="rectangular" animation="wave" height={280} />
    );
  }

  return (
    <>
      <HeaderImage data={currentPlan} />

      <Container sx={{ marginBottom: 5 }}>
        <RichText
          content={currentPlan.description}
          sx={{
            marginBottom: "0rem",
            letterSpacing: "0.015rem",
          }}
        />
      </Container>
    </>
  );
}
