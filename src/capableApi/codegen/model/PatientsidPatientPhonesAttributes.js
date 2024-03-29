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
 * The PatientsidPatientPhonesAttributes model module.
 * @module model/PatientsidPatientPhonesAttributes
 * @version v0.3
 */
export class PatientsidPatientPhonesAttributes {
  /**
   * Constructs a new <code>PatientsidPatientPhonesAttributes</code>.
   * @alias module:model/PatientsidPatientPhonesAttributes
   * @class
   */
  constructor() {}

  /**
   * Constructs a <code>PatientsidPatientPhonesAttributes</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PatientsidPatientPhonesAttributes} obj Optional instance to populate.
   * @return {module:model/PatientsidPatientPhonesAttributes} The populated <code>PatientsidPatientPhonesAttributes</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new PatientsidPatientPhonesAttributes();
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
PatientsidPatientPhonesAttributes.prototype.id = undefined;

/**
 * E.164 format (e.g., +15551234567)
 * @member {String} _number
 */
PatientsidPatientPhonesAttributes.prototype._number = undefined;

/**
 * Indicates whether the phone is active
 * @member {Boolean} active
 */
PatientsidPatientPhonesAttributes.prototype.active = undefined;

/**
 * Primary phone number for sending SMS communications. Only one allowed per patient. Must be an active number.
 * @member {Boolean} primary
 */
PatientsidPatientPhonesAttributes.prototype.primary = undefined;

/**
 * A label for the phone number, such as \"mobile\", \"home\", \"work\", etc.
 * @member {String} label
 */
PatientsidPatientPhonesAttributes.prototype.label = undefined;
