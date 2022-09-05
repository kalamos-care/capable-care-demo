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
 * The PractitionersidPractitionerPhonesAttributes model module.
 * @module model/PractitionersidPractitionerPhonesAttributes
 * @version v0.3
 */
export class PractitionersidPractitionerPhonesAttributes {
  /**
   * Constructs a new <code>PractitionersidPractitionerPhonesAttributes</code>.
   * @alias module:model/PractitionersidPractitionerPhonesAttributes
   * @class
   */
  constructor() {}

  /**
   * Constructs a <code>PractitionersidPractitionerPhonesAttributes</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PractitionersidPractitionerPhonesAttributes} obj Optional instance to populate.
   * @return {module:model/PractitionersidPractitionerPhonesAttributes} The populated <code>PractitionersidPractitionerPhonesAttributes</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new PractitionersidPractitionerPhonesAttributes();
      if (data.hasOwnProperty("id")) obj.id = ApiClient.convertToType(data["id"], "String");
      if (data.hasOwnProperty("number"))
        obj._number = ApiClient.convertToType(data["number"], "String");
      if (data.hasOwnProperty("active"))
        obj.active = ApiClient.convertToType(data["active"], "Boolean");
      if (data.hasOwnProperty("primary"))
        obj.primary = ApiClient.convertToType(data["primary"], "Boolean");
      if (data.hasOwnProperty("label"))
        obj.label = ApiClient.convertToType(data["label"], "String");
    }
    return obj;
  }
}

/**
 * Provide a phone ID only when updating an existing number
 * @member {String} id
 */
PractitionersidPractitionerPhonesAttributes.prototype.id = undefined;

/**
 * E.164 format (e.g., +15551234567)
 * @member {String} _number
 */
PractitionersidPractitionerPhonesAttributes.prototype._number = undefined;

/**
 * Indicates whether the phone is active
 * @member {Boolean} active
 */
PractitionersidPractitionerPhonesAttributes.prototype.active = undefined;

/**
 * Primary phone number for sending SMS communications. Only one allowed per practitioner. Must be an active number.
 * @member {Boolean} primary
 */
PractitionersidPractitionerPhonesAttributes.prototype.primary = undefined;

/**
 * A label for the phone number, such as \"mobile\", \"home\", \"work\", etc.
 * @member {String} label
 */
PractitionersidPractitionerPhonesAttributes.prototype.label = undefined;
