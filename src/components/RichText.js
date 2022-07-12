import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Typography } from "@mui/material";

// Component to display rich text.
// Using @contentful/rich-text-react-renderer
// https://github.com/contentful/rich-text/tree/master/packages/rich-text-react-renderer
const RichText = ({ content, sx }) => {
  const formattedContent =
    content?.nodeType == "document"
      ? documentToReactComponents(content)
      : content;

  return (
    <>
      {formattedContent && (
        <Typography
          component="div"
          variant="body2"
          sx={{ marginY: 3, whiteSpace: "pre-wrap", ...sx }}
        >
          {formattedContent}
        </Typography>
      )}
    </>
  );
};

export default RichText;
