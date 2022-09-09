import { Card, Skeleton, Typography } from "@mui/material";

const NoDataCards = ({ firstText, secondText, title, body }: { firstText: string, secondText: string, title?: string, body: string }) => {
  const SingleNoDataCard = ({ text, textColor, left, top }: { text: string, textColor: string, left: string, top: string }) => (
    <Card
      sx={{
        width: "60%",
        padding: "0.5rem 1rem",
        borderRadius: "8px",
        boxShadow: "0px 4px 20px rgb(177 179 203 / 80%)",
        textAlign: "left",
        position: "absolute",
        left,
        top,
      }}
    >
      <Typography variant="eyebrow" style={{ color: textColor }}>
        {text}
      </Typography>
      <Skeleton animation={false} height={"0.5rem"} width={"75%"} sx={{ backgroundColor: "#D9DBE9" }} />
      <Skeleton animation={false} height={"0.5rem"} sx={{ backgroundColor: "#EFF0F7" }} />
      <Skeleton animation={false} height={"0.5rem"} width={"80%"} sx={{ backgroundColor: "#EFF0F7" }} />
    </Card>
  );

  return (
    <div
      style={{
        padding: "0 3rem 36px 36px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        justifyContent: "center",
      }}>
      <div style={{ position: "relative", height: "125px" }}>
        <SingleNoDataCard text={firstText} textColor={"#4C4CD8"} left={"20%"} top={"0"} />
        <SingleNoDataCard text={secondText} textColor={"#F8BE39"} left={"35%"} top={"30%"} />
      </div>
      {
        title && (
          <div style={{ position: "relative", marginTop: "1rem" }}>
            <Typography variant="headline">
              {title}
            </Typography>
          </div>
        )
      }
      <div style={{ position: "relative", marginTop: "1rem" }}>
        <Typography variant="body2">
          {body}
        </Typography>
      </div>
    </div>
  );
};

export default NoDataCards;
