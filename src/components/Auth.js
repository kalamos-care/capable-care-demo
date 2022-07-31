import { useTheme, View, Image, Heading } from "@aws-amplify/ui-react";

import header_logo from "../assets/images/Kalamos_logo_transparent.png";

function HeaderText(props) {
  const { tokens } = useTheme();

  return (
    <Heading
      textAlign="center"
      padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
      level={4}
    >
      {props.children}
    </Heading>
  );
}

function Logo() {
  const { tokens } = useTheme();

  return (
    <View textAlign="center" padding={tokens.space.medium}>
      <Image alt="Logo" src={header_logo} />
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
  SignIn: {
    Header() {
      return <HeaderText>Sign in to your account</HeaderText>;
    },
  },
  SignUp: {
    Header() {
      return <HeaderText>Create a new account</HeaderText>;
    },
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
