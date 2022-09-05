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
import { InsurancePoliciesInsurancePolicySubscriberAttributesAddressesAttributes } from "./InsurancePoliciesInsurancePolicySubscriberAttributesAddressesAttributes";

/**
 * The InsurancePoliciesidInsurancePolicySubscriberAttributes model module.
 * @module model/InsurancePoliciesidInsurancePolicySubscriberAttributes
 * @version v0.3
 */
export class InsurancePoliciesidInsurancePolicySubscriberAttributes {
  /**
   * Constructs a new <code>InsurancePoliciesidInsurancePolicySubscriberAttributes</code>.
   * @alias module:model/InsurancePoliciesidInsurancePolicySubscriberAttributes
   * @class
   */
  constructor() {}

  /**
   * Constructs a <code>InsurancePoliciesidInsurancePolicySubscriberAttributes</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/InsurancePoliciesidInsurancePolicySubscriberAttributes} obj Optional instance to populate.
   * @return {module:model/InsurancePoliciesidInsurancePolicySubscriberAttributes} The populated <code>InsurancePoliciesidInsurancePolicySubscriberAttributes</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new InsurancePoliciesidInsurancePolicySubscriberAttributes();
      if (data.hasOwnProperty("id")) obj.id = ApiClient.convertToType(data["id"], "String");
      if (data.hasOwnProperty("first_name"))
        obj.firstName = ApiClient.convertToType(data["first_name"], "String");
      if (data.hasOwnProperty("last_name"))
        obj.lastName = ApiClient.convertToType(data["last_name"], "String");
      if (data.hasOwnProperty("patient_relationship_to_subscriber_code"))
        obj.patientRelationshipToSubscriberCode = ApiClient.convertToType(
          data["patient_relationship_to_subscriber_code"],
          "String"
        );
      if (data.hasOwnProperty("patient_relationship_to_subscriber"))
        obj.patientRelationshipToSubscriber = ApiClient.convertToType(
          data["patient_relationship_to_subscriber"],
          "String"
        );
      if (data.hasOwnProperty("birth_date"))
        obj.birthDate = ApiClient.convertToType(data["birth_date"], "Date");
      if (data.hasOwnProperty("administrative_gender"))
        obj.administrativeGender = ApiClient.convertToType(data["administrative_gender"], "String");
      if (data.hasOwnProperty("addresses_attributes"))
        obj.addressesAttributes = ApiClient.convertToType(data["addresses_attributes"], [
          InsurancePoliciesInsurancePolicySubscriberAttributesAddressesAttributes,
        ]);
    }
    return obj;
  }
}

/**
 * Provide an insurance subscriber ID only when updating an existing address
 * @member {String} id
 */
InsurancePoliciesidInsurancePolicySubscriberAttributes.prototype.id = undefined;

/**
 * Insurance subscriber first name
 * @member {String} firstName
 */
InsurancePoliciesidInsurancePolicySubscriberAttributes.prototype.firstName = undefined;

/**
 * Insurance subscriber last name
 * @member {String} lastName
 */
InsurancePoliciesidInsurancePolicySubscriberAttributes.prototype.lastName = undefined;

/**
 * Allowed values for the <code>patientRelationshipToSubscriberCode</code> property.
 * @enum {String}
 * @readonly
 */
InsurancePoliciesidInsurancePolicySubscriberAttributes.PatientRelationshipToSubscriberCodeEnum = {
  /**
   * value: "Spouse"
   * @const
   */
  spouse: "Spouse",

  /**
   * value: "Grandparent"
   * @const
   */
  grandparent: "Grandparent",

  /**
   * value: "Grandchild"
   * @const
   */
  grandchild: "Grandchild",

  /**
   * value: "Niece or nephew"
   * @const
   */
  nieceOrNephew: "Niece or nephew",

  /**
   * value: "Foster child"
   * @const
   */
  fosterChild: "Foster child",

  /**
   * value: "Ward of the court"
   * @const
   */
  wardOfTheCourt: "Ward of the court",

  /**
   * value: "Stepchild"
   * @const
   */
  stepchild: "Stepchild",

  /**
   * value: "Self"
   * @const
   */
  self: "Self",

  /**
   * value: "Child"
   * @const
   */
  child: "Child",

  /**
   * value: "Employee"
   * @const
   */
  employee: "Employee",

  /**
   * value: "Unknown"
   * @const
   */
  unknown: "Unknown",

  /**
   * value: "Handicapped dependent"
   * @const
   */
  handicappedDependent: "Handicapped dependent",

  /**
   * value: "Sponsored dependent"
   * @const
   */
  sponsoredDependent: "Sponsored dependent",

  /**
   * value: "Dependent of minor dependent"
   * @const
   */
  dependentOfMinorDependent: "Dependent of minor dependent",

  /**
   * value: "Significant other"
   * @const
   */
  significantOther: "Significant other",

  /**
   * value: "Mother"
   * @const
   */
  mother: "Mother",

  /**
   * value: "Father"
   * @const
   */
  father: "Father",

  /**
   * value: "Emancipated minor"
   * @const
   */
  emancipatedMinor: "Emancipated minor",

  /**
   * value: "Organ Donor"
   * @const
   */
  organDonor: "Organ Donor",

  /**
   * value: "Cadaver Donor"
   * @const
   */
  cadaverDonor: "Cadaver Donor",

  /**
   * value: "Injured plaintiff"
   * @const
   */
  injuredPlaintiff: "Injured plaintiff",

  /**
   * value: "Natural Child, insured does not have financial responsibility"
   * @const
   */
  naturalChildInsuredDoesNotHaveFinancialResponsibility:
    "Natural Child, insured does not have financial responsibility",

  /**
   * value: "Life Partner"
   * @const
   */
  lifePartner: "Life Partner",

  /**
   * value: "Other Relationship"
   * @const
   */
  otherRelationship: "Other Relationship",
};
/**
 * Insurance subscriber relationship type to patient
 * @member {module:model/InsurancePoliciesidInsurancePolicySubscriberAttributes.PatientRelationshipToSubscriberCodeEnum} patientRelationshipToSubscriberCode
 */
InsurancePoliciesidInsurancePolicySubscriberAttributes.prototype.patientRelationshipToSubscriberCode =
  undefined;

/**
 * Allowed values for the <code>patientRelationshipToSubscriber</code> property.
 * @enum {String}
 * @readonly
 */
InsurancePoliciesidInsurancePolicySubscriberAttributes.PatientRelationshipToSubscriberEnum = {
  /**
   * value: "Spouse"
   * @const
   */
  spouse: "Spouse",

  /**
   * value: "Grandparent"
   * @const
   */
  grandparent: "Grandparent",

  /**
   * value: "Grandchild"
   * @const
   */
  grandchild: "Grandchild",

  /**
   * value: "Niece or nephew"
   * @const
   */
  nieceOrNephew: "Niece or nephew",

  /**
   * value: "Foster child"
   * @const
   */
  fosterChild: "Foster child",

  /**
   * value: "Ward of the court"
   * @const
   */
  wardOfTheCourt: "Ward of the court",

  /**
   * value: "Stepchild"
   * @const
   */
  stepchild: "Stepchild",

  /**
   * value: "Self"
   * @const
   */
  self: "Self",

  /**
   * value: "Child"
   * @const
   */
  child: "Child",

  /**
   * value: "Employee"
   * @const
   */
  employee: "Employee",

  /**
   * value: "Unknown"
   * @const
   */
  unknown: "Unknown",

  /**
   * value: "Handicapped dependent"
   * @const
   */
  handicappedDependent: "Handicapped dependent",

  /**
   * value: "Sponsored dependent"
   * @const
   */
  sponsoredDependent: "Sponsored dependent",

  /**
   * value: "Dependent of minor dependent"
   * @const
   */
  dependentOfMinorDependent: "Dependent of minor dependent",

  /**
   * value: "Significant other"
   * @const
   */
  significantOther: "Significant other",

  /**
   * value: "Mother"
   * @const
   */
  mother: "Mother",

  /**
   * value: "Father"
   * @const
   */
  father: "Father",

  /**
   * value: "Emancipated minor"
   * @const
   */
  emancipatedMinor: "Emancipated minor",

  /**
   * value: "Organ Donor"
   * @const
   */
  organDonor: "Organ Donor",

  /**
   * value: "Cadaver Donor"
   * @const
   */
  cadaverDonor: "Cadaver Donor",

  /**
   * value: "Injured plaintiff"
   * @const
   */
  injuredPlaintiff: "Injured plaintiff",

  /**
   * value: "Natural Child, insured does not have financial responsibility"
   * @const
   */
  naturalChildInsuredDoesNotHaveFinancialResponsibility:
    "Natural Child, insured does not have financial responsibility",

  /**
   * value: "Life Partner"
   * @const
   */
  lifePartner: "Life Partner",

  /**
   * value: "Other Relationship"
   * @const
   */
  otherRelationship: "Other Relationship",
};
/**
 * Insurance subscriber relationship type to patient
 * @member {module:model/InsurancePoliciesidInsurancePolicySubscriberAttributes.PatientRelationshipToSubscriberEnum} patientRelationshipToSubscriber
 */
InsurancePoliciesidInsurancePolicySubscriberAttributes.prototype.patientRelationshipToSubscriber =
  undefined;

/**
 * yyyy-mm-dd (ISO 8601)
 * @member {Date} birthDate
 */
InsurancePoliciesidInsurancePolicySubscriberAttributes.prototype.birthDate = undefined;

/**
 * Allowed values for the <code>administrativeGender</code> property.
 * @enum {String}
 * @readonly
 */
InsurancePoliciesidInsurancePolicySubscriberAttributes.AdministrativeGenderEnum = {
  /**
   * value: "unknown"
   * @const
   */
  unknown: "unknown",

  /**
   * value: "male"
   * @const
   */
  male: "male",

  /**
   * value: "female"
   * @const
   */
  female: "female",

  /**
   * value: "not_applicable"
   * @const
   */
  notApplicable: "not_applicable",
};
/**
 * The gender the insurance subscriber identifies with.
 * @member {module:model/InsurancePoliciesidInsurancePolicySubscriberAttributes.AdministrativeGenderEnum} administrativeGender
 */
InsurancePoliciesidInsurancePolicySubscriberAttributes.prototype.administrativeGender = undefined;

/**
 * Address of insurance subscriber
 * @member {Array.<module:model/InsurancePoliciesInsurancePolicySubscriberAttributesAddressesAttributes>} addressesAttributes
 */
InsurancePoliciesidInsurancePolicySubscriberAttributes.prototype.addressesAttributes = undefined;
