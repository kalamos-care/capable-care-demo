import { Auth } from "aws-amplify";
import { CognitoUser } from "@aws-amplify/auth";

const DEFAULT_AWS_REGION = "us-east-1";
const DEFAULT_AUTH_FLOW_TYPE = "USER_SRP_AUTH";

class AuthError extends Error {}
class AuthConfigurationError extends AuthError {}

function getAuthProperties(): {
  userPoolId: string;
  userPoolWebClientId: string;
} {
  const urlParams = new URLSearchParams(window.location.search);

  const userPoolId = urlParams.get("up") || localStorage.getItem("up");
  const userPoolWebClientId = urlParams.get("ac") || localStorage.getItem("ac");

  if (userPoolId === null || userPoolWebClientId === null)
    throw new AuthConfigurationError("No Auth Configuration Properties given.");

  console.log(
    `Using auth properties from ${
      urlParams.has("up") ? "url params" : "localstorage"
    }`
  );
  return { userPoolId, userPoolWebClientId };
}

function storeAuthProperties(
  userPoolId: string,
  userPoolWebClientId: string
): void {
  if (userPoolId === null || userPoolWebClientId === null)
    console.log("Could not store null auth properties.");
  else {
    localStorage.setItem("up", userPoolId);
    localStorage.setItem("ac", userPoolWebClientId);
  }
}

function initFromLocationOrStorage(): void {
  const { userPoolId, userPoolWebClientId } = getAuthProperties();
  console.log("Configuring Auth with: ", userPoolId, userPoolWebClientId);
  Auth.configure({
    Auth: {
      region: DEFAULT_AWS_REGION,
      userPoolId,
      userPoolWebClientId,
      authenticationFlowType: DEFAULT_AUTH_FLOW_TYPE,
    },
    Analytics: {
      disabled: true,
    },
  });

  storeAuthProperties(userPoolId, userPoolWebClientId);
}

async function signOut(): Promise<void> {
  return Auth.signOut().catch((error) =>
    console.log("could not SignOut:", error)
  );
}

async function signIn(
  username: string,
  password: string
): Promise<CognitoUser | any> {
  return Auth.signIn(username, password);
}

async function completeNewPassword(
  user: CognitoUser,
  newPassword: string
): Promise<any> {
  return Auth.completeNewPassword(user, newPassword);
}

async function getAccessToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    Auth.currentSession().then((session) => {
      // @ts-ignore
      resolve(session.accessToken.jwtToken);
    });
  });
}

async function getCognitoUserPayload(): Promise<{
  aud: string;
  "cognito:groups": string[];
  "cognito:username": string;
  "custom:capable:tenant_id": string;
  "custom:capable:user_id": string;
  "custom:capable:user_type": string;
  email: string;
  email_verified: boolean;
  event_id: string;
  iss: string;
  sub: string;
  token_use: string;
  exp: number;
  iat: number;
  auth_time: number;
}> {
  return new Promise((resolve, reject) => {
    Auth.currentSession()
      .then((session) => {
        // @ts-ignore
        resolve(session.idToken.payload);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default {
  AuthConfigurationError,
  initFromLocationOrStorage,
  signOut,
  signIn,
  completeNewPassword,
  getAccessToken,
  getCognitoUserPayload,
  getAuthProperties,
};
