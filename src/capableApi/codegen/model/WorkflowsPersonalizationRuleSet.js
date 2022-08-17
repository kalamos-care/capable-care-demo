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
import { WorkflowsPersonalizationRuleSetNodes } from "./WorkflowsPersonalizationRuleSetNodes";
import { WorkflowsPersonalizationRuleSetRules } from "./WorkflowsPersonalizationRuleSetRules";

/**
 * The WorkflowsPersonalizationRuleSet model module.
 * @module model/WorkflowsPersonalizationRuleSet
 * @version v0.3
 */
export class WorkflowsPersonalizationRuleSet {
  /**
   * Constructs a new <code>WorkflowsPersonalizationRuleSet</code>.
   * @alias module:model/WorkflowsPersonalizationRuleSet
   * @class
   * @param name {String} Name of the workflow
   * @param description {String} Description of what the workflow does
   * @param active {Boolean} Indicates whether the workflow is active
   */
  constructor(name, description, active) {
    this.name = name;
    this.description = description;
    this.active = active;
  }

  /**
   * Constructs a <code>WorkflowsPersonalizationRuleSet</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/WorkflowsPersonalizationRuleSet} obj Optional instance to populate.
   * @return {module:model/WorkflowsPersonalizationRuleSet} The populated <code>WorkflowsPersonalizationRuleSet</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new WorkflowsPersonalizationRuleSet();
      if (data.hasOwnProperty("name")) obj.name = ApiClient.convertToType(data["name"], "String");
      if (data.hasOwnProperty("description"))
        obj.description = ApiClient.convertToType(data["description"], "String");
      if (data.hasOwnProperty("active"))
        obj.active = ApiClient.convertToType(data["active"], "Boolean");
      if (data.hasOwnProperty("rules"))
        obj.rules = ApiClient.convertToType(data["rules"], [WorkflowsPersonalizationRuleSetRules]);
      if (data.hasOwnProperty("nodes"))
        obj.nodes = ApiClient.convertToType(data["nodes"], [WorkflowsPersonalizationRuleSetNodes]);
    }
    return obj;
  }
}

/**
 * Name of the workflow
 * @member {String} name
 */
WorkflowsPersonalizationRuleSet.prototype.name = undefined;

/**
 * Description of what the workflow does
 * @member {String} description
 */
WorkflowsPersonalizationRuleSet.prototype.description = undefined;

/**
 * Indicates whether the workflow is active
 * @member {Boolean} active
 */
WorkflowsPersonalizationRuleSet.prototype.active = undefined;

/**
 * @member {Array.<module:model/WorkflowsPersonalizationRuleSetRules>} rules
 */
WorkflowsPersonalizationRuleSet.prototype.rules = undefined;

/**
 * @member {Array.<module:model/WorkflowsPersonalizationRuleSetNodes>} nodes
 */
WorkflowsPersonalizationRuleSet.prototype.nodes = undefined;