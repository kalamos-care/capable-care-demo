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
import { InsurancePoliciesInsurancePolicy } from "./InsurancePoliciesInsurancePolicy";

/**
 * The InsurancePoliciesBody model module.
 * @module model/InsurancePoliciesBody
 * @version v0.3
 */
export class InsurancePoliciesBody {
  /**
   * Constructs a new <code>InsurancePoliciesBody</code>.
   * @alias module:model/InsurancePoliciesBody
   * @class
   */
  constructor() {}

  /**
   * Constructs a <code>InsurancePoliciesBody</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/InsurancePoliciesBody} obj Optional instance to populate.
   * @return {module:model/InsurancePoliciesBody} The populated <code>InsurancePoliciesBody</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new InsurancePoliciesBody();
      if (data.hasOwnProperty("insurance_policy"))
        obj.insurancePolicy = InsurancePoliciesInsurancePolicy.constructFromObject(
          data["insurance_policy"]
        );
    }
    return obj;
  }
}

/**
 * @member {module:model/InsurancePoliciesInsurancePolicy} insurancePolicy
 */
InsurancePoliciesBody.prototype.insurancePolicy = undefined;