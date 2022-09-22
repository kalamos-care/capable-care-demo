import React from "react";
// @ts-ignore
import { useTheme, View, Image, Heading, useAuthenticator, Authenticator, CheckboxField } from "@aws-amplify/ui-react";

import CopyrightFooter from "./CopyrightFooter";

const HeaderText: React.FC = ({ children }) => {
  const { tokens } = useTheme();

  return (
    <Heading textAlign="center" padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={4}>
      {children}
    </Heading>
  );
};

function Logo() {
  const { tokens } = useTheme();

  return (
    <View textAlign="center" padding={tokens.space.medium}>
      <Image alt="Logo" src={process.env.REACT_APP_LOGO_DARK} />
    </View>
  );
}

// The Amplify Authenticator has several "slots" that you can customize to add
// messaging & functionality to meet your app's needs.
// https://ui.docs.amplify.aws/components/authenticator#headers--footers
export const authComponents = {
  Header() {
    return <Logo />;
  },
  Footer() {
    return <CopyrightFooter />;
  },
  SignIn: {
    Header() {
      return <HeaderText>Sign in to your account</HeaderText>;
    },
  },
  SignUp: {
    Header() {
      return <HeaderText>Create a new account</HeaderText>;
    },
    FormFields() {
      return (
        <>
          <Authenticator.SignUp.FormFields />
          { process.env.REACT_APP_TERMS_OF_SERVICE_URL &&
            <CheckboxField
              label={
                <div> By signing up, you agree to
                  our <a target="_blank" href={process.env.REACT_APP_TERMS_OF_SERVICE_URL}>Terms of Service</a>
                </div>
              }
              name="custom:capable:signup_data"
              value={JSON.stringify({ metadata: { accepted_terms_of_service: true } })}
            />
          }
        </>
      )
    }
  },
  ConfirmSignUp: {
    Header() {
      return <HeaderText>Confirm sign up</HeaderText>;
    },
  },
  SetupTOTP: {
    Header() {
      return <HeaderText>Setup TOTP</HeaderText>;
    },
  },
  ConfirmSignIn: {
    Header() {
      return <HeaderText>Confirm sign in</HeaderText>;
    },
  },
  ResetPassword: {
    Header() {
      return <HeaderText>Reset your password</HeaderText>;
    },
  },
  ConfirmResetPassword: {
    Header() {
      return <HeaderText>Confirm reset password</HeaderText>;
    },
  },
};
