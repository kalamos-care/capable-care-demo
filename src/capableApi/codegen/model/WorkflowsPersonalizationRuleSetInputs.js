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
 * The WorkflowsPersonalizationRuleSetInputs model module.
 * @module model/WorkflowsPersonalizationRuleSetInputs
 * @version v0.3
 */
export class WorkflowsPersonalizationRuleSetInputs {
  /**
   * Constructs a new <code>WorkflowsPersonalizationRuleSetInputs</code>.
   * @alias module:model/WorkflowsPersonalizationRuleSetInputs
   * @class
   * @param inputModel {module:model/WorkflowsPersonalizationRuleSetInputs.InputModelEnum}
   */
  constructor(inputModel) {
    this.inputModel = inputModel;
  }

  /**
   * Constructs a <code>WorkflowsPersonalizationRuleSetInputs</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/WorkflowsPersonalizationRuleSetInputs} obj Optional instance to populate.
   * @return {module:model/WorkflowsPersonalizationRuleSetInputs} The populated <code>WorkflowsPersonalizationRuleSetInputs</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new WorkflowsPersonalizationRuleSetInputs();
      if (data.hasOwnProperty("input_model"))
        obj.inputModel = ApiClient.convertToType(data["input_model"], "String");
      if (data.hasOwnProperty("value")) obj.value = ApiClient.convertToType(data["value"], Object);
      if (data.hasOwnProperty("input_id"))
        obj.inputId = ApiClient.convertToType(data["input_id"], "String");
      if (data.hasOwnProperty("comparison_operator"))
        obj.comparisonOperator = ApiClient.convertToType(data["comparison_operator"], "String");
      if (data.hasOwnProperty("params"))
        obj.params = ApiClient.convertToType(data["params"], { String: Object });
    }
    return obj;
  }
}

/**
 * Allowed values for the <code>inputModel</code> property.
 * @enum {String}
 * @readonly
 */
WorkflowsPersonalizationRuleSetInputs.InputModelEnum = {
  /**
   * value: "Answer"
   * @const
   */
  answer: "Answer",

  /**
   * value: "Question"
   * @const
   */
  question: "Question",

  /**
   * value: "PatientTag"
   * @const
   */
  patientTag: "PatientTag",

  /**
   * value: "PatientAttribute"
   * @const
   */
  patientAttribute: "PatientAttribute",

  /**
   * value: "PatientOrganizations"
   * @const
   */
  patientOrganizations: "PatientOrganizations",

  /**
   * value: "PatientRaces"
   * @const
   */
  patientRaces: "PatientRaces",

  /**
   * value: "PatientEthnicities"
   * @const
   */
  patientEthnicities: "PatientEthnicities",

  /**
   * value: "EventAttribute"
   * @const
   */
  eventAttribute: "EventAttribute",

  /**
   * value: "Observation"
   * @const
   */
  observation: "Observation",
};
/**
 * @member {module:model/WorkflowsPersonalizationRuleSetInputs.InputModelEnum} inputModel
 */
WorkflowsPersonalizationRuleSetInputs.prototype.inputModel = undefined;

/**
 * @member {Object} value
 */
WorkflowsPersonalizationRuleSetInputs.prototype.value = undefined;

/**
 * @member {String} inputId
 */
WorkflowsPersonalizationRuleSetInputs.prototype.inputId = undefined;

/**
 * @member {String} comparisonOperator
 */
WorkflowsPersonalizationRuleSetInputs.prototype.comparisonOperator = undefined;

/**
 * @member {Object.<String, Object>} params
 */
WorkflowsPersonalizationRuleSetInputs.prototype.params = undefined;
