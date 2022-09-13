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
 * The InsuranceClaimsidInsuranceClaimInsuranceClaimLineDiagnosesAttributes model module.
 * @module model/InsuranceClaimsidInsuranceClaimInsuranceClaimLineDiagnosesAttributes
 * @version v0.3
 */
export class InsuranceClaimsidInsuranceClaimInsuranceClaimLineDiagnosesAttributes {
  /**
   * Constructs a new <code>InsuranceClaimsidInsuranceClaimInsuranceClaimLineDiagnosesAttributes</code>.
   * @alias module:model/InsuranceClaimsidInsuranceClaimInsuranceClaimLineDiagnosesAttributes
   * @class
   */
  constructor() {}

  /**
   * Constructs a <code>InsuranceClaimsidInsuranceClaimInsuranceClaimLineDiagnosesAttributes</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/InsuranceClaimsidInsuranceClaimInsuranceClaimLineDiagnosesAttributes} obj Optional instance to populate.
   * @return {module:model/InsuranceClaimsidInsuranceClaimInsuranceClaimLineDiagnosesAttributes} The populated <code>InsuranceClaimsidInsuranceClaimInsuranceClaimLineDiagnosesAttributes</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new InsuranceClaimsidInsuranceClaimInsuranceClaimLineDiagnosesAttributes();
      if (data.hasOwnProperty("id")) obj.id = ApiClient.convertToType(data["id"], "String");
      if (data.hasOwnProperty("position"))
        obj.position = ApiClient.convertToType(data["position"], "Number");
      if (data.hasOwnProperty("icd_code"))
        obj.icdCode = ApiClient.convertToType(data["icd_code"], "String");
      if (data.hasOwnProperty("icd_code_id"))
        obj.icdCodeId = ApiClient.convertToType(data["icd_code_id"], "String");
      if (data.hasOwnProperty("_destroy"))
        obj.destroy = ApiClient.convertToType(data["_destroy"], "Boolean");
    }
    return obj;
  }
}

/**
 * @member {String} id
 */
InsuranceClaimsidInsuranceClaimInsuranceClaimLineDiagnosesAttributes.prototype.id = undefined;

/**
 * @member {Number} position
 */
InsuranceClaimsidInsuranceClaimInsuranceClaimLineDiagnosesAttributes.prototype.position = undefined;

/**
 * @member {String} icdCode
 */
InsuranceClaimsidInsuranceClaimInsuranceClaimLineDiagnosesAttributes.prototype.icdCode = undefined;

/**
 * @member {String} icdCodeId
 */
InsuranceClaimsidInsuranceClaimInsuranceClaimLineDiagnosesAttributes.prototype.icdCodeId =
  undefined;

/**
 * Delete insurance claim line diagnosis
 * @member {Boolean} destroy
 */
InsuranceClaimsidInsuranceClaimInsuranceClaimLineDiagnosesAttributes.prototype.destroy = undefined;