import {
  Authenticator,
  Button,
  Card,
  CheckboxField,
  Flex,
  Heading,
  Image,
  Loader,
  PhoneNumberField,
  Tabs,
  TabItem,
  TextField,
  useTheme,
  View,
} from "@aws-amplify/ui-react";
import { AuthState } from "@aws-amplify/ui-components";
import Auth from "@capable-health/capable-auth-sdk";
import identityProvider from "@capable-health/capable-auth-sdk/dist/esm/helpers/identity-provider";
import React, { useEffect, useState } from "react";
import { useLDClient } from "launchdarkly-react-client-sdk";

import { formFieldConfig } from "./config/auth";
import { authComponents } from "./components/Auth";

import "@aws-amplify/ui-react/styles.css";
import "./styles/authenticator.css";

const useAuthState = () => {
  const [authState, setAuthState] = useState(AuthState.SignIn);

  useEffect(() => {
    const fetchAuthState = async () => {
      try {
        // Will check if the current user has an active session and will throw an error if the user does not
        await Auth.user.getPayload();
        setAuthState(AuthState.SignedIn);
      } catch (error) {
        setAuthState(AuthState.SignIn);
      }
    };

    fetchAuthState();
    return () => {
      setAuthState(AuthState.SignIn);
    };
  }, []);

  return [authState, setAuthState];
};

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await identityProvider.currentAuthenticatedUser();
        setCurrentUser(user);
      } catch (error) {
        setCurrentUser(null);
      }
    };

    fetchCurrentUser();
    return () => {
      setCurrentUser(null);
    };
  }, []);

  return [currentUser, setCurrentUser];
};

function PasswordlessAuthenticator({ children }) {
  const [authState, setAuthState] = useAuthState();
  const [currentUser, setCurrentUser] = useCurrentUser();
  const [submitError, setSubmitError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { tokens } = useTheme();

  const dialCode = "+1";

  const handleSignIn = async (phoneNumber) => {
    setIsLoading(true);
    const cognitoUser = await Auth.passwordless.signIn(phoneNumber);
    setCurrentUser(cognitoUser);
    setAuthState(AuthState.ConfirmSignIn);
    setIsLoading(false);
  };

  const handleConfirmSignIn = async (code) => {
    setIsLoading(true);
    const user = await Auth.passwordless.confirmSignIn(currentUser, code);
    setCurrentUser(user);
    setAuthState(AuthState.SignedIn);
    setIsLoading(false);
  };

  const handleSignUp = async (phoneNumber) => {
    setIsLoading(true);
    setAuthState(AuthState.SignUp);
    await Auth.passwordless.signUp(phoneNumber);
    await handleSignIn(phoneNumber);
    setIsLoading(false);
  };

  const handleSubmit = async (event, authState) => {
    event.preventDefault();

    // Reset error to undefined so that it no longer shows in the UI
    if (submitError !== undefined) {
      setSubmitError(undefined);
    }

    try {
      switch (authState) {
        case AuthState.SignIn:
          await handleSignIn(`${dialCode}${event.target.phone_number.value}`);
          break;
        case AuthState.SignUp:
          await handleSignUp(`${dialCode}${event.target.phone_number.value}`);
          break;
        case AuthState.ConfirmSignIn:
          await handleConfirmSignIn(event.target.confirmation_code.value);
          break;
        default:
          console.log("Unknown auth state:", authState);
      }
    } catch (error) {
      setSubmitError(error.message);
      return;
    }
  };

  const handleSignOut = async () => {
    Auth.user.signOut();
    setCurrentUser(null);
    setAuthState(AuthState.SignIn);
  };

  const PasswordlessComponent = () => {
    const PhoneNumberInput = (
      <PhoneNumberField
        defaultCountryCode={dialCode}
        dialCodeList={[dialCode]}
        name="phone_number"
        isRequired={true}
        hasError={submitError}
        errorMessage={submitError}
        placeholder="Enter number"
      />
    );

    const ConfirmationCodeInput = (
      <TextField
        name="confirmation_code"
        placeholder="Enter code"
        hasError={submitError}
        errorMessage={submitError}
      />
    );

    const InputButton = ({ submitText, authState }) => {
      const [checked, setChecked] = useState(authState === AuthState.SignIn);

      const consentText = `By submitting your phone number, you consent to receive a one-time login code from ${process.env.REACT_APP_NAME} at the number provided. Message and data rates may apply.`;
      const ConsentText = authState === AuthState.SignUp
        ? (
          <CheckboxField
            label={consentText}
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          )
        : <span>{consentText}</span>;

      if (isLoading) {
        return (
          <Flex justifyContent="center">
            <Loader size="large" />
          </Flex>
        );
      } else {
        return (
          <>
            {ConsentText}
            <Button type="submit" variation="primary" disabled={!checked}>
              {submitText}
            </Button>
          </>
        );
      }
    };

    const InputField = ({
      headerText,
      submitText,
      authState,
      inputElement,
    }) => (
      <Flex direction="column" gap="unset">
        <Heading textAlign="center" level={4}>
          {headerText}
        </Heading>
        <Flex
          as="form"
          onSubmit={(event) => handleSubmit(event, authState)}
          direction="column"
          padding={tokens.space.xl}
        >
          {inputElement}
          <InputButton submitText={submitText} authState={authState} />
        </Flex>
      </Flex>
    );

    const Layout = ({ children }) => (
      <View margin="0 5px">
        <View textAlign="center" padding={tokens.space.medium}>
          <Image alt="Logo" src={process.env.REACT_APP_LOGO_DARK} />
        </View>
        <Card variation="outlined">{children}</Card>
      </View>
    );

    if ([AuthState.SignIn, AuthState.SignUp].includes(authState)) {
      return (
        <Layout>
          <Tabs
            spacing="equal"
            indicatorPosition="top"
            defaultIndex={authState === AuthState.SignIn ? 0 : 1}
          >
            <TabItem title="Sign In">
              <InputField
                headerText="Sign in to your account"
                submitText="Get Code"
                authState={AuthState.SignIn}
                inputElement={PhoneNumberInput}
              />
            </TabItem>
            <TabItem title="Sign Up">
              <InputField
                headerText="Create a new account"
                submitText="Sign Up"
                authState={AuthState.SignUp}
                inputElement={PhoneNumberInput}
              />
            </TabItem>
          </Tabs>
        </Layout>
      );
    } else if (authState === AuthState.ConfirmSignIn) {
      return (
        <Layout>
          <InputField
            headerText="Confirm Sign In"
            submitText="Validate Code"
            authState={AuthState.ConfirmSignIn}
            inputElement={ConfirmationCodeInput}
          />
        </Layout>
      );
    }
  };

  return authState === AuthState.SignedIn && currentUser
    ? children({ signOut: handleSignOut })
    : PasswordlessComponent();
}

const PASSWORDLESS = "passwordless";
const CREDENTIALS = "credentials";

function getInitialAuthFlow() {
  if (
    process.env.REACT_APP_ENABLE_PASSWORDLESS === "true" &&
    process.env.REACT_APP_ENABLE_CREDENTIALS === "true"
  ) {
    return window.location.href.includes(PASSWORDLESS)
      ? PASSWORDLESS
      : [CREDENTIALS, PASSWORDLESS].includes(
          process.env.REACT_APP_DEFAULT_AUTH_FLOW
        )
      ? process.env.REACT_APP_DEFAULT_AUTH_FLOW
      : CREDENTIALS;
  } else if (process.env.REACT_APP_ENABLE_PASSWORDLESS === "true") {
    return PASSWORDLESS;
  } else {
    return CREDENTIALS;
  }
}

function AppAuthenticator(props) {
  const ldClient = useLDClient();
  const [authFlow] = useState(getInitialAuthFlow());
  const [isAuthConfigured, setIsAuthConfigured] = useState(false);

  useEffect(() => {
    const userPoolId = process.env.REACT_APP_COGNITO_USER_POOL_ID;
    const userPoolWebClientId = authFlow === PASSWORDLESS
        ? process.env.REACT_APP_COGNITO_USER_POOL_WEB_CLIENT_ID_PASSWORDLESS
        : process.env.REACT_APP_COGNITO_USER_POOL_WEB_CLIENT_ID_END_USER_LOGIN

    const configureAmplify = () => {
      const authConfig = {
        userPoolId,
        userPoolWebClientId,
      };
  
      const tenantMigration = !!ldClient.variation("tenant-test-migration", false);
      if (tenantMigration && authFlow === CREDENTIALS) {
        // This is important for allowing the migration
        // It should be removed once the migration is complete
        authConfig.authenticationFlowType = "USER_PASSWORD_AUTH";
        authConfig.clientMetadata = {
          migration: "1",
        };
      }

      Auth[authFlow].configure(authConfig);
    };

    if (isAuthConfigured) {
      Auth.user
        .getPayload()
        .then((payload) => {
          ldClient?.identify(
            {
              key: payload.userId,
              email: payload.email,
              custom: {
                userPoolId,
                userPoolWebClientId,
                tenantId: payload.tenantId,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                userType: payload.userType,
              },
            },
            undefined
          );
        })
        .catch((error) => {
          console.log("User is not signed in");
        });
    } else {
      ldClient
        ?.identify(
          {
            key: userPoolId,
            custom: {
              userPoolId,
              userPoolWebClientId,
            },
          },
          undefined
        )
        .then(() => {
          if (!isAuthConfigured) {
            configureAmplify();
            setIsAuthConfigured(true);
          }
        });
    }
  }, [authFlow, isAuthConfigured, ldClient]);

  // We don't want to render the app until the Auth sdk is configured
  if (!isAuthConfigured) {
    return null;
  }

  // This allows to switch back and forth between passwordless auth and credentials auth
  return authFlow === PASSWORDLESS ? (
    <PasswordlessAuthenticator children={props.children} />
  ) : (
    <Authenticator formFields={formFieldConfig} components={authComponents}>
      {props.children}
    </Authenticator>
  );
}

export default AppAuthenticator;
