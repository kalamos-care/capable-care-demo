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
import { InsurancePoliciesInsurancePolicyPayerIdentificationAttributes } from "./InsurancePoliciesInsurancePolicyPayerIdentificationAttributes";
import { InsurancePoliciesInsurancePolicySubscriberAttributes } from "./InsurancePoliciesInsurancePolicySubscriberAttributes";

/**
 * The InsurancePoliciesInsurancePolicy model module.
 * @module model/InsurancePoliciesInsurancePolicy
 * @version v0.3
 */
export class InsurancePoliciesInsurancePolicy {
  /**
   * Constructs a new <code>InsurancePoliciesInsurancePolicy</code>.
   * @alias module:model/InsurancePoliciesInsurancePolicy
   * @class
   * @param patientId {String} ID of the Patient the patient belongs to
   * @param subscriberAttributes {module:model/InsurancePoliciesInsurancePolicySubscriberAttributes}
   * @param patientNumber {String} Sometimes referred to as ID, this is the number used byinsurance companies to identify the patient
   * @param payerIdentificationAttributes {module:model/InsurancePoliciesInsurancePolicyPayerIdentificationAttributes}
   */
  constructor(patientId, subscriberAttributes, patientNumber, payerIdentificationAttributes) {
    this.patientId = patientId;
    this.subscriberAttributes = subscriberAttributes;
    this.patientNumber = patientNumber;
    this.payerIdentificationAttributes = payerIdentificationAttributes;
  }

  /**
   * Constructs a <code>InsurancePoliciesInsurancePolicy</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/InsurancePoliciesInsurancePolicy} obj Optional instance to populate.
   * @return {module:model/InsurancePoliciesInsurancePolicy} The populated <code>InsurancePoliciesInsurancePolicy</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new InsurancePoliciesInsurancePolicy();
      if (data.hasOwnProperty("patient_id"))
        obj.patientId = ApiClient.convertToType(data["patient_id"], "String");
      if (data.hasOwnProperty("subscriber_attributes"))
        obj.subscriberAttributes =
          InsurancePoliciesInsurancePolicySubscriberAttributes.constructFromObject(
            data["subscriber_attributes"]
          );
      if (data.hasOwnProperty("patient_number"))
        obj.patientNumber = ApiClient.convertToType(data["patient_number"], "String");
      if (data.hasOwnProperty("group_number"))
        obj.groupNumber = ApiClient.convertToType(data["group_number"], "String");
      if (data.hasOwnProperty("rx_bin"))
        obj.rxBin = ApiClient.convertToType(data["rx_bin"], "String");
      if (data.hasOwnProperty("rx_pcn"))
        obj.rxPcn = ApiClient.convertToType(data["rx_pcn"], "String");
      if (data.hasOwnProperty("plan_name"))
        obj.planName = ApiClient.convertToType(data["plan_name"], "String");
      if (data.hasOwnProperty("plan_type"))
        obj.planType = ApiClient.convertToType(data["plan_type"], "String");
      if (data.hasOwnProperty("active"))
        obj.active = ApiClient.convertToType(data["active"], "Boolean");
      if (data.hasOwnProperty("enabled"))
        obj.enabled = ApiClient.convertToType(data["enabled"], "Boolean");
      if (data.hasOwnProperty("coordination_of_benefits"))
        obj.coordinationOfBenefits = ApiClient.convertToType(
          data["coordination_of_benefits"],
          "String"
        );
      if (data.hasOwnProperty("payer_identification_attributes"))
        obj.payerIdentificationAttributes =
          InsurancePoliciesInsurancePolicyPayerIdentificationAttributes.constructFromObject(
            data["payer_identification_attributes"]
          );
    }
    return obj;
  }
}

/**
 * ID of the Patient the patient belongs to
 * @member {String} patientId
 */
InsurancePoliciesInsurancePolicy.prototype.patientId = undefined;

/**
 * @member {module:model/InsurancePoliciesInsurancePolicySubscriberAttributes} subscriberAttributes
 */
InsurancePoliciesInsurancePolicy.prototype.subscriberAttributes = undefined;

/**
 * Sometimes referred to as ID, this is the number used byinsurance companies to identify the patient
 * @member {String} patientNumber
 */
InsurancePoliciesInsurancePolicy.prototype.patientNumber = undefined;

/**
 * An identifier used by insurance company to identify the employer or sponsor of a policy
 * @member {String} groupNumber
 */
InsurancePoliciesInsurancePolicy.prototype.groupNumber = undefined;

/**
 * six-digit number used by insurance companies to process electronic pharmacy clams
 * @member {String} rxBin
 */
InsurancePoliciesInsurancePolicy.prototype.rxBin = undefined;

/**
 * a secondary identifier used to route pharmacy claims
 * @member {String} rxPcn
 */
InsurancePoliciesInsurancePolicy.prototype.rxPcn = undefined;

/**
 * The name of the plan on the patient insurance card, sometimes referred to as plan type
 * @member {String} planName
 */
InsurancePoliciesInsurancePolicy.prototype.planName = undefined;

/**
 * Allowed values for the <code>planType</code> property.
 * @enum {String}
 * @readonly
 */
InsurancePoliciesInsurancePolicy.PlanTypeEnum = {
  /**
   * value: "Self-pay"
   * @const
   */
  selfPay: "Self-pay",

  /**
   * value: "Other Non-Federal Programs"
   * @const
   */
  otherNonFederalPrograms: "Other Non-Federal Programs",

  /**
   * value: "Preferred Provider Organization (PPO)"
   * @const
   */
  preferredProviderOrganizationPPO: "Preferred Provider Organization (PPO)",

  /**
   * value: "Point of Service (POS)"
   * @const
   */
  pointOfServicePOS: "Point of Service (POS)",

  /**
   * value: "Exclusive Provider Organization (EPO)"
   * @const
   */
  exclusiveProviderOrganizationEPO: "Exclusive Provider Organization (EPO)",

  /**
   * value: "Indemnity Insurance"
   * @const
   */
  indemnityInsurance: "Indemnity Insurance",

  /**
   * value: "Health Maintenance Organization (HMO) Medicare Risk"
   * @const
   */
  healthMaintenanceOrganizationHMOMedicareRisk:
    "Health Maintenance Organization (HMO) Medicare Risk",

  /**
   * value: "Dental Maintenance Organization"
   * @const
   */
  dentalMaintenanceOrganization: "Dental Maintenance Organization",

  /**
   * value: "Automobile Medical"
   * @const
   */
  automobileMedical: "Automobile Medical",

  /**
   * value: "Blue Cross/Blue Shield"
   * @const
   */
  blueCrossBlueShield: "Blue Cross/Blue Shield",

  /**
   * value: "CHAMPUS"
   * @const
   */
  CHAMPUS: "CHAMPUS",

  /**
   * value: "Commercial Insurance Co."
   * @const
   */
  commercialInsuranceCo_: "Commercial Insurance Co.",

  /**
   * value: "Disability"
   * @const
   */
  disability: "Disability",

  /**
   * value: "Federal Employees Program"
   * @const
   */
  federalEmployeesProgram: "Federal Employees Program",

  /**
   * value: "Health Maintenance Organization (HMO)"
   * @const
   */
  healthMaintenanceOrganizationHMO: "Health Maintenance Organization (HMO)",

  /**
   * value: "Liability Medical"
   * @const
   */
  liabilityMedical: "Liability Medical",

  /**
   * value: "Medicare Part A"
   * @const
   */
  medicarePartA: "Medicare Part A",

  /**
   * value: "Medicare Part B"
   * @const
   */
  medicarePartB: "Medicare Part B",

  /**
   * value: "Medicaid"
   * @const
   */
  medicaid: "Medicaid",

  /**
   * value: "Other Federal Program"
   * @const
   */
  otherFederalProgram: "Other Federal Program",

  /**
   * value: "Title V"
   * @const
   */
  titleV: "Title V",

  /**
   * value: "Veterans Affairs Plan"
   * @const
   */
  veteransAffairsPlan: "Veterans Affairs Plan",

  /**
   * value: "Workers Compensation Health Claim"
   * @const
   */
  workersCompensationHealthClaim: "Workers Compensation Health Claim",

  /**
   * value: "Mutually Defined"
   * @const
   */
  mutuallyDefined: "Mutually Defined",
};
/**
 * The id of the plan on the patient insurance card, sometimes referred
 * @member {module:model/InsurancePoliciesInsurancePolicy.PlanTypeEnum} planType
 */
InsurancePoliciesInsurancePolicy.prototype.planType = undefined;

/**
 * A flag representing if this is an active policy, defaults to true
 * @member {Boolean} active
 */
InsurancePoliciesInsurancePolicy.prototype.active = undefined;

/**
 * A flag representing if this is an enabled policy, defaults to true
 * @member {Boolean} enabled
 */
InsurancePoliciesInsurancePolicy.prototype.enabled = undefined;

/**
 * Allowed values for the <code>coordinationOfBenefits</code> property.
 * @enum {String}
 * @readonly
 */
InsurancePoliciesInsurancePolicy.CoordinationOfBenefitsEnum = {
  /**
   * value: "primary"
   * @const
   */
  primary: "primary",

  /**
   * value: "secondary"
   * @const
   */
  secondary: "secondary",
};
/**
 * the coordination of benefits flag. Only one of each is allowed across all active policies. Defaults to primary
 * @member {module:model/InsurancePoliciesInsurancePolicy.CoordinationOfBenefitsEnum} coordinationOfBenefits
 */
InsurancePoliciesInsurancePolicy.prototype.coordinationOfBenefits = undefined;

/**
 * @member {module:model/InsurancePoliciesInsurancePolicyPayerIdentificationAttributes} payerIdentificationAttributes
 */
InsurancePoliciesInsurancePolicy.prototype.payerIdentificationAttributes = undefined;