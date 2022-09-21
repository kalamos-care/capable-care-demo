/* 
  This is a wrapper around the swagger codegen generated code.
  It 
    - does the token management for the api requests automatically 
    - simplifies the rather verbose generated code to consise & predictable api method signatures
    - Offer a Promise interface instead of callbacks

  Examples:

  Listing Goals
  const goals = await api.client.Goal.list({page: 1, size: 10});

  Fetching a CarePlanTemplate
  const carePlanTemplate = await api.client.CarePlanTemplate.get(carePlanTemplateId);

  Creating a Task
  await api.client.Task.create({body: {task: taskProperties}});

  Updating a Patient
  await api.client.Patient.update(patientId, {body:{ patient: patientPropeties}});

  Where CarePlanTemplate could be any other in:
    - Goal
    - Task
    - Observation
    - or any other CapableHealth Models

  And, its verb get, could also be any other in:
    - create
    - update
    - list

  ---

  Adding a new class to the API client:
  If the codegen class signature is standard like:
    `let apiInstance = new CapableHealthApi.GoalsApi();
     apiInstance.goalsGet(opts, (error, data, response)...
    `
  where the signature of the class can be simplified as:
    [Capitalized Classname]Api.prototype.[lowercase class name][verb]

  Then the wrapper will automatically work with that class.

  Otherways, a few exception mechanisms are in place in the overrides.ts file to handle the non-standard cases.
*/

import { Response, ResponseError } from "superagent";

import Auth from "@capable-health/capable-auth-sdk";
// @ts-ignore
import * as CapableHealthApi from "../codegen";
import { clientMethodFor, METHOD } from "./methods";
import { constructorNameFor, isSupportedApiClass } from "./namespaces";
import { BASE_API_PATH } from "./config";

export function clientProxy(client: any, parentClassName: string, constructorName: string) {
  return new Proxy(client, {
    get(client: any, method: METHOD) {
      const clientMethod = clientMethodFor(method, parentClassName, constructorName);

      if (typeof client[clientMethod] !== "function") {
        throw Error(`No API target method named: ${method}`);
      }

      return async (...args: any) => {
        client.apiClient.basePath = BASE_API_PATH;
        const token = await Auth.user.getAccessToken();
        client.apiClient.defaultHeaders["Authorization"] = `Bearer ${token}`;

        return new Promise((resolve, reject) => {
          client[clientMethod](
            ...args,
            (error: ResponseError, data: Response["body"], response: Response) => {
              if (error) {
                reject(error);
              } else if (response.status >= 400) {
                reject(response);
              } else resolve(response);
            }
          );
        });
      };
    },
  });
}

const client: any = new Proxy(
  {},
  {
    get(clients: any, apiClass: string) {
      if (apiClass === "$$typeof") {
        return "function";
      }

      if (isSupportedApiClass(apiClass)) {
        const constructorName = constructorNameFor(apiClass);

        if (!Object.prototype.hasOwnProperty.call(clients, apiClass)) {
          clients[apiClass] = new CapableHealthApi[constructorName]();
        }

        return clientProxy(clients[apiClass], apiClass, constructorName);
      } else throw Error(`No API clients class named: ${apiClass}`);
    },
  }
);

export * from "./config";

export default client;
