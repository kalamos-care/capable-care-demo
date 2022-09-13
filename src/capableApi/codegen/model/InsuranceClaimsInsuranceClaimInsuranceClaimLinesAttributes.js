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
import { InsuranceClaimsInsuranceClaimInsuranceClaimLineDiagnosesAttributes } from "./InsuranceClaimsInsuranceClaimInsuranceClaimLineDiagnosesAttributes";

/**
 * The InsuranceClaimsInsuranceClaimInsuranceClaimLinesAttributes model module.
 * @module model/InsuranceClaimsInsuranceClaimInsuranceClaimLinesAttributes
 * @version v0.3
 */
export class InsuranceClaimsInsuranceClaimInsuranceClaimLinesAttributes {
  /**
   * Constructs a new <code>InsuranceClaimsInsuranceClaimInsuranceClaimLinesAttributes</code>.
   * @alias module:model/InsuranceClaimsInsuranceClaimInsuranceClaimLinesAttributes
   * @class
   */
  constructor() {}

  /**
   * Constructs a <code>InsuranceClaimsInsuranceClaimInsuranceClaimLinesAttributes</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/InsuranceClaimsInsuranceClaimInsuranceClaimLinesAttributes} obj Optional instance to populate.
   * @return {module:model/InsuranceClaimsInsuranceClaimInsuranceClaimLinesAttributes} The populated <code>InsuranceClaimsInsuranceClaimInsuranceClaimLinesAttributes</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new InsuranceClaimsInsuranceClaimInsuranceClaimLinesAttributes();
      if (data.hasOwnProperty("id")) obj.id = ApiClient.convertToType(data["id"], "String");
      if (data.hasOwnProperty("cpt_code_id"))
        obj.cptCodeId = ApiClient.convertToType(data["cpt_code_id"], "String");
      if (data.hasOwnProperty("cpt_code"))
        obj.cptCode = ApiClient.convertToType(data["cpt_code"], "String");
      if (data.hasOwnProperty("quantity"))
        obj.quantity = ApiClient.convertToType(data["quantity"], "Number");
      if (data.hasOwnProperty("charge_amount"))
        obj.chargeAmount = ApiClient.convertToType(data["charge_amount"], "Number");
      if (data.hasOwnProperty("units"))
        obj.units = ApiClient.convertToType(data["units"], "String");
      if (data.hasOwnProperty("insurance_claim_line_diagnoses_attributes"))
        obj.insuranceClaimLineDiagnosesAttributes = ApiClient.convertToType(
          data["insurance_claim_line_diagnoses_attributes"],
          [InsuranceClaimsInsuranceClaimInsuranceClaimLineDiagnosesAttributes]
        );
      if (data.hasOwnProperty("modifiers"))
        obj.modifiers = ApiClient.convertToType(data["modifiers"], ["String"]);
    }
    return obj;
  }
}

/**
 * Provide an claim service id ID only when updating an existing claim service line
 * @member {String} id
 */
InsuranceClaimsInsuranceClaimInsuranceClaimLinesAttributes.prototype.id = undefined;

/**
 * @member {String} cptCodeId
 */
InsuranceClaimsInsuranceClaimInsuranceClaimLinesAttributes.prototype.cptCodeId = undefined;

/**
 * @member {String} cptCode
 */
InsuranceClaimsInsuranceClaimInsuranceClaimLinesAttributes.prototype.cptCode = undefined;

/**
 * @member {Number} quantity
 */
InsuranceClaimsInsuranceClaimInsuranceClaimLinesAttributes.prototype.quantity = undefined;

/**
 * @member {Number} chargeAmount
 */
InsuranceClaimsInsuranceClaimInsuranceClaimLinesAttributes.prototype.chargeAmount = undefined;

/**
 * Allowed values for the <code>units</code> property.
 * @enum {String}
 * @readonly
 */
InsuranceClaimsInsuranceClaimInsuranceClaimLinesAttributes.UnitsEnum = {
  /**
   * value: "Minutes"
   * @const
   */
  minutes: "Minutes",

  /**
   * value: "Units"
   * @const
   */
  units: "Units",
};
/**
 * @member {module:model/InsuranceClaimsInsuranceClaimInsuranceClaimLinesAttributes.UnitsEnum} units
 */
InsuranceClaimsInsuranceClaimInsuranceClaimLinesAttributes.prototype.units = undefined;

/**
 * @member {Array.<module:model/InsuranceClaimsInsuranceClaimInsuranceClaimLineDiagnosesAttributes>} insuranceClaimLineDiagnosesAttributes
 */
InsuranceClaimsInsuranceClaimInsuranceClaimLinesAttributes.prototype.insuranceClaimLineDiagnosesAttributes =
  undefined;

/**
 * Allowed values for the <code>modifiers</code> property.
 * @enum {String}
 * @readonly
 */
InsuranceClaimsInsuranceClaimInsuranceClaimLinesAttributes.ModifiersEnum = {
  /**
   * value: "22"
   * @const
   */
  _22: "22",

  /**
   * value: "23"
   * @const
   */
  _23: "23",

  /**
   * value: "24"
   * @const
   */
  _24: "24",

  /**
   * value: "25"
   * @const
   */
  _25: "25",

  /**
   * value: "26"
   * @const
   */
  _26: "26",

  /**
   * value: "27"
   * @const
   */
  _27: "27",

  /**
   * value: "32"
   * @const
   */
  _32: "32",

  /**
   * value: "33"
   * @const
   */
  _33: "33",

  /**
   * value: "47"
   * @const
   */
  _47: "47",

  /**
   * value: "50"
   * @const
   */
  _50: "50",

  /**
   * value: "51"
   * @const
   */
  _51: "51",

  /**
   * value: "52"
   * @const
   */
  _52: "52",

  /**
   * value: "53"
   * @const
   */
  _53: "53",

  /**
   * value: "54"
   * @const
   */
  _54: "54",

  /**
   * value: "55"
   * @const
   */
  _55: "55",

  /**
   * value: "56"
   * @const
   */
  _56: "56",

  /**
   * value: "57"
   * @const
   */
  _57: "57",

  /**
   * value: "58"
   * @const
   */
  _58: "58",

  /**
   * value: "59"
   * @const
   */
  _59: "59",

  /**
   * value: "62"
   * @const
   */
  _62: "62",

  /**
   * value: "63"
   * @const
   */
  _63: "63",

  /**
   * value: "66"
   * @const
   */
  _66: "66",

  /**
   * value: "76"
   * @const
   */
  _76: "76",

  /**
   * value: "77"
   * @const
   */
  _77: "77",

  /**
   * value: "78"
   * @const
   */
  _78: "78",

  /**
   * value: "79"
   * @const
   */
  _79: "79",

  /**
   * value: "80"
   * @const
   */
  _80: "80",

  /**
   * value: "81"
   * @const
   */
  _81: "81",

  /**
   * value: "82"
   * @const
   */
  _82: "82",

  /**
   * value: "90"
   * @const
   */
  _90: "90",

  /**
   * value: "91"
   * @const
   */
  _91: "91",

  /**
   * value: "92"
   * @const
   */
  _92: "92",

  /**
   * value: "95"
   * @const
   */
  _95: "95",

  /**
   * value: "96"
   * @const
   */
  _96: "96",

  /**
   * value: "97"
   * @const
   */
  _97: "97",

  /**
   * value: "99"
   * @const
   */
  _99: "99",

  /**
   * value: "AF"
   * @const
   */
  AF: "AF",

  /**
   * value: "AG"
   * @const
   */
  AG: "AG",

  /**
   * value: "AK"
   * @const
   */
  AK: "AK",

  /**
   * value: "AQ"
   * @const
   */
  AQ: "AQ",

  /**
   * value: "AS"
   * @const
   */
  AS: "AS",

  /**
   * value: "CR"
   * @const
   */
  CR: "CR",

  /**
   * value: "CS"
   * @const
   */
  CS: "CS",

  /**
   * value: "EP"
   * @const
   */
  EP: "EP",

  /**
   * value: "ET"
   * @const
   */
  ET: "ET",

  /**
   * value: "FP"
   * @const
   */
  FP: "FP",

  /**
   * value: "G0"
   * @const
   */
  g0: "G0",

  /**
   * value: "GA"
   * @const
   */
  GA: "GA",

  /**
   * value: "GC"
   * @const
   */
  GC: "GC",

  /**
   * value: "GE"
   * @const
   */
  GE: "GE",

  /**
   * value: "GF"
   * @const
   */
  GF: "GF",

  /**
   * value: "GJ"
   * @const
   */
  GJ: "GJ",

  /**
   * value: "GN"
   * @const
   */
  GN: "GN",

  /**
   * value: "GR"
   * @const
   */
  GR: "GR",

  /**
   * value: "GT"
   * @const
   */
  GT: "GT",

  /**
   * value: "GV"
   * @const
   */
  GV: "GV",

  /**
   * value: "GW"
   * @const
   */
  GW: "GW",

  /**
   * value: "HA"
   * @const
   */
  HA: "HA",

  /**
   * value: "HB"
   * @const
   */
  HB: "HB",

  /**
   * value: "HC"
   * @const
   */
  HC: "HC",

  /**
   * value: "HD"
   * @const
   */
  HD: "HD",

  /**
   * value: "HG"
   * @const
   */
  HG: "HG",

  /**
   * value: "HU"
   * @const
   */
  HU: "HU",

  /**
   * value: "KX"
   * @const
   */
  KX: "KX",

  /**
   * value: "PD"
   * @const
   */
  PD: "PD",

  /**
   * value: "Q0"
   * @const
   */
  q0: "Q0",

  /**
   * value: "Q1"
   * @const
   */
  q1: "Q1",

  /**
   * value: "Q5"
   * @const
   */
  q5: "Q5",

  /**
   * value: "Q6"
   * @const
   */
  q6: "Q6",

  /**
   * value: "QJ"
   * @const
   */
  QJ: "QJ",

  /**
   * value: "QW"
   * @const
   */
  QW: "QW",

  /**
   * value: "TC"
   * @const
   */
  TC: "TC",

  /**
   * value: "TH"
   * @const
   */
  TH: "TH",

  /**
   * value: "UA"
   * @const
   */
  UA: "UA",

  /**
   * value: "UB"
   * @const
   */
  UB: "UB",
};
/**
 * @member {Array.<module:model/InsuranceClaimsInsuranceClaimInsuranceClaimLinesAttributes.ModifiersEnum>} modifiers
 */
InsuranceClaimsInsuranceClaimInsuranceClaimLinesAttributes.prototype.modifiers = undefined;
