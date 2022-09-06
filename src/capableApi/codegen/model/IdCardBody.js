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
import { InsurancePoliciesidcardInsurancePolicy } from "./InsurancePoliciesidcardInsurancePolicy";

/**
 * The IdCardBody model module.
 * @module model/IdCardBody
 * @version v0.3
 */
export class IdCardBody {
  /**
   * Constructs a new <code>IdCardBody</code>.
   * @alias module:model/IdCardBody
   * @class
   */
  constructor() {}

  /**
   * Constructs a <code>IdCardBody</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/IdCardBody} obj Optional instance to populate.
   * @return {module:model/IdCardBody} The populated <code>IdCardBody</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new IdCardBody();
      if (data.hasOwnProperty("insurance_policy"))
        obj.insurancePolicy = InsurancePoliciesidcardInsurancePolicy.constructFromObject(
          data["insurance_policy"]
        );
    }
    return obj;
  }
}

/**
 * @member {module:model/InsurancePoliciesidcardInsurancePolicy} insurancePolicy
 */
IdCardBody.prototype.insurancePolicy = undefined;