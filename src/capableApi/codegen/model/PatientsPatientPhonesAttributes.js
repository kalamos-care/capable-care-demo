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
 * The PatientsPatientPhonesAttributes model module.
 * @module model/PatientsPatientPhonesAttributes
 * @version v0.3
 */
export class PatientsPatientPhonesAttributes {
  /**
   * Constructs a new <code>PatientsPatientPhonesAttributes</code>.
   * @alias module:model/PatientsPatientPhonesAttributes
   * @class
   * @param _number {String} E.164 format (e.g., +15551234567)
   */
  constructor(_number) {
    this._number = _number;
  }

  /**
   * Constructs a <code>PatientsPatientPhonesAttributes</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PatientsPatientPhonesAttributes} obj Optional instance to populate.
   * @return {module:model/PatientsPatientPhonesAttributes} The populated <code>PatientsPatientPhonesAttributes</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new PatientsPatientPhonesAttributes();
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
 * E.164 format (e.g., +15551234567)
 * @member {String} _number
 */
PatientsPatientPhonesAttributes.prototype._number = undefined;

/**
 * Indicates whether the phone is active
 * @member {Boolean} active
 */
PatientsPatientPhonesAttributes.prototype.active = undefined;

/**
 * Primary phone number for sending SMS communications. Only one allowed per patient.Must be an active number
 * @member {Boolean} primary
 */
PatientsPatientPhonesAttributes.prototype.primary = undefined;

/**
 * A label for the phone number, such as \"mobile\", \"home\", \"work\", etc.
 * @member {String} label
 */
PatientsPatientPhonesAttributes.prototype.label = undefined;