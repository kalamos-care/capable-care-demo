import { I18n } from "aws-amplify";
import Color from "color";

I18n.setLanguage("en");

// Function to configure Amplify with Cognito keys
// NOTE: This sample app uses AWS Amplify to provide authentication. If you
//       have forked this repo you will need to setup Amplify in your own
//       AWS account, or use a different auth strategy.
//       Docs: https://docs.amplify.aws
export default function configureAuthenticator() {
  // Configure the authentication screens copy. Further info:
  // https://ui.docs.amplify.aws/components/authenticator#internationalization-i18n
  I18n.putVocabulariesForLanguage("en", {
    "Sign in": "Sign In", // Button label
    "Create Account": "Sign Up", // Tab header & button label
  });

  // Override the amplify primary brand colour with one from the environment for demos.
  // See the authenticator.css file customizing the Amplify stylesheet further.
  document.documentElement.style.setProperty(
    "--amplify-colors-brand-primary-10",
    Color(process.env.REACT_APP_COLOR).lighten(0.5).hex()
  );
  document.documentElement.style.setProperty(
    "--amplify-colors-brand-primary-20",
    Color(process.env.REACT_APP_COLOR).lighten(0.4).hex()
  );
  document.documentElement.style.setProperty(
    "--amplify-colors-brand-primary-40",
    Color(process.env.REACT_APP_COLOR).lighten(0.3).hex()
  );
  document.documentElement.style.setProperty(
    "--amplify-colors-brand-primary-60",
    Color(process.env.REACT_APP_COLOR).lighten(0.25).hex()
  );
  document.documentElement.style.setProperty(
    "--amplify-colors-brand-primary-80",
    Color(process.env.REACT_APP_COLOR).lighten(0.2).hex()
  );
  document.documentElement.style.setProperty(
    "--amplify-colors-brand-primary-90",
    Color(process.env.REACT_APP_COLOR).lighten(0.1).hex()
  );
  document.documentElement.style.setProperty(
    "--amplify-colors-brand-primary-100",
    process.env.REACT_APP_COLOR
  );
  document.documentElement.style.setProperty("--amplify-components-card-padding", "none");
}

// Configuration for the form fields on the authorization screens. Further info:
// https://ui.docs.amplify.aws/components/authenticator#form-field-customization
const confirmationCodeField = {
  labelHidden: true,
  placeholder: "Enter confirmation code",
};

const usernameField = {
  labelHidden: true,
  placeholder: "Enter email",
};

const passwordField = {
  labelHidden: true,
  placeholder: "Enter password",
};

const confirmPasswordField = {
  labelHidden: true,
  placeholder: "Confirm password",
};

export const formFieldConfig = {
  signIn: {
    username: usernameField,
    password: passwordField,
  },
  signUp: {
    username: usernameField,
    password: passwordField,
    confirm_password: confirmPasswordField,
  },
  forceNewPassword: {
    password: passwordField,
  },
  resetPassword: {
    username: usernameField,
  },
  confirmResetPassword: {
    confirmation_code: confirmationCodeField,
    confirm_password: confirmPasswordField,
  },
  setupTOTP: {
    confirmation_code: confirmationCodeField,
  },
  confirmSignIn: {
    confirmation_code: confirmationCodeField,
  },
};
