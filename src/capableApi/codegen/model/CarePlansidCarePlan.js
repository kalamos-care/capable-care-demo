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
 * The CarePlansidCarePlan model module.
 * @module model/CarePlansidCarePlan
 * @version v0.3
 */
export class CarePlansidCarePlan {
  /**
   * Constructs a new <code>CarePlansidCarePlan</code>.
   * @alias module:model/CarePlansidCarePlan
   * @class
   */
  constructor() {}

  /**
   * Constructs a <code>CarePlansidCarePlan</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CarePlansidCarePlan} obj Optional instance to populate.
   * @return {module:model/CarePlansidCarePlan} The populated <code>CarePlansidCarePlan</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CarePlansidCarePlan();
      if (data.hasOwnProperty("name")) obj.name = ApiClient.convertToType(data["name"], "String");
      if (data.hasOwnProperty("description"))
        obj.description = ApiClient.convertToType(data["description"], "String");
      if (data.hasOwnProperty("status"))
        obj.status = ApiClient.convertToType(data["status"], "String");
      if (data.hasOwnProperty("tag_list"))
        obj.tagList = ApiClient.convertToType(data["tag_list"], ["String"]);
      if (data.hasOwnProperty("cms_entry_id"))
        obj.cmsEntryId = ApiClient.convertToType(data["cms_entry_id"], "String");
    }
    return obj;
  }
}

/**
 * Name of the care plan
 * @member {String} name
 */
CarePlansidCarePlan.prototype.name = undefined;

/**
 * General description of the care plan
 * @member {String} description
 */
CarePlansidCarePlan.prototype.description = undefined;

/**
 * Allowed values for the <code>status</code> property.
 * @enum {String}
 * @readonly
 */
CarePlansidCarePlan.StatusEnum = {
  /**
   * value: "active"
   * @const
   */
  active: "active",

  /**
   * value: "completed"
   * @const
   */
  completed: "completed",

  /**
   * value: "revoked"
   * @const
   */
  revoked: "revoked",

  /**
   * value: "draft"
   * @const
   */
  draft: "draft",

  /**
   * value: "on_hold"
   * @const
   */
  onHold: "on_hold",

  /**
   * value: "entered_in_error"
   * @const
   */
  enteredInError: "entered_in_error",

  /**
   * value: "unknown"
   * @const
   */
  unknown: "unknown",
};
/**
 * Status of the care plan
 * @member {module:model/CarePlansidCarePlan.StatusEnum} status
 * @default 'active'
 */
CarePlansidCarePlan.prototype.status = "active";

/**
 * Add an array of strings to help manage your resources
 * @member {Array.<String>} tagList
 */
CarePlansidCarePlan.prototype.tagList = undefined;

/**
 * Add a link to your CMS content
 * @member {String} cmsEntryId
 */
CarePlansidCarePlan.prototype.cmsEntryId = undefined;
