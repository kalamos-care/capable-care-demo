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
 * The OrganizationsOrganization model module.
 * @module model/OrganizationsOrganization
 * @version v0.3
 */
export class OrganizationsOrganization {
  /**
   * Constructs a new <code>OrganizationsOrganization</code>.
   * @alias module:model/OrganizationsOrganization
   * @class
   * @param name {String}
   */
  constructor(name) {
    this.name = name;
  }

  /**
   * Constructs a <code>OrganizationsOrganization</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OrganizationsOrganization} obj Optional instance to populate.
   * @return {module:model/OrganizationsOrganization} The populated <code>OrganizationsOrganization</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new OrganizationsOrganization();
      if (data.hasOwnProperty("name")) obj.name = ApiClient.convertToType(data["name"], "String");
      if (data.hasOwnProperty("organization_type"))
        obj.organizationType = ApiClient.convertToType(data["organization_type"], "String");
      if (data.hasOwnProperty("cms_entry_id"))
        obj.cmsEntryId = ApiClient.convertToType(data["cms_entry_id"], "String");
    }
    return obj;
  }
}

/**
 * @member {String} name
 */
OrganizationsOrganization.prototype.name = undefined;

/**
 * Allowed values for the <code>organizationType</code> property.
 * @enum {String}
 * @readonly
 */
OrganizationsOrganization.OrganizationTypeEnum = {
  /**
   * value: "Healthcare Provider"
   * @const
   */
  healthcareProvider: "Healthcare Provider",

  /**
   * value: "Hospital Department"
   * @const
   */
  hospitalDepartment: "Hospital Department",

  /**
   * value: "Organizational team"
   * @const
   */
  organizationalTeam: "Organizational team",

  /**
   * value: "Government"
   * @const
   */
  government: "Government",

  /**
   * value: "Insurance Company"
   * @const
   */
  insuranceCompany: "Insurance Company",

  /**
   * value: "Payer"
   * @const
   */
  payer: "Payer",

  /**
   * value: "Educational Institute"
   * @const
   */
  educationalInstitute: "Educational Institute",

  /**
   * value: "Religious Institution"
   * @const
   */
  religiousInstitution: "Religious Institution",

  /**
   * value: "Clinical Research Sponsor"
   * @const
   */
  clinicalResearchSponsor: "Clinical Research Sponsor",

  /**
   * value: "Community Group"
   * @const
   */
  communityGroup: "Community Group",

  /**
   * value: "Non-Healthcare Business or Corporation"
   * @const
   */
  nonHealthcareBusinessOrCorporation: "Non-Healthcare Business or Corporation",

  /**
   * value: "Other"
   * @const
   */
  other: "Other",

  /**
   * value: "Employer"
   * @const
   */
  employer: "Employer",
};
/**
 * @member {module:model/OrganizationsOrganization.OrganizationTypeEnum} organizationType
 */
OrganizationsOrganization.prototype.organizationType = undefined;

/**
 * Add a link to your CMS content
 * @member {String} cmsEntryId
 */
OrganizationsOrganization.prototype.cmsEntryId = undefined;