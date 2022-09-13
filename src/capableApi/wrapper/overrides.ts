// Support for nested API classes
// These will translate to
// `client.IntegrationsAcuity`
// These namespaces won't be pluralized
const SUBCLASS_OVERRIDES = {
  IntegrationsApi: [
    "Integrations",
    "IntegrationsAcuity",
    "IntegrationsButterflyLabs",
    "IntegrationsCandid",
    "IntegrationsCurexa",
    "IntegrationsFreshpaint",
    "IntegrationsImaware",
    "IntegrationsLooker",
    "IntegrationsMdi",
    "IntegrationsSegment",
    "IntegrationsShopify",
    "IntegrationsStripe",
    "IntegrationsPhotonHealth",
  ],
  PatientRelatedPersonsApi: ["PatientRelatedPerson"],
  AvailabilityApi: ["Availability"],
};

// These are classes where the name does not repeat in the method name in a previsible manner
const CLASS_OVERRIDES_MATCHES = {
  AvailabilityApi: "availability",
  CasesApi: "mdiPatientCases",
  CompoundsApi: "mdiCompounds",
  PharmaciesApi: "mdiPharmacies",
  MedicationsApi: "mdiMedications",
  WebhooksApi: "webhookEndpoints",
  SubmissionsApi: "surveysSubmissions",
  PatientRelatedPersonsApi: "patientRelatedPersons",
  APICredentialsApi: "apiCredentials",
  CPTCodesApi: "cptCodes",
  ICDCodesApi: "icdCodes",
  WorkflowLogsApi: "workflowsLogs",
};
const CLASS_OVERRIDES = Object.keys(CLASS_OVERRIDES_MATCHES);

export { SUBCLASS_OVERRIDES, CLASS_OVERRIDES_MATCHES, CLASS_OVERRIDES };
