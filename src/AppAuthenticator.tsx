import { CognitoUser } from "@aws-amplify/auth";
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
  // @ts-ignore
} from "@aws-amplify/ui-react";
// @ts-ignore
import { AuthState } from "@aws-amplify/ui-components";
import Auth, { ConfigurationOptions, User } from "@capable-health/capable-auth-sdk";
import identityProvider from "@capable-health/capable-auth-sdk/dist/esm/helpers/identity-provider";
import React, { useEffect, useState } from "react";
import { useLDClient } from "launchdarkly-react-client-sdk";
import * as Sentry from "@sentry/react";

import { formFieldConfig } from "./config/auth";
import { authComponents } from "./components/Auth";
import { CopyrightFooter } from "./components/index";

import "@aws-amplify/ui-react/styles.css";
import "./styles/authenticator.css";

const useAuthState = (): [AuthState, React.Dispatch<React.SetStateAction<AuthState>>] => {
  const [authState, setAuthState] = useState<AuthState>(AuthState.SignIn);

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

type CurrentUser = CognitoUser | User | null;
const useCurrentUser = (): [CurrentUser, React.Dispatch<React.SetStateAction<CurrentUser>>] => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(null);

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

interface PasswordlessAuthenticatorProps {
  hideSignUp: boolean;
}
const PasswordlessAuthenticator: React.FC<PasswordlessAuthenticatorProps> = ({
  children: passwordlessAuthenticatorChildren,
  hideSignUp,
}) => {
  const [authState, setAuthState] = useAuthState();
  const [currentUser, setCurrentUser] = useCurrentUser();
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const { tokens } = useTheme();

  const dialCode = "+1";

  const handleSignIn = async (phoneNumber: string) => {
    setIsLoading(true);
    const cognitoUser = await Auth.passwordless.signIn(phoneNumber);
    setCurrentUser(cognitoUser);
    setAuthState(AuthState.ConfirmSignIn);
    setIsLoading(false);
  };

  const handleConfirmSignIn = async (code: string) => {
    if (!currentUser) {
      return;
    }

    setIsLoading(true);
    const user = await Auth.passwordless.confirmSignIn(currentUser, code);
    setCurrentUser(user);
    setAuthState(AuthState.SignedIn);
    setIsLoading(false);
  };

  const handleSignUp = async (phoneNumber: string) => {
    setIsLoading(true);
    setAuthState(AuthState.SignUp);
    await Auth.passwordless.signUp(
      phoneNumber,
      process.env.REACT_APP_TERMS_OF_SERVICE_URL ? { accepted_terms_of_service: true } : {}
    );
    await handleSignIn(phoneNumber);
    setIsLoading(false);
  };

  interface PhoneNumberTarget extends EventTarget {
    phone_number: {
      value: string;
    };
  }
  interface ConfirmationCodeTarget extends EventTarget {
    confirmation_code: {
      value: string;
    };
  }
  const handleSubmit = async (event: Event, authState: AuthState) => {
    event.preventDefault();

    // Reset error to undefined so that it no longer shows in the UI
    if (submitError !== undefined) {
      setSubmitError(undefined);
    }

    let target;
    try {
      switch (authState) {
        case AuthState.SignIn:
          target = event.target as PhoneNumberTarget;
          await handleSignIn(`${dialCode}${target.phone_number.value}`);
          break;
        case AuthState.SignUp:
          target = event.target as PhoneNumberTarget;
          await handleSignUp(`${dialCode}${target.phone_number.value}`);
          break;
        case AuthState.ConfirmSignIn:
          target = event.target as ConfirmationCodeTarget;
          await handleConfirmSignIn(target.confirmation_code.value);
          break;
        default:
          Sentry.captureMessage(`Unknown auth state: ${authState}`, {
            level: "error",
          });
      }
    } catch (error) {
      Sentry.captureException(error, { level: "warning" });
      setSubmitError((error as Error).message);
      return;
    }
  };

  const handleSignOut = async () => {
    Auth.user.signOut();
    setCurrentUser(null);
    setAuthState(AuthState.SignIn);
    Sentry.setUser(null);
  };

  const PasswordlessComponent = () => {
    const PhoneNumberInput = () => (
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

    const ConfirmationCodeInput = () => (
      <TextField
        name="confirmation_code"
        placeholder="Enter code"
        hasError={submitError}
        errorMessage={submitError}
      />
    );

    interface InputButtonProps {
      submitText: string;
      showConsentMessage: boolean;
      showConsentCheck: boolean;
      showTosCheck?: boolean;
    }
    const InputButton: React.FC<InputButtonProps> = ({
      submitText,
      showConsentMessage,
      showConsentCheck,
      showTosCheck,
    }) => {
      const [checked, setChecked] = useState(!showConsentCheck);
      const [tosChecked, setTosChecked] = useState(!showTosCheck);

      const consentText = `By submitting your phone number, you consent to receive a one-time login code from ${process.env.REACT_APP_NAME} at the number provided. Message and data rates may apply.`;
      const ConsentText = showConsentCheck ? (
        <CheckboxField
          label={consentText}
          checked={checked}
          onChange={(event: Event) => {
            const target = event.target as HTMLAmplifyCheckboxElement;
            setChecked(target.checked);
          }}
        />
      ) : (
        showConsentMessage && <span>{consentText}</span>
      );

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
            {showTosCheck && (
              <CheckboxField
                label={
                  <div>
                    {" "}
                    By signing up, you agree to our{" "}
                    <a target="_blank" href={process.env.REACT_APP_TERMS_OF_SERVICE_URL}>
                      Terms of Service
                    </a>
                  </div>
                }
                name="accepted_terms_of_service"
                value="accepted_terms_of_service"
                checked={tosChecked}
                onChange={(event: Event) => {
                  const target = event.target as HTMLAmplifyCheckboxElement;
                  setTosChecked(target.checked);
                }}
              />
            )}
            <Button type="submit" variation="primary" disabled={!checked || !tosChecked}>
              {submitText}
            </Button>
          </>
        );
      }
    };

    interface InputFieldProps {
      headerText: string;
      submitText: string;
      authState: AuthState;
      showConsentMessage: boolean;
      showConsentCheck: boolean;
      showTosCheck?: boolean;
    }
    const InputField: React.FC<InputFieldProps> = ({
      children,
      headerText,
      submitText,
      authState,
      showConsentMessage,
      showConsentCheck,
      showTosCheck,
    }) => (
      <Flex direction="column" gap="unset">
        <Heading textAlign="center" level={4}>
          {headerText}
        </Heading>
        <Flex
          as="form"
          onSubmit={(event: Event) => handleSubmit(event, authState)}
          direction="column"
          padding={tokens.space.xl}
        >
          {children}
          <InputButton
            submitText={submitText}
            showConsentMessage={showConsentMessage}
            showConsentCheck={showConsentCheck}
            showTosCheck={showTosCheck}
          />
        </Flex>
      </Flex>
    );

    const Layout: React.FC = ({ children }) => (
      <View margin="0 5px">
        <View textAlign="center" padding={tokens.space.medium}>
          <Image alt="Logo" src={process.env.REACT_APP_LOGO_DARK} />
        </View>
        <Card variation="outlined">{children}</Card>
        <CopyrightFooter />
      </View>
    );

    const SignIn = (
      <InputField
        headerText="Sign in to your account"
        submitText="Get Code"
        authState={AuthState.SignIn}
        showConsentMessage={true}
        showConsentCheck={false}
      >
        <PhoneNumberInput />
      </InputField>
    );

    const SignUp = (
      <InputField
        headerText="Create a new account"
        submitText="Sign Up"
        authState={AuthState.SignUp}
        showConsentMessage={true}
        showConsentCheck={true}
        showTosCheck={!!process.env.REACT_APP_TERMS_OF_SERVICE_URL}
      >
        <PhoneNumberInput />
      </InputField>
    );

    const ConfirmSignIn = (
      <InputField
        headerText="Confirm Sign In"
        submitText="Validate Code"
        authState={AuthState.ConfirmSignIn}
        showConsentMessage={false}
        showConsentCheck={false}
      >
        <ConfirmationCodeInput />
      </InputField>
    );

    if (hideSignUp && authState === AuthState.SignIn) {
      return <Layout>{SignIn}</Layout>;
    }

    if ([AuthState.SignIn, AuthState.SignUp].includes(authState)) {
      return (
        <Layout>
          <Tabs
            spacing="equal"
            indicatorPosition="top"
            defaultIndex={authState === AuthState.SignIn ? 0 : 1}
          >
            <TabItem title="Sign In">{SignIn}</TabItem>
            <TabItem title="Sign Up">{SignUp}</TabItem>
          </Tabs>
        </Layout>
      );
    }

    if (authState === AuthState.ConfirmSignIn) {
      return <Layout>{ConfirmSignIn}</Layout>;
    }

    return null;
  };

  return authState === AuthState.SignedIn && currentUser && passwordlessAuthenticatorChildren
    ? // @ts-ignore
      passwordlessAuthenticatorChildren({ signOut: handleSignOut })
    : PasswordlessComponent();
};

const PASSWORDLESS = "passwordless";
const CREDENTIALS = "credentials";

const getInitialAuthFlow = (): typeof PASSWORDLESS | typeof CREDENTIALS => {
  if (
    process.env.REACT_APP_ENABLE_PASSWORDLESS === "true" &&
    process.env.REACT_APP_ENABLE_CREDENTIALS === "true"
  ) {
    return window.location.href.includes(PASSWORDLESS)
      ? PASSWORDLESS
      : process.env.REACT_APP_DEFAULT_AUTH_FLOW === CREDENTIALS ||
        process.env.REACT_APP_DEFAULT_AUTH_FLOW === PASSWORDLESS
      ? process.env.REACT_APP_DEFAULT_AUTH_FLOW
      : CREDENTIALS;
  } else if (process.env.REACT_APP_ENABLE_PASSWORDLESS === "true") {
    return PASSWORDLESS;
  } else {
    return CREDENTIALS;
  }
};

const AppAuthenticator: React.FC = ({ children }) => {
  const ldClient = useLDClient();
  const [authFlow] = useState(getInitialAuthFlow());
  const [isAuthConfigured, setIsAuthConfigured] = useState(false);

  useEffect(() => {
    const userPoolId = process.env.REACT_APP_COGNITO_USER_POOL_ID as string;
    const userPoolWebClientId = (
      authFlow === PASSWORDLESS
        ? process.env.REACT_APP_COGNITO_USER_POOL_WEB_CLIENT_ID_PASSWORDLESS
        : process.env.REACT_APP_COGNITO_USER_POOL_WEB_CLIENT_ID_END_USER_LOGIN
    ) as string;

    const configureAmplify = () => {
      const authConfig: ConfigurationOptions = {
        userPoolId,
        userPoolWebClientId,
      };

      const tenantMigration = !!ldClient?.variation("tenant-test-migration", false);
      if (tenantMigration && authFlow === CREDENTIALS) {
        // This is important for allowing the migration
        // It should be removed once the migration is complete
        authConfig.authenticationFlowType = "USER_PASSWORD_AUTH";
        authConfig.clientMetadata = {
          // @ts-ignore
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

          Sentry.setUser({
            id: payload.userId,
            tenantId: payload.tenantId,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            userType: payload.userType,
          });
        })
        .catch((error) => {
          Sentry.captureException(error, { level: "warning" });
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

  const hideSignUp = process.env.REACT_APP_DISABLE_SIGNUP === "true";

  // This allows to switch back and forth between passwordless auth and credentials auth
  return authFlow === PASSWORDLESS ? (
    <PasswordlessAuthenticator hideSignUp={hideSignUp}>{children}</PasswordlessAuthenticator>
  ) : (
    <Authenticator
      formFields={formFieldConfig}
      components={authComponents}
      hideSignUp={hideSignUp}
      services={{
        async validateCustomSignUp(formData: any) {
          if (!process.env.REACT_APP_TERMS_OF_SERVICE_URL) {
            return {};
          }

          if (!formData["custom:capable:signup_data"]) {
            return {
              accepted_terms_of_service: "You must agree to the Terms of Service",
            };
          }
        },
      }}
    >
      {children}
    </Authenticator>
  );
};

export default AppAuthenticator;
