/*
 * Capable Health API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v0.3
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 3.0.33
 *
 * Do not edit the class manually.
 *
 */
import { ApiClient } from "../ApiClient";

/**
 * The WorkflowscareSuggestionsWorkflow model module.
 * @module model/WorkflowscareSuggestionsWorkflow
 * @version v0.3
 */
export class WorkflowscareSuggestionsWorkflow {
  /**
   * Constructs a new <code>WorkflowscareSuggestionsWorkflow</code>.
   * @alias module:model/WorkflowscareSuggestionsWorkflow
   * @class
   */
  constructor() {}

  /**
   * Constructs a <code>WorkflowscareSuggestionsWorkflow</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/WorkflowscareSuggestionsWorkflow} obj Optional instance to populate.
   * @return {module:model/WorkflowscareSuggestionsWorkflow} The populated <code>WorkflowscareSuggestionsWorkflow</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new WorkflowscareSuggestionsWorkflow();
      if (data.hasOwnProperty("submission_id"))
        obj.submissionId = ApiClient.convertToType(data["submission_id"], "String");
      if (data.hasOwnProperty("event_id"))
        obj.eventId = ApiClient.convertToType(data["event_id"], "String");
      if (data.hasOwnProperty("patient_id"))
        obj.patientId = ApiClient.convertToType(data["patient_id"], "String");
      if (data.hasOwnProperty("workflow_ids"))
        obj.workflowIds = ApiClient.convertToType(data["workflow_ids"], ["String"]);
    }
    return obj;
  }
}

/**
 * ID of the Submission on which to run the workflow(s)
 * @member {String} submissionId
 */
WorkflowscareSuggestionsWorkflow.prototype.submissionId = undefined;

/**
 * ID of the Event on which to run the workflow(s)
 * @member {String} eventId
 */
WorkflowscareSuggestionsWorkflow.prototype.eventId = undefined;

/**
 * ID of the Patient on which to run the workflow(s)
 * @member {String} patientId
 */
WorkflowscareSuggestionsWorkflow.prototype.patientId = undefined;

/**
 * IDs of the Workflows you want to run on the given resource. When no IDs are provided, all Workflows will be run.
 * @member {Array.<String>} workflowIds
 */
WorkflowscareSuggestionsWorkflow.prototype.workflowIds = undefined;
