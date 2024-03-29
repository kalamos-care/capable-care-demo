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
import { InsuranceClaimsInsuranceClaimAddressAttributes } from "./InsuranceClaimsInsuranceClaimAddressAttributes";

/**
 * The PractitionersinvitePractitionerRenderingNpiAttributes model module.
 * @module model/PractitionersinvitePractitionerRenderingNpiAttributes
 * @version v0.3
 */
export class PractitionersinvitePractitionerRenderingNpiAttributes {
  /**
   * Constructs a new <code>PractitionersinvitePractitionerRenderingNpiAttributes</code>.
   * @alias module:model/PractitionersinvitePractitionerRenderingNpiAttributes
   * @class
   */
  constructor() {}

  /**
   * Constructs a <code>PractitionersinvitePractitionerRenderingNpiAttributes</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PractitionersinvitePractitionerRenderingNpiAttributes} obj Optional instance to populate.
   * @return {module:model/PractitionersinvitePractitionerRenderingNpiAttributes} The populated <code>PractitionersinvitePractitionerRenderingNpiAttributes</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new PractitionersinvitePractitionerRenderingNpiAttributes();
      if (data.hasOwnProperty("number"))
        obj._number = ApiClient.convertToType(data["number"], "String");
      if (data.hasOwnProperty("addresses_attributes"))
        obj.addressesAttributes = ApiClient.convertToType(data["addresses_attributes"], [
          InsuranceClaimsInsuranceClaimAddressAttributes,
        ]);
    }
    return obj;
  }
}

/**
 * The practitioner's NPI used to bill for services rendered by this practitioner
 * @member {String} _number
 */
PractitionersinvitePractitionerRenderingNpiAttributes.prototype._number = undefined;

/**
 * @member {Array.<module:model/InsuranceClaimsInsuranceClaimAddressAttributes>} addressesAttributes
 */
PractitionersinvitePractitionerRenderingNpiAttributes.prototype.addressesAttributes = undefined;
