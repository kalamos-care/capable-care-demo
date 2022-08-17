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
import { PatientsinvitePatient } from "./PatientsinvitePatient";

/**
 * The PatientsInviteBody model module.
 * @module model/PatientsInviteBody
 * @version v0.3
 */
export class PatientsInviteBody {
  /**
   * Constructs a new <code>PatientsInviteBody</code>.
   * @alias module:model/PatientsInviteBody
   * @class
   */
  constructor() {}

  /**
   * Constructs a <code>PatientsInviteBody</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PatientsInviteBody} obj Optional instance to populate.
   * @return {module:model/PatientsInviteBody} The populated <code>PatientsInviteBody</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new PatientsInviteBody();
      if (data.hasOwnProperty("patient"))
        obj.patient = PatientsinvitePatient.constructFromObject(data["patient"]);
    }
    return obj;
  }
}

/**
 * @member {module:model/PatientsinvitePatient} patient
 */
PatientsInviteBody.prototype.patient = undefined;