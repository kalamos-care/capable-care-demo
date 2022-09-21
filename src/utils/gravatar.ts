// Adapted from https://github.com/capable-health/capable-care-mobile-demo/blob/e8ede9dada5979770ced959caad87b5ab25dd8ca/components/gravatar.js
// But just returns the URL instead of an actual component, we pass this
// through to a MUI <Avatar />
import md5 from "blueimp-md5";

const GRAVATAR_URI = "https://www.gravatar.com/avatar/";

// For stripping plusses from email addresses to get a higher hit rate
// on Gravatar.
const stripPlus = (email: string): string => {
  if (!email) return "";
  const left_side = email.split("@")[0].split("+")[0];
  const right_side = email.split("@")[1];
  return left_side + "@" + right_side;
};

const gravatar = (email: string): string => {
  const size = 160;
  const defaultImage = "https://i.imgur.com/Dkzx1as.png";
  const rating = "g";

  email = stripPlus(email);

  const uri = `${GRAVATAR_URI}${md5(email)}?size=${size}&d=${defaultImage}&rating=${rating}`;

  return uri;
};

export default gravatar;
