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
import { WorkflowscareSuggestionsWorkflow } from "./WorkflowscareSuggestionsWorkflow";

/**
 * The WorkflowsRunBody model module.
 * @module model/WorkflowsRunBody
 * @version v0.3
 */
export class WorkflowsRunBody {
  /**
   * Constructs a new <code>WorkflowsRunBody</code>.
   * @alias module:model/WorkflowsRunBody
   * @class
   */
  constructor() {}

  /**
   * Constructs a <code>WorkflowsRunBody</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/WorkflowsRunBody} obj Optional instance to populate.
   * @return {module:model/WorkflowsRunBody} The populated <code>WorkflowsRunBody</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new WorkflowsRunBody();
      if (data.hasOwnProperty("workflow"))
        obj.workflow = WorkflowscareSuggestionsWorkflow.constructFromObject(data["workflow"]);
    }
    return obj;
  }
}

/**
 * @member {module:model/WorkflowscareSuggestionsWorkflow} workflow
 */
WorkflowsRunBody.prototype.workflow = undefined;
