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
 * The PatientRelatedPersonsPatientRelatedPerson model module.
 * @module model/PatientRelatedPersonsPatientRelatedPerson
 * @version v0.3
 */
export class PatientRelatedPersonsPatientRelatedPerson {
  /**
   * Constructs a new <code>PatientRelatedPersonsPatientRelatedPerson</code>.
   * @alias module:model/PatientRelatedPersonsPatientRelatedPerson
   * @class
   * @param relationshipType {module:model/PatientRelatedPersonsPatientRelatedPerson.RelationshipTypeEnum} The nature of the relationship between the Patient and the related person. Currently, only a Practitoner can be related to a Patient through this endpoint.
   * @param patientId {String} The ID of the Patient in the relationship
   * @param relatedPersonId {String} The ID of the person to whom the Patient is related (currently limited to Practitioners only)
   */
  constructor(relationshipType, patientId, relatedPersonId) {
    this.relationshipType = relationshipType;
    this.patientId = patientId;
    this.relatedPersonId = relatedPersonId;
  }

  /**
   * Constructs a <code>PatientRelatedPersonsPatientRelatedPerson</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PatientRelatedPersonsPatientRelatedPerson} obj Optional instance to populate.
   * @return {module:model/PatientRelatedPersonsPatientRelatedPerson} The populated <code>PatientRelatedPersonsPatientRelatedPerson</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new PatientRelatedPersonsPatientRelatedPerson();
      if (data.hasOwnProperty("relationship_type"))
        obj.relationshipType = ApiClient.convertToType(data["relationship_type"], "String");
      if (data.hasOwnProperty("patient_id"))
        obj.patientId = ApiClient.convertToType(data["patient_id"], "String");
      if (data.hasOwnProperty("related_person_id"))
        obj.relatedPersonId = ApiClient.convertToType(data["related_person_id"], "String");
    }
    return obj;
  }
}

/**
 * Allowed values for the <code>relationshipType</code> property.
 * @enum {String}
 * @readonly
 */
PatientRelatedPersonsPatientRelatedPerson.RelationshipTypeEnum = {
  /**
   * value: "Practitioner"
   * @const
   */
  practitioner: "Practitioner",
};
/**
 * The nature of the relationship between the Patient and the related person. Currently, only a Practitoner can be related to a Patient through this endpoint.
 * @member {module:model/PatientRelatedPersonsPatientRelatedPerson.RelationshipTypeEnum} relationshipType
 */
PatientRelatedPersonsPatientRelatedPerson.prototype.relationshipType = undefined;

/**
 * The ID of the Patient in the relationship
 * @member {String} patientId
 */
PatientRelatedPersonsPatientRelatedPerson.prototype.patientId = undefined;

/**
 * The ID of the person to whom the Patient is related (currently limited to Practitioners only)
 * @member {String} relatedPersonId
 */
PatientRelatedPersonsPatientRelatedPerson.prototype.relatedPersonId = undefined;
