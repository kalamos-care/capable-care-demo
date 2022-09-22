/* eslint-disable import/first */
// The following jest.mock need to be called before imports & test inits
jest.mock("@capable-health/capable-auth-sdk", () => {
  return {
    user: {
      getAccessToken: () => {
        return new Promise((resolve) => {
          resolve("1234567890987654321");
        });
      },
    },
  };
});

jest.mock("../codegen/ApiClient.js", () => {
  const ApiClient = function () {
    return {};
  };

  function paramToString(param) {
    if (param === undefined || param === null) {
      return "";
    }
    if (param instanceof Date) {
      return param.toJSON();
    }

    return param.toString();
  }

  ApiClient.instance = {
    // this callApi method override fakes the codegen ApiClient http calls for each API call
    callApi: (
      _path,
      _httpMethod,
      _pathParams,
      _queryParams,
      _headerParams,
      _formParams,
      _bodyParam,
      _authNames,
      _contentTypes,
      _accepts,
      _returnType,
      callback,
      ...args // this is the rest of the arguments passed to the original callApi for introspection purposes
    ) => {
      // (error, data, response) => {            if (error) reject(error);else if (response.status >= 400) reject(response);else resolve(response);          }
      callback(null, null, { status: 200 });
      return {};
    },
    buildCollectionParam: (param, collectionFormat) => {
      if (param == null) {
        return null;
      }
      switch (collectionFormat) {
        case "csv":
          return param.map(paramToString).join(",");
        case "ssv":
          return param.map(paramToString).join(" ");
        case "tsv":
          return param.map(paramToString).join("\t");
        case "pipes":
          return param.map(paramToString).join("|");
        case "multi":
          //return the array directly as SuperAgent will handle it as expected
          return param.map(paramToString);
        default:
          throw new Error("Unknown collection format: " + collectionFormat);
      }
    },
    defaultHeaders: {},
  };

  return { ApiClient };
});

import sinon, { SinonSpy } from "sinon";
import pluralize from "pluralize";
import api from "../index";
import {
  ADD_CHAT_PARTICIPANT,
  AVATAR_UPLOAD,
  CANCEL,
  CHAT_OWNER_TOKEN,
  CHAT_TOKEN,
  CONFIRM,
  CREATE_GROUP_SMS,
  CREATE_GROUP_CHAT,
  CREATE_VIDEO_CALL,
  CREATE,
  DELETE,
  EXPORT,
  GET,
  HINT,
  INVITE,
  LINK,
  LIST,
  ME,
  ONBOARDING_LINK,
  RESCHEDULE,
  RESULTS,
  SEARCH,
  COGNITO_APP_CLIENTS_SECRET,
  WEBHOOK_SIGNATURE_KEYS_SECRET,
  SELECT,
  SMS_OWNER_TOKEN,
  SMS_TOKEN,
  SUGGESTION,
  UPDATE,
  UPLOAD_CARD,
  SUBMIT,
} from "./methods";
// @ts-ignore
import { ApiClient } from "../codegen/ApiClient";

// To add support for new API endpoints, add them to this SUPPORTED_CONTROLLERS registry along with their supported methods
// The test suite dynamically generates tests for each supported controllers
const SUPPORTED_CONTROLLERS = {
  APICredential: [LIST, COGNITO_APP_CLIENTS_SECRET, WEBHOOK_SIGNATURE_KEYS_SECRET],
  Appointment: [CREATE, CANCEL, LIST, GET, RESCHEDULE],
  AppointmentType: [LIST],
  Availability: [LIST],
  Attachment: [CREATE, LIST, GET],
  Calendar: [LIST],
  CarePlan: [CREATE, UPDATE, LIST, GET],
  CarePlanTemplate: [CREATE, UPDATE, LIST, GET],
  Case: [LIST, GET],
  Compound: [LIST, SEARCH],
  Conversation: [
    GET,
    CREATE,
    LIST,
    SMS_TOKEN,
    SMS_OWNER_TOKEN,
    CHAT_TOKEN,
    CHAT_OWNER_TOKEN,
    ADD_CHAT_PARTICIPANT,
    CREATE_GROUP_SMS,
    CREATE_GROUP_CHAT,
  ],
  CPTCode: [LIST],
  Eligibility: [LIST, GET, CREATE],
  Encounter: [CREATE, UPDATE, LIST, GET],
  Ethnicity: [LIST],
  GoalTemplate: [CREATE, UPDATE, LIST, GET],
  Goal: [CREATE, UPDATE, LIST, GET],
  ICDCode: [LIST],
  InsuranceClaim: [LIST, GET, CREATE, UPDATE, SUBMIT],
  InsurancePolicy: [LIST, GET, UPDATE, CREATE, UPLOAD_CARD],
  Integrations: [LIST],
  IntegrationsAcuity: [CREATE, UPDATE, LIST],
  IntegrationsButterflyLabs: [CREATE, UPDATE, LIST],
  IntegrationsCandid: [CREATE, UPDATE, LIST],
  IntegrationsCurexa: [CREATE, UPDATE, LIST],
  IntegrationsFreshpaint: [CREATE, UPDATE, LIST],
  IntegrationsImaware: [LIST, UPDATE, CREATE],
  IntegrationsLooker: [LIST],
  IntegrationsMdi: [CREATE, UPDATE, LIST],
  IntegrationsPhotonHealth: [CREATE, UPDATE, LIST],
  IntegrationsSegment: [CREATE, UPDATE, LIST],
  IntegrationsShopify: [CREATE, UPDATE, LIST],
  IntegrationsStripe: [CREATE, UPDATE, LIST, ONBOARDING_LINK],
  LabTest: [LIST],
  LabTestOrder: [LIST, GET, CREATE, CONFIRM, RESULTS],
  Lead: [CREATE, UPDATE, LIST, GET],
  Medication: [LIST, SELECT, SEARCH],
  Observation: [CREATE, GET, LIST],
  ObservationType: [CREATE, UPDATE, GET, LIST],
  Organization: [CREATE, UPDATE, LIST, GET],
  Patient: [CREATE, UPDATE, GET, ME, LIST, DELETE, INVITE, AVATAR_UPLOAD],
  PatientRelatedPerson: [LIST, GET, CREATE, DELETE],
  PatientMedication: [LIST, GET],
  PayerIdentification: [LIST],
  Payment: [LIST],
  Pharmacy: [LIST, GET],
  Practitioner: [GET, LIST, INVITE, AVATAR_UPLOAD, UPDATE],
  Prescription: [LIST, GET],
  Product: [CREATE, UPDATE, LIST, GET],
  Permission: [HINT],
  Questionnaire: [CREATE, UPDATE, GET, LIST, EXPORT],
  Race: [LIST],
  Submission: [CREATE, GET, LIST, LINK],
  Subscription: [LIST, CREATE, CANCEL, UPDATE],
  Survey: [GET],
  Tag: [LIST],
  Target: [CREATE, UPDATE, LIST, GET],
  TargetTemplate: [CREATE, UPDATE, LIST, GET],
  Task: [CREATE, UPDATE, LIST, GET],
  TaskTemplate: [CREATE, UPDATE, LIST, GET],
  TenantAdmin: [LIST, GET, INVITE],
  User: [LIST],
  Webhook: [CREATE, UPDATE, LIST, GET],
  Workflow: [CREATE, UPDATE, LIST, GET, SUGGESTION],
  WorkflowLog: [LIST],
  VideoCall: [CREATE_VIDEO_CALL],
};

// classes are added to the SPECIAL_QUERY_PARAMS for methods that requires some params for testing
const SPECIAL_QUERY_PARAMS = {
  Appointment: {
    [LIST]: {
      page: 1,
      size: 20,
      attendeeIds: ["1234567890987654321", "0987654321123456789"],
      scheduledAfter: "2022-03-06T12:30:00-0500",
      scheduledBefore: "2022-03-06T12:30:00-0500",
    },
  },
  AppointmentType: {
    [LIST]: {
      page: 1,
      size: 20,
    },
  },
  Attachment: {
    [LIST]: {
      page: 1,
      size: 20,
      sortBy: ["createdAt"],
      byId: ["1234567890987654321", "0987654321123456789"],
      byFileType: ["csv", "pdf"],
      byUserId: ["12345", "67890"],
    },
  },
  Availability: {
    [LIST]: {
      page: 1,
      size: 20,
      fromDate: "2022-03-06T12:30:00-0500",
      toDate: "2022-03-06T12:30:00-0500",
      appointmentTypeId: "23034",
      calendarId: "1234567890987654321",
    },
  },
  Calendar: {
    [LIST]: {
      page: 1,
      size: 20,
      calendarId: "20111",
      userIds: ["1234567890987654321", "0987654321123456789"],
    },
  },
  Case: {
    [LIST]: {
      patientId: "010010001110",
    },
  },
  CarePlan: {
    [LIST]: {
      page: 1,
      size: 20,
      sortBy: ["createdAt"],
      byId: ["1234567890987654321", "0987654321123456789"],
      byName: "test",
      byTags: ["some", "tags"],
      byPatientId: ["12345", "67890"],
    },
  },
  CarePlanTemplate: {
    [LIST]: {
      page: 1,
      size: 20,
      sortBy: ["createdAt"],
      byId: ["1234567890987654321", "0987654321123456789"],
      byName: "test",
      byTags: ["some", "tags"],
      byExternalId: "external-test",
    },
  },
  Conversation: {
    [LIST]: {
      page: 1,
      size: 20,
      byId: ["1234567890987654321", "0987654321123456789"],
      byUserId: ["12345", "67890"],
      byTwilioSid: ["CH_some_id_here", "CH_another_id_here"],
      byConversationType: ["chat", "sms"],
    },
  },
  CPTCode: {
    [LIST]: {
      page: 1,
      size: 1000,
      byValue: ["code", "me"],
      byDescription: "hurt",
      sortBy: ["1234567890987654321", "0987654321123456789"],
      filters: [JSON.stringify({ field: "description", operator: "eq", value: "hurt" })],
      filtersOperator: "eq",
    },
  },
  Eligibility: {
    [LIST]: {
      page: 1,
      size: 20,
      sortBy: ["createdAt"],
      byPatientId: ["external-test", "12034"],
      filters: [JSON.stringify({ field: "status", operator: "eq", value: "active" })],
      filtersOperator: "eq",
    },
  },
  Encounter: {
    [LIST]: {
      page: 1,
      size: 1000,
      sortBy: ["1234567890987654321", "0987654321123456789"],
      filters: [JSON.stringify({ field: "name", operator: "eq", value: "yourName" })],
      filtersOperator: "and",
    },
  },
  Ethnicity: {
    [LIST]: {
      byParentCode: ["12345", "67890"],
      byLevel: ["2", "3"],
      byId: ["1234567890987654321", "0987654321123456789"],
      page: 1,
      size: 1000,
    },
  },
  Goal: {
    [LIST]: {
      page: 1,
      size: 20,
      sortBy: ["createdAt"],
      byId: ["1234567890987654321", "0987654321123456789"],
      byName: "test",
      byTags: ["some", "tags"],
      byPatientId: ["12345", "67890"],
    },
  },
  GoalTemplate: {
    [LIST]: {
      page: 1,
      size: 20,
      sortBy: ["createdAt"],
      byId: ["1234567890987654321", "0987654321123456789"],
      byName: "test",
      byTags: ["some", "tags"],
      byExternalId: "external-test",
    },
  },
  ICDCode: {
    [LIST]: {
      page: 1,
      size: 1000,
      byValue: ["code", "me"],
      sortBy: ["1234567890987654321", "0987654321123456789"],
      filters: [JSON.stringify({ field: "description", operator: "eq", value: "hurt" })],
      filtersOperator: "eq",
    },
  },
  InsuranceClaim: {
    [LIST]: {
      page: 1,
      size: 20,
      byEncounterId: ["12345678_9098765_4321", "0987_65432112_3456789"],
      sortBy: ["createdAt"],
      filters: [JSON.stringify({ field: "patient_id", operator: "eq", value: "12132" })],
      filtersOperator: "eq",
    },
  },
  InsurancePolicy: {
    [LIST]: {
      page: 1,
      size: 20,
      sortBy: ["createdAt"],
      filters: [JSON.stringify({ field: "patient_id", operator: "eq", value: "12132" })],
      filtersOperator: "eq",
    },
  },
  LabTest: {
    [LIST]: {
      byProvider: ["0xxxxxxxxxx"],
    },
  },
  LabTestOrder: {
    [LIST]: {
      page: 1,
      size: 20,
      byPatientId: ["45677"],
      sortBy: ["createdAt"],
      byId: ["123455", "1231231"],
    },
  },
  Lead: {
    [LIST]: {
      page: 1,
      size: 20,
      sortBy: ["createdAt"],
      byId: ["1234567890987654321", "0987654321123456789"],
    },
  },
  Observation: {
    [LIST]: {
      page: 1,
      size: 20,
      byName: "test",
      byTags: ["some", "tags"],
      byPatientId: ["67890"],
      byGoalId: ["1234", "5657"],
      bySourceId: ["546", "321"],
      bySourceType: ["some", "source"],
      sortBy: ["observedDate"],
      filters: [JSON.stringify({ field: "name", operator: "eq", value: "yourName" })],
      filtersOperator: "and",
      byId: ["12345", "67890"],
    },
  },
  ObservationType: {
    [LIST]: {
      page: 1,
      size: 20,
      sortBy: ["createdAt"],
      byId: ["1234567890987654321", "0987654321123456789"],
      byTags: ["some", "tags"],
      patientId: "67890",
      filters: [JSON.stringify({ field: "name", operator: "eq", value: "yourName" })],
      filtersOperator: "and",
    },
  },
  Organization: {
    [LIST]: {
      page: 1,
      size: 20,
      sortBy: ["createdAt"],
      byId: ["1234567890987654321", "0987654321123456789"],
    },
  },
  Patient: {
    [LIST]: {
      page: 1,
      size: 20,
      byTags: ["some", "tags"],
      sortBy: ["createdAt"],
      byId: ["1234567890987654321", "0987654321123456789"],
      byAge: 14,
      byEmail: ["smith@gmail.com"],
      byFirstName: "John",
      byLastName: "Smith",
      filters: [JSON.stringify({ field: "name", operator: "eq", value: "yourName" })],
      filtersOperator: "and",
      byPrimaryPhoneNumber: "12345",
    },
  },
  PatientRelatedPerson: {
    [LIST]: {
      page: 1,
      size: 20,
      sortBy: ["createdAt"],
      filtersOperator: "eq",
      filters: [JSON.stringify({ field: "relationship_type", operator: "eq", value: "father" })],
    },
  },
  PatientMedication: {
    [LIST]: {
      page: 1,
      size: 20,
      sortBy: ["createdAt"],
      byId: ["1234567890987654321", "0987654321123456789"],
      byPatientId: ["12345", "67890"],
    },
  },
  PayerIdentification: {
    [LIST]: {
      page: 1,
      size: 10,
      sortBy: ["createdAt"],
      byPayerId: ["1234567890987654321", "0987654321123456789"],
      byPayerName: "Aetna",
      filtersOperator: "in",
      filters: [JSON.stringify({ field: "payer_name", operator: "in", value: "aetna" })],
    },
  },
  Payment: {
    [LIST]: {
      size: 10,
      startingAfter: "12345",
      endingBefore: "67890",
    },
  },
  Pharmacy: {
    [LIST]: {
      name: "Jean Coutu",
    },
  },
  Practitioner: {
    [LIST]: {
      page: 1,
      size: 20,
      sortBy: ["createdAt"],
      byTags: ["some", "tags"],
      byId: ["1234567890987654321", "0987654321123456789"],
      byEmail: ["testemail@test.com", "sample@test.org"],
      filters: [JSON.stringify({ field: "name", operator: "eq", value: "yourName" })],
      filtersOperator: "and",
    },
  },
  Prescription: {
    [LIST]: {
      page: 1,
      size: 20,
      sortBy: ["createdAt"],
      byPatientId: ["some", "ids"],
      hasRefillsLeft: true,
      filters: [JSON.stringify({ field: "name", operator: "eq", value: "yourName" })],
      filtersOperator: "and",
    },
  },
  Product: {
    [LIST]: {
      page: 1,
      size: 20,
      sortBy: ["createdAt"],
      byId: ["1234567890987654321", "0987654321123456789"],
      byName: "Smith",
      byTags: ["some", "tags"],
      filters: [JSON.stringify({ field: "name", operator: "eq", value: "yourName" })],
    },
  },
  Questionnaire: {
    [LIST]: {
      page: 1,
      size: 20,
      sortBy: ["createdAt"],
      byId: ["1234567890987654321", "0987654321123456789"],
      byTags: ["some", "tags"],
      includeRelationships: true,
      filters: [JSON.stringify({ field: "name", operator: "eq", value: "yourName" })],
      filtersOperator: "and",
    },
  },
  Race: {
    [LIST]: {
      byParentCode: ["12345", "67890"],
      byLevel: ["2", "3"],
      byId: ["1234567890987654321", "0987654321123456789"],
      page: 1,
      size: 1000,
    },
  },
  Submission: {
    [LIST]: {
      page: 1,
      size: 20,
      sortBy: ["createdAt"],
      byId: ["1234567890987654321", "0987654321123456789"],
      byPatientId: ["12345", "67890"],
      filters: [JSON.stringify({ field: "name", operator: "eq", value: "yourName" })],
      filtersOperator: "and",
      byStatus: "active",
      search: "okok",
    },
  },
  Subscription: {
    [LIST]: {
      size: 20,
      endingBefore: "abcd",
      startingAfter: "1234",
      patientId: "123456",
    },
  },
  Tag: {
    [LIST]: {
      page: 1,
      size: 20,
    },
  },
  Target: {
    [LIST]: {
      page: 1,
      size: 20,
      sortBy: ["createdAt"],
      byId: ["1234567890987654321", "0987654321123456789"],
    },
  },
  TargetTemplate: {
    [LIST]: {
      page: 1,
      size: 20,
      sortBy: ["createdAt"],
      byId: ["1234567890987654321", "0987654321123456789"],
      byName: "Smith",
      byTags: ["some", "tags"],
    },
  },
  Task: {
    [LIST]: {
      page: 1,
      size: 20,
      sortBy: ["createdAt"],
      byId: ["1234567890987654321", "0987654321123456789"],
      byName: "test",
      byTags: ["some", "tags"],
      byPatientId: ["12345", "67890"],
    },
  },
  TaskTemplate: {
    [LIST]: {
      page: 1,
      size: 20,
      sortBy: ["createdAt"],
      byId: ["1234567890987654321", "0987654321123456789"],
      byName: "test",
      byTags: ["some", "tags"],
      byExternalId: "external-test",
    },
  },
  TenantAdmin: {
    [LIST]: {
      page: 1,
      size: 20,
      sortBy: ["createdAt"],
      byId: ["1234567890987654321", "0987654321123456789"],
      byEmail: ["testemail@test.com", "sample@test.org"],
    },
  },
  User: {
    [LIST]: {
      page: 1,
      size: 20,
      byType: ["patient", "practitioner"],
      sortBy: ["createdAt"],
      byEmail: ["testemail@test.com", "sample@test.org"],
      byFirstName: "john",
      byMiddleName: "e",
      byLastName: "doe",
      search: "search string",
      byId: ["1234567890987654321", "0987654321123456789"],
      filters: [JSON.stringify({ field: "name", operator: "eq", value: "yourName" })],
      filtersOperator: "and",
    },
  },
  Webhook: {
    [LIST]: {
      page: 1,
      size: 20,
      sortBy: ["createdAt"],
      byId: ["1234567890987654321", "0987654321123456789"],
    },
  },
  Workflow: {
    [LIST]: {
      page: 1,
      size: 20,
      sortBy: ["createdAt"],
      byId: ["1234567890987654321", "0987654321123456789"],
    },
  },
  WorkflowLog: {
    [LIST]: {
      filters: [JSON.stringify({ field: "name", operator: "eq", value: "yourName" })],
      page: 1,
      size: 20,
      sortBy: ["createdAt"],
    },
  },
};

// for methods having special processed query params
const SPECIAL_PROCESSED_QUERY_PARAMS = {
  Appointment: {
    [LIST]: {
      page: 1,
      size: 20,
      attendeeIds: "1234567890987654321,0987654321123456789",
      scheduledAfter: "2022-03-06T12:30:00-0500",
      scheduledBefore: "2022-03-06T12:30:00-0500",
    },
  },
  Availability: {
    [LIST]: {
      page: 1,
      size: 20,
      fromDate: "2022-03-06T12:30:00-0500",
      toDate: "2022-03-06T12:30:00-0500",
      appointmentTypeId: "23034",
      calendarId: "1234567890987654321",
    },
  },
  Attachment: {
    [LIST]: {
      byFileType: "csv,pdf",
      byId: "1234567890987654321,0987654321123456789",
      byUserId: "12345,67890",
      sortBy: "createdAt",
    },
  },
  Calendar: {
    [LIST]: {
      calendarId: "20111",
      userIds: "1234567890987654321,0987654321123456789",
    },
  },
  CarePlan: {
    [LIST]: {
      byTags: "some,tags",
      byPatientId: "12345,67890",
      sortBy: "createdAt",
      byId: "1234567890987654321,0987654321123456789",
    },
  },
  CarePlanTemplate: {
    [LIST]: {
      byTags: "some,tags",
      sortBy: "createdAt",
      byId: "1234567890987654321,0987654321123456789",
    },
  },
  Conversation: {
    [LIST]: {
      page: 1,
      size: 20,
      byId: "1234567890987654321,0987654321123456789",
      byUserId: "12345,67890",
      byTwilioSid: "CH_some_id_here,CH_another_id_here",
      byConversationType: "chat,sms",
    },
  },
  CPTCode: {
    [LIST]: {
      page: 1,
      size: 1000,
      byValue: "code,me",
      byDescription: "hurt",
      sortBy: "1234567890987654321,0987654321123456789",
      "filters[]": ['{"field":"description","operator":"eq","value":"hurt"}'],
      filtersOperator: "eq",
    },
  },
  Encounter: {
    [LIST]: {
      page: 1,
      size: 1000,
      sortBy: "1234567890987654321,0987654321123456789",
      "filters[]": ['{"field":"name","operator":"eq","value":"yourName"}'],
      filtersOperator: "and",
    },
  },
  Eligibility: {
    [LIST]: {
      page: 1,
      size: 20,
      sortBy: "createdAt",
      byPatientId: "external-test,12034",
      "filters[]": ['{"field":"status","operator":"eq","value":"active"}'],
      filtersOperator: "eq",
    },
  },
  Ethnicity: {
    [LIST]: {
      byParentCode: "12345,67890",
      byLevel: "2,3",
      byId: "1234567890987654321,0987654321123456789",
    },
  },
  Goal: {
    [LIST]: {
      byTags: "some,tags",
      byPatientId: "12345,67890",
      sortBy: "createdAt",
      byId: "1234567890987654321,0987654321123456789",
    },
  },
  GoalTemplate: {
    [LIST]: {
      byTags: "some,tags",
      sortBy: "createdAt",
      byId: "1234567890987654321,0987654321123456789",
    },
  },
  ICDCode: {
    [LIST]: {
      page: 1,
      size: 1000,
      byValue: "code,me",
      sortBy: "1234567890987654321,0987654321123456789",
      "filters[]": ['{"field":"description","operator":"eq","value":"hurt"}'],
      filtersOperator: "eq",
    },
  },
  InsuranceClaim: {
    [LIST]: {
      page: 1,
      size: 20,
      byEncounterId: "12345678_9098765_4321,0987_65432112_3456789",
      sortBy: "createdAt",
      "filters[]": ['{"field":"patient_id","operator":"eq","value":"12132"}'],
      filtersOperator: "eq",
    },
  },
  InsurancePolicy: {
    [LIST]: {
      page: 1,
      size: 20,
      sortBy: "createdAt",
      "filters[]": ['{"field":"patient_id","operator":"eq","value":"12132"}'],
      filtersOperator: "eq",
    },
  },
  LabTest: {
    [LIST]: {
      byProvider: "0xxxxxxxxxx",
    },
  },
  LabTestOrder: {
    [LIST]: {
      byPatientId: "45677",
      sortBy: "createdAt",
      byId: "123455,1231231",
    },
  },
  Lead: {
    [LIST]: {
      sortBy: "createdAt",
      byId: "1234567890987654321,0987654321123456789",
    },
  },
  Observation: {
    [LIST]: {
      byTags: "some,tags",
      byPatientId: "67890",
      byGoalId: "1234,5657",
      bySourceId: "546,321",
      bySourceType: "some,source",
      sortBy: "observedDate",
      "filters[]": ['{"field":"name","operator":"eq","value":"yourName"}'],
      byId: "12345,67890",
    },
  },
  ObservationType: {
    [LIST]: {
      byTags: "some,tags",
      patientId: "67890",
      sortBy: "createdAt",
      byId: "1234567890987654321,0987654321123456789",
      "filters[]": ['{"field":"name","operator":"eq","value":"yourName"}'],
    },
  },
  Organization: {
    [LIST]: {
      sortBy: "createdAt",
      byId: "1234567890987654321,0987654321123456789",
    },
  },
  Patient: {
    [LIST]: {
      sortBy: "createdAt",
      byId: "1234567890987654321,0987654321123456789",
      byTags: "some,tags",
      byAge: 14,
      byEmail: "smith@gmail.com",
      byFirstName: "John",
      byLastName: "Smith",
      "filters[]": ['{"field":"name","operator":"eq","value":"yourName"}'],
      byPrimaryPhoneNumber: "12345",
    },
  },
  PatientRelatedPerson: {
    [LIST]: {
      sortBy: "createdAt",
      filtersOperator: "eq",
      "filters[]": ['{"field":"relationship_type","operator":"eq","value":"father"}'],
    },
  },
  PatientMedication: {
    [LIST]: {
      sortBy: "createdAt",
      byId: "1234567890987654321,0987654321123456789",
      byPatientId: "12345,67890",
    },
  },
  PayerIdentification: {
    [LIST]: {
      sortBy: "createdAt",
      byPayerId: "1234567890987654321,0987654321123456789",
      byPayerName: "Aetna",
      "filters[]": ['{"field":"payer_name","operator":"in","value":"aetna"}'],
      filtersOperator: "in",
    },
  },
  Practitioner: {
    [LIST]: {
      byTags: "some,tags",
      sortBy: "createdAt",
      byId: "1234567890987654321,0987654321123456789",
      byEmail: "testemail@test.com,sample@test.org",
      "filters[]": ['{"field":"name","operator":"eq","value":"yourName"}'],
    },
  },
  Prescription: {
    [LIST]: {
      page: 1,
      size: 20,
      sortBy: "createdAt",
      byPatientId: "some,ids",
      hasRefillsLeft: true,
      "filters[]": ['{"field":"name","operator":"eq","value":"yourName"}'],
      filtersOperator: "and",
    },
  },
  Product: {
    [LIST]: {
      byTags: "some,tags",
      sortBy: "createdAt",
      byId: "1234567890987654321,0987654321123456789",
      "filters[]": ['{"field":"name","operator":"eq","value":"yourName"}'],
    },
  },
  Questionnaire: {
    [LIST]: {
      byTags: "some,tags",
      sortBy: "createdAt",
      byId: "1234567890987654321,0987654321123456789",
      "filters[]": ['{"field":"name","operator":"eq","value":"yourName"}'],
    },
  },
  Race: {
    [LIST]: {
      byParentCode: "12345,67890",
      byLevel: "2,3",
      byId: "1234567890987654321,0987654321123456789",
    },
  },
  Submission: {
    [LIST]: {
      byPatientId: "12345,67890",
      sortBy: "createdAt",
      byId: "1234567890987654321,0987654321123456789",
      "filters[]": ['{"field":"name","operator":"eq","value":"yourName"}'],
    },
  },
  Target: {
    [LIST]: {
      sortBy: "createdAt",
      byId: "1234567890987654321,0987654321123456789",
    },
  },
  TargetTemplate: {
    [LIST]: {
      sortBy: "createdAt",
      byId: "1234567890987654321,0987654321123456789",
      byName: "Smith",
      byTags: "some,tags",
    },
  },
  Task: {
    [LIST]: {
      byTags: "some,tags",
      byPatientId: "12345,67890",
      sortBy: "createdAt",
      byId: "1234567890987654321,0987654321123456789",
    },
  },
  TaskTemplate: {
    [LIST]: {
      byTags: "some,tags",
      sortBy: "createdAt",
      byId: "1234567890987654321,0987654321123456789",
    },
  },
  TenantAdmin: {
    [LIST]: {
      sortBy: "createdAt",
      byId: "1234567890987654321,0987654321123456789",
      byEmail: "testemail@test.com,sample@test.org",
    },
  },
  User: {
    [LIST]: {
      page: 1,
      size: 20,
      byType: "patient,practitioner",
      sortBy: "createdAt",
      byEmail: "testemail@test.com,sample@test.org",
      byFirstName: "john",
      byMiddleName: "e",
      byLastName: "doe",
      search: "search string",
      byId: "1234567890987654321,0987654321123456789",
      "filters[]": ['{"field":"name","operator":"eq","value":"yourName"}'],
    },
  },
  Webhook: {
    [LIST]: {
      sortBy: "createdAt",
      byId: "1234567890987654321,0987654321123456789",
    },
  },
  Workflow: {
    [LIST]: {
      sortBy: "createdAt",
      byId: "1234567890987654321,0987654321123456789",
    },
  },
  WorkflowLog: {
    [LIST]: {
      "filters[]": ['{"field":"name","operator":"eq","value":"yourName"}'],
      page: 1,
      size: 20,
      sortBy: "createdAt",
    },
  },
};

// classes having empty CREATE body params
const EMPTY_CREATE_BODIES = ["Conversation"];

// classes having empty UPDATE body params
const EMPTY_UPDATE_BODIES = [
  "IntegrationsAcuity",
  "IntegrationsButterflyLabs",
  "IntegrationsCurexa",
  "IntegrationsFreshpaint",
  "IntegrationsImaware",
  "IntegrationsMdi",
  "IntegrationsPhotonHealth",
  "IntegrationsSegment",
  "IntegrationsShopify",
  "IntegrationsStripe",
  "IntegrationsCandid",
];

const CONTENT_TYPES_EXCEPTIONS = {
  Conversation: {
    [CREATE]: [],
    [CREATE_GROUP_SMS]: ["application/json"],
    [CREATE_GROUP_CHAT]: ["application/json"],
  },
  VideoCall: {
    [CREATE_VIDEO_CALL]: ["application/json"],
  },
  Appointment: {
    [RESCHEDULE]: ["application/json"],
  },
};

const FORM_DATA_CREATES = ["Attachment"];

// irregular endpoint paths
const IRREGULAR_URLS_MATCHES = {
  AppointmentType: "/appointments/types",
  Availability: "/availability",
  Case: "/mdi/patient_cases",
  IntegrationsAcuity: "/integrations/acuity",
  IntegrationsButterflyLabs: "/integrations/butterfly_labs",
  IntegrationsCandid: "/integrations/candid",
  IntegrationsCurexa: "/integrations/curexa",
  IntegrationsFreshpaint: "/integrations/freshpaint",
  IntegrationsImaware: "/integrations/imaware",
  IntegrationsLooker: "/integrations/looker",
  IntegrationsMdi: "/integrations/mdi",
  IntegrationsPhotonHealth: "/integrations/photon_health",
  IntegrationsSegment: "/integrations/segment",
  IntegrationsShopify: "/integrations/shopify",
  IntegrationsStripe: "/integrations/stripe",
  ObservationType: "/observations/types",
  Submission: "/surveys/submissions",
  Webhook: "/webhook_endpoints",
  Compound: "/mdi/compounds",
  Pharmacy: "/mdi/pharmacies",
  Medication: "/mdi/medications",
  PatientRelatedPerson: "/patient_related_persons",
  APICredential: "/api_credentials",
  CPTCode: "/cpt_codes",
  ICDCode: "/icd_codes",
  WorkflowLog: "/workflows/logs",
};
const IRREGULAR_URLS_CLASSES = Object.keys(IRREGULAR_URLS_MATCHES);

const PATH_ARG = 0;
const METHOD_ARG = 1;
const PATHPARAMS_ARG = 2;
const QUERY_ARG = 3;
const HEADERS_ARG = 4;
const FORM_ARG = 5;
const BODY_ARG = 6;
const AUTH_ARG = 7;
const CONTENTTYPES_ARG = 8;
const ACCEPTS_ARG = 9;
const RETURNTYPES_ARG = 10;
const CALLBACK_ARG = 11;

describe("the api.client Proxy", () => {
  Object.keys(SUPPORTED_CONTROLLERS).forEach((klass) => {
    test(`has a ${klass} controller namespace`, () => {
      expect(typeof api.client[klass]).toEqual("object");
    });
  });

  describe("wraps classes that", () => {
    const sandbox = sinon.createSandbox();
    const codegenClient = ApiClient.instance;
    let spy: SinonSpy | undefined;
    let instanceId: number;
    beforeEach(function () {
      spy = sandbox.spy(codegenClient, "callApi");
      instanceId = randomUUID();
    });

    afterEach(function () {
      sandbox.restore();
      spy = undefined;
    });

    Object.keys(SUPPORTED_CONTROLLERS).forEach((klass) => {
      let url: string;

      if (IRREGULAR_URLS_CLASSES.includes(klass)) {
        url = IRREGULAR_URLS_MATCHES[klass];
      } else if (klass.includes("Template")) {
        const spliceIndex = klass.indexOf("Template");
        url =
          snakeCaseUrlFromCamelClassName(klass.slice(0, spliceIndex)) +
          snakeCaseUrlFromCamelClassName(klass.slice(spliceIndex));
      } else {
        url = snakeCaseUrlFromCamelClassName(klass);
      }

      if (SUPPORTED_CONTROLLERS[klass].includes(LIST)) {
        test(`list ${klass}`, async () => {
          let queryParams = {};
          let processedParams = {};
          if (
            typeof SPECIAL_QUERY_PARAMS[klass] == "object" &&
            typeof SPECIAL_QUERY_PARAMS[klass][LIST] == "object"
          ) {
            processedParams = queryParams = SPECIAL_QUERY_PARAMS[klass][LIST];
            if (
              typeof SPECIAL_PROCESSED_QUERY_PARAMS[klass] == "object" &&
              typeof SPECIAL_PROCESSED_QUERY_PARAMS[klass][LIST] == "object"
            ) {
              processedParams = Object.assign(
                {},
                processedParams,
                SPECIAL_PROCESSED_QUERY_PARAMS[klass][LIST]
              );
            }
            if (klass === "Availability") {
              await api.client[klass].list("2022-03-06T12:30:00-0500", "23034", queryParams);
            } else {
              await api.client[klass].list(queryParams);
            }
          } else await api.client[klass].list();

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(url);
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("GET");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual(snakeCaseParamsNames(processedParams));
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual({});
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(null);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else {
        test(`list throws on ${klass}`, async () => {
          try {
            await api.client[klass].list();
          } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual("No API target method named: list");
          }

          expect(codegenClient.callApi.calledOnce).toBe(false);
        });
      }

      if (SUPPORTED_CONTROLLERS[klass].includes(GET)) {
        test(`get ${klass}`, async () => {
          await api.client[klass].get(instanceId);

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(url + "/{id}");
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("GET");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({ id: instanceId });
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual({});
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual({});
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(null);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else {
        test(`get throws on ${klass}`, async () => {
          try {
            await api.client[klass].get();
          } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual("No API target method named: get");
          }

          expect(codegenClient.callApi.calledOnce).toBe(false);
        });
      }

      if (SUPPORTED_CONTROLLERS[klass].includes(CREATE) && EMPTY_CREATE_BODIES.includes(klass)) {
        test(`create ${klass}`, async () => {
          await api.client[klass].create();

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(url);
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("POST");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual({});
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual({});
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(null);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual(
            contentTypesFor(klass, CREATE) || ["application/json"]
          );
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else if (
        SUPPORTED_CONTROLLERS[klass].includes(CREATE) &&
        FORM_DATA_CREATES.includes(klass)
      ) {
        test(`create ${klass}`, async () => {
          const formData = {
            userId: instanceId,
            file: "FILEBINARYBLOBWHATSOEVER",
            fileType: "image/png",
            description: undefined,
          };
          await api.client[klass].create(formData);

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(url);
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("POST");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual({});
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual(snakeCaseParamsNames(formData));
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(null);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual(["multipart/form-data"]);
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else if (SUPPORTED_CONTROLLERS[klass].includes(CREATE)) {
        test(`create ${klass}`, async () => {
          let queryParams = {};
          let processedParams = {};
          if (
            typeof SPECIAL_QUERY_PARAMS[klass] == "object" &&
            typeof SPECIAL_QUERY_PARAMS[klass][CREATE] == "object"
          ) {
            processedParams = queryParams = SPECIAL_QUERY_PARAMS[klass][CREATE];
            if (
              typeof SPECIAL_PROCESSED_QUERY_PARAMS[klass] == "object" &&
              typeof SPECIAL_PROCESSED_QUERY_PARAMS[klass][CREATE] == "object"
            ) {
              processedParams = Object.assign(
                {},
                processedParams,
                SPECIAL_PROCESSED_QUERY_PARAMS[klass][CREATE]
              );
            }
            await api.client[klass].create(queryParams);
          } else {
            await api.client[klass].create({ name: instanceId });
          }

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(url);
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("POST");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual(snakeCaseParamsNames(processedParams));
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual({});
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(undefined);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual(
            contentTypesFor(klass, CREATE) || ["application/json"]
          );
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else {
        test(`create throws on ${klass}`, async () => {
          try {
            await api.client[klass].create({ name: instanceId });
          } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual("No API target method named: create");
          }

          expect(codegenClient.callApi.calledOnce).toBe(false);
        });
      }

      if (SUPPORTED_CONTROLLERS[klass].includes(UPDATE)) {
        test(`update ${klass}`, async () => {
          let updateUrl: string, updateParams: Record<string, unknown>;
          if (EMPTY_UPDATE_BODIES.includes(klass)) {
            updateUrl = url;
            updateParams = {};
            await api.client[klass].update(instanceId);
          } else {
            updateUrl = url + "/{id}";
            updateParams = { id: instanceId };
            await api.client[klass].update(instanceId, { name: instanceId });
          }
          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(updateUrl);
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("PATCH");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual(updateParams);
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual({});
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual({});
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(undefined);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else {
        test(`update throws on ${klass}`, async () => {
          try {
            await api.client[klass].update(instanceId, { name: instanceId });
          } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual("No API target method named: update");
          }

          expect(codegenClient.callApi.calledOnce).toBe(false);
        });
      }

      if (SUPPORTED_CONTROLLERS[klass].includes(DELETE)) {
        test(`delete ${klass}`, async () => {
          await api.client[klass].delete(instanceId);

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(url + "/{id}/archive");
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("DELETE");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({ id: instanceId });
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual({});
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual({});
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(null);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else {
        test(`delete throws on ${klass}`, async () => {
          try {
            await api.client[klass].delete();
          } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual("No API target method named: delete");
          }

          expect(codegenClient.callApi.calledOnce).toBe(false);
        });
      }

      if (SUPPORTED_CONTROLLERS[klass].includes(SMS_TOKEN)) {
        test(`${klass} SMS token`, async () => {
          await api.client[klass].smsToken();

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(url + "/twilio_sms_token");
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("GET");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual({});
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual({});
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(null);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else {
        test(`SMS token throws on ${klass}`, async () => {
          try {
            await api.client[klass].smsToken();
          } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual("No API target method named: smsToken");
          }

          expect(codegenClient.callApi.calledOnce).toBe(false);
        });
      }

      if (SUPPORTED_CONTROLLERS[klass].includes(SMS_OWNER_TOKEN)) {
        test(`${klass} SMS owner token`, async () => {
          await api.client[klass].smsOwnerToken();

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(url + "/twilio_sms_owner_token");
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("GET");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual({});
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual({});
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(null);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else {
        test(`tenant token throws on ${klass}`, async () => {
          try {
            await api.client[klass].smsOwnerToken();
          } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual("No API target method named: smsOwnerToken");
          }

          expect(codegenClient.callApi.calledOnce).toBe(false);
        });
      }

      if (SUPPORTED_CONTROLLERS[klass].includes(CHAT_TOKEN)) {
        test(`${klass} chat token`, async () => {
          await api.client[klass].chatToken();

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(url + "/twilio_chat_token");
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("GET");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual({});
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual({});
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(null);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else {
        test(`chat token throws on ${klass}`, async () => {
          try {
            await api.client[klass].chatToken();
          } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual("No API target method named: chatToken");
          }

          expect(codegenClient.callApi.calledOnce).toBe(false);
        });
      }

      if (SUPPORTED_CONTROLLERS[klass].includes(CHAT_OWNER_TOKEN)) {
        test(`${klass} chat owner token`, async () => {
          await api.client[klass].chatOwnerToken();

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(url + "/twilio_chat_owner_token");
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("GET");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual({});
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual({});
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(null);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else {
        test(`tenant token throws on ${klass}`, async () => {
          try {
            await api.client[klass].chatOwnerToken();
          } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual("No API target method named: chatOwnerToken");
          }

          expect(codegenClient.callApi.calledOnce).toBe(false);
        });
      }

      if (SUPPORTED_CONTROLLERS[klass].includes(ME)) {
        test(`${klass} me`, async () => {
          await api.client[klass].me();

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(url + "/me");
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("GET");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual({});
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual({});
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(null);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else {
        test(`me throws on ${klass}`, async () => {
          try {
            await api.client[klass].me();
          } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual("No API target method named: me");
          }

          expect(codegenClient.callApi.calledOnce).toBe(false);
        });
      }

      if (SUPPORTED_CONTROLLERS[klass].includes(SUGGESTION)) {
        test(`${klass} me`, async () => {
          await api.client[klass].suggestion({ name: instanceId });

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(
            snakeCaseUrlFromCamelClassName(klass) + "/care_suggestions"
          );
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("POST");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual({});
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual({});
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(undefined);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else {
        test(`suggestion throws on ${klass}`, async () => {
          try {
            await api.client[klass].suggestion({ name: instanceId });
          } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual("No API target method named: suggestion");
          }

          expect(codegenClient.callApi.calledOnce).toBe(false);
        });
      }

      if (SUPPORTED_CONTROLLERS[klass].includes(SEARCH)) {
        test(`search ${klass}`, async () => {
          await api.client[klass].search({ name: instanceId });

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(url + "/search");
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("GET");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual({ name: { name: instanceId } });
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual({});
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(null);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else {
        test(`search throws on ${klass}`, async () => {
          try {
            await api.client[klass].search();
          } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual("No API target method named: search");
          }

          expect(codegenClient.callApi.calledOnce).toBe(false);
        });
      }

      if (SUPPORTED_CONTROLLERS[klass].includes(SELECT)) {
        test(`select ${klass}`, async () => {
          await api.client[klass].select(instanceId, "300mic");

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(url + "/select");
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("GET");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual({
            name: instanceId,
            strength: "300mic",
          });
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual({});
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(null);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else {
        test(`select throws on ${klass}`, async () => {
          try {
            await api.client[klass].select();
          } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual("No API target method named: select");
          }

          expect(codegenClient.callApi.calledOnce).toBe(false);
        });
      }

      if (SUPPORTED_CONTROLLERS[klass].includes(LINK)) {
        test(`link ${klass}`, async () => {
          await api.client[klass].link({ name: instanceId });

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(url + "/link");
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("POST");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual({});
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual({});
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(undefined);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else {
        test(`link throws on ${klass}`, async () => {
          try {
            await api.client[klass].link();
          } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual("No API target method named: link");
          }

          expect(codegenClient.callApi.calledOnce).toBe(false);
        });
      }

      if (SUPPORTED_CONTROLLERS[klass].includes(EXPORT)) {
        test(`export ${klass}`, async () => {
          await api.client[klass].export(instanceId);

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(url + "/{id}/export");
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("GET");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({ id: instanceId });
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual({});
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual({});
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(null);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else {
        test(`export throws on ${klass}`, async () => {
          try {
            await api.client[klass].export();
          } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual("No API target method named: export");
          }

          expect(codegenClient.callApi.calledOnce).toBe(false);
        });
      }

      if (SUPPORTED_CONTROLLERS[klass].includes(INVITE)) {
        test(`invite ${klass}`, async () => {
          await api.client[klass].invite({ name: instanceId });

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(url + "/invite");
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("POST");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual({});
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual({});
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(undefined);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else {
        test(`invite throws on ${klass}`, async () => {
          try {
            await api.client[klass].invite();
          } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual("No API target method named: invite");
          }

          expect(codegenClient.callApi.calledOnce).toBe(false);
        });
      }

      if (SUPPORTED_CONTROLLERS[klass].includes(COGNITO_APP_CLIENTS_SECRET)) {
        test(`${klass} secret`, async () => {
          await api.client[klass].cognitoAppClientsSecret(instanceId);

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(url + "/cognito_app_clients/{id}/secret");
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("GET");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({ id: instanceId });
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual({});
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual({});
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(null);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else {
        test(`secret throws on ${klass}`, async () => {
          try {
            await api.client[klass].cognitoAppClientsSecret();
          } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual("No API target method named: cognitoAppClientsSecret");
          }

          expect(codegenClient.callApi.calledOnce).toBe(false);
        });
      }

      if (SUPPORTED_CONTROLLERS[klass].includes(WEBHOOK_SIGNATURE_KEYS_SECRET)) {
        test(`${klass} secret`, async () => {
          await api.client[klass].webhookSignatureKeysSecret(instanceId);

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(
            url + "/webhook_signature_keys/{id}/secret"
          );
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("GET");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({ id: instanceId });
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual({});
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual({});
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(null);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else {
        test(`secret throws on ${klass}`, async () => {
          try {
            await api.client[klass].webhookSignatureKeysSecret();
          } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual("No API target method named: webhookSignatureKeysSecret");
          }

          expect(codegenClient.callApi.calledOnce).toBe(false);
        });
      }

      if (SUPPORTED_CONTROLLERS[klass].includes(AVATAR_UPLOAD)) {
        test(`${klass} avatar upload`, async () => {
          const formData = { avatar: "BINARYAVATARBLOWWHATSOEVER" };
          await api.client[klass].avatarUpload(instanceId, formData);

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(url + "/{id}/avatar");
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("POST");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({ id: instanceId });
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual({});
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual(snakeCaseParamsNames(formData));
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(null);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual(["multipart/form-data"]);
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else {
        test(`avatar upload throws on ${klass}`, async () => {
          try {
            await api.client[klass].avatarUpload();
          } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual("No API target method named: avatarUpload");
          }

          expect(codegenClient.callApi.calledOnce).toBe(false);
        });
      }

      if (SUPPORTED_CONTROLLERS[klass].includes(UPLOAD_CARD)) {
        test(`${klass} upload card`, async () => {
          const formData = {
            insuranceCardFront: { path: "FILEBINARYBLOBWHATSOEVER", type: "image/jpeg" },
            insuranceCardBack: { path: "FILEBINARYBLOBWHATSOEVER", type: "image/jpeg" },
          };

          await api.client[klass].uploadCard(instanceId, formData);

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(url + "/{id}/card");
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("PATCH");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({ id: instanceId });
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual({});
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual(snakeCaseParamsNames(formData));
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(null);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual(["multipart/form-data"]);
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else {
        test(`upload card throws on ${klass}`, async () => {
          try {
            await api.client[klass].uploadCard();
          } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual("No API target method named: uploadCard");
          }

          expect(codegenClient.callApi.calledOnce).toBe(false);
        });
      }

      if (SUPPORTED_CONTROLLERS[klass].includes(CREATE_GROUP_SMS)) {
        test(`create group SMS ${klass}`, async () => {
          await api.client[klass].createGroupSms({ name: instanceId });

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(url + "/create_group_sms");
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("POST");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual({});
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual({});
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(undefined);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual(
            contentTypesFor(klass, CREATE_GROUP_SMS) || ["application/json"]
          );
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else {
        test(`create group SMS throws on ${klass}`, async () => {
          try {
            await api.client[klass].createGroupSms({ name: instanceId });
          } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual("No API target method named: createGroupSms");
          }

          expect(codegenClient.callApi.calledOnce).toBe(false);
        });
      }

      if (SUPPORTED_CONTROLLERS[klass].includes(CREATE_GROUP_CHAT)) {
        test(`create group chat ${klass}`, async () => {
          await api.client[klass].createGroupChat({ name: instanceId });

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(url + "/create_group_chat");
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("POST");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual({});
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual({});
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(undefined);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual(
            contentTypesFor(klass, CREATE_GROUP_CHAT) || ["application/json"]
          );
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else {
        test(`create group chat throws on ${klass}`, async () => {
          try {
            await api.client[klass].createGroupChat({ name: instanceId });
          } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual("No API target method named: createGroupChat");
          }

          expect(codegenClient.callApi.calledOnce).toBe(false);
        });
      }

      if (SUPPORTED_CONTROLLERS[klass].includes(CREATE_VIDEO_CALL)) {
        test(`create video call ${klass}`, async () => {
          await api.client[klass].privateRoom();

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(url + "/private_room");
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("POST");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual({});
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual({});
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(null);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else {
        test(`create video call throws on ${klass}`, async () => {
          try {
            await api.client[klass].privateRoom();
          } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual("No API target method named: privateRoom");
          }

          expect(codegenClient.callApi.calledOnce).toBe(false);
        });
      }

      if (SUPPORTED_CONTROLLERS[klass].includes(ADD_CHAT_PARTICIPANT)) {
        test(`add chat participant ${klass}`, async () => {
          await api.client[klass].addChatParticipant({ name: instanceId });

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(url + "/add_chat_participant");
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("PATCH");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual({});
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual({});
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(undefined);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else {
        test(`add chat participant throws on ${klass}`, async () => {
          try {
            await api.client[klass].addChatParticipant({ name: instanceId });
          } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual("No API target method named: addChatParticipant");
          }

          expect(codegenClient.callApi.calledOnce).toBe(false);
        });
      }

      if (SUPPORTED_CONTROLLERS[klass].includes(ONBOARDING_LINK)) {
        test(`get stripe onboarding ${klass}`, async () => {
          await api.client[klass].onboardingLink();

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(url + "/onboarding");
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("GET");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual({});
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual({});
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(null);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else {
        test(`get stripe onboarding throws on ${klass}`, async () => {
          try {
            await api.client[klass].onboardingLink();
          } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual("No API target method named: onboardingLink");
          }

          expect(codegenClient.callApi.calledOnce).toBe(false);
        });
      }

      if (SUPPORTED_CONTROLLERS[klass].includes(HINT)) {
        test(`get permissions hints ${klass}`, async () => {
          await api.client[klass].hint();

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(url + "/hints");
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("GET");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual({});
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual({});
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(null);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else {
        test(`get permissions hints throws on ${klass}`, async () => {
          try {
            await api.client[klass].hint();
          } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual("No API target method named: hint");
          }

          expect(codegenClient.callApi.calledOnce).toBe(false);
        });
      }

      if (SUPPORTED_CONTROLLERS[klass].includes(CONFIRM)) {
        test(`confirm post ${klass}`, async () => {
          await api.client[klass].confirm(instanceId);

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(url + "/{id}/confirm");
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("POST");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({ id: instanceId });
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual({});
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual({});
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(null);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else {
        test(`confirm post throws on ${klass}`, async () => {
          try {
            await api.client[klass].confirm(instanceId);
          } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual("No API target method named: confirm");
          }

          expect(codegenClient.callApi.calledOnce).toBe(false);
        });
      }

      if (SUPPORTED_CONTROLLERS[klass].includes(SUBMIT)) {
        test(`submit post ${klass}`, async () => {
          await api.client[klass].submit(instanceId);

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(url + "/{id}/submit");
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("POST");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({ id: instanceId });
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual({});
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual({});
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(null);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else {
        test(`submit post throws on ${klass}`, async () => {
          try {
            await api.client[klass].submit(instanceId);
          } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual("No API target method named: submit");
          }

          expect(codegenClient.callApi.calledOnce).toBe(false);
        });
      }

      if (SUPPORTED_CONTROLLERS[klass].includes(CANCEL)) {
        test(`cancel id post ${klass}`, async () => {
          if (klass === "Subscription") {
            await api.client[klass].cancel(instanceId, null);

            // eslint-disable-next-line
            expect(spy?.getCall(0).args[BODY_ARG]).toBe(undefined);
            // eslint-disable-next-line
            expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual(["application/json"]);
          } else {
            await api.client[klass].cancel(instanceId);

            // eslint-disable-next-line
            expect(spy?.getCall(0).args[BODY_ARG]).toBe(null);
            // eslint-disable-next-line
            expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual([]);
          }

          if (klass === "Appointment") {
            // eslint-disable-next-line
            expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual([]);
          } else {
            // eslint-disable-next-line
            expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          }

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(url + "/{id}/cancel");
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("POST");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({ id: instanceId });
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual({});
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual({});
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else {
        test(`cancel post throws on ${klass}`, async () => {
          try {
            await api.client[klass].cancel(instanceId);
          } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual("No API target method named: cancel");
          }

          expect(codegenClient.callApi.calledOnce).toBe(false);
        });
      }

      if (SUPPORTED_CONTROLLERS[klass].includes(RESCHEDULE)) {
        test(`reschedule post ${klass}`, async () => {
          const body = { appointment: { from_date: "2022-03-06T12:30:00-0500" } };

          await api.client[klass].reschedule(instanceId, { body });

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(url + "/{id}/reschedule");
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("POST");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({ id: instanceId });
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual({});
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual({});
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(body);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual(null);
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else {
        test(`reschedule post throws on ${klass}`, async () => {
          try {
            await api.client[klass].reschedule(instanceId);
          } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual("No API target method named: reschedule");
          }

          expect(codegenClient.callApi.calledOnce).toBe(false);
        });
      }

      if (SUPPORTED_CONTROLLERS[klass].includes(RESULTS)) {
        test(`results get ${klass}`, async () => {
          await api.client[klass].results(instanceId);

          expect(codegenClient.callApi.calledOnce).toBe(true);
          expect(spy?.getCall(0).args[PATH_ARG]).toEqual(url + "/{id}/results");
          expect(spy?.getCall(0).args[METHOD_ARG]).toEqual("GET");
          expect(spy?.getCall(0).args[PATHPARAMS_ARG]).toEqual({ id: instanceId });
          expect(spy?.getCall(0).args[QUERY_ARG]).toEqual({});
          expect(spy?.getCall(0).args[HEADERS_ARG]).toEqual({});
          expect(spy?.getCall(0).args[FORM_ARG]).toEqual({});
          expect(spy?.getCall(0).args[BODY_ARG]).toBe(null);
          expect(spy?.getCall(0).args[AUTH_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[CONTENTTYPES_ARG]).toEqual([]);
          expect(spy?.getCall(0).args[ACCEPTS_ARG]).toEqual(["application/json"]);
          expect(spy?.getCall(0).args[RETURNTYPES_ARG]).toEqual("Blob");
          expect(typeof spy?.getCall(0).args[CALLBACK_ARG]).toEqual("function");
        });
      } else {
        test(`results get throws on ${klass}`, async () => {
          try {
            await api.client[klass].results(instanceId);
          } catch (error: any) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error.message).toEqual("No API target method named: results");
          }

          expect(codegenClient.callApi.calledOnce).toBe(false);
        });
      }
    });
  });
});

// helpers
function snakeCaseUrlFromCamelClassName(name) {
  return "/" + pluralize(snakeCase(name));
}

function snakeCase(word) {
  return word
    .split(/(?=[A-Z])/)
    .join("_")
    .toLowerCase();
}

function randomUUID() {
  return Math.floor(Math.random() * 1000000000000000);
}

function snakeCaseParamsNames(params) {
  const cleanParams = params;

  // These parameters are duplicates.. in our wrapper code we should use the filters key
  // when wanting to add filters to our list call. But the underlying call to backend will use the filters[] key
  // and our code doesn't currently account for parameters that have a different key within the wrapper than key
  // that is used to send to backend code
  if (params?.filters && params["filters[]"]) {
    delete params.filters;
  }
  return Object.keys(cleanParams).reduce((snakeCaseParams, key) => {
    snakeCaseParams[snakeCase(key)] = cleanParams[key];
    return snakeCaseParams;
  }, {});
}

function contentTypesFor(klass, method) {
  return CONTENT_TYPES_EXCEPTIONS[klass] && CONTENT_TYPES_EXCEPTIONS[klass][method];
}
