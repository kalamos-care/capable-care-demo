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
 * The LeadsidLead model module.
 * @module model/LeadsidLead
 * @version v0.3
 */
export class LeadsidLead {
  /**
   * Constructs a new <code>LeadsidLead</code>.
   * @alias module:model/LeadsidLead
   * @class
   */
  constructor() {}

  /**
   * Constructs a <code>LeadsidLead</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/LeadsidLead} obj Optional instance to populate.
   * @return {module:model/LeadsidLead} The populated <code>LeadsidLead</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new LeadsidLead();
      if (data.hasOwnProperty("metadata"))
        obj.metadata = ApiClient.convertToType(data["metadata"], {
          String: Object,
        });
    }
    return obj;
  }
}

/**
 * Any JSON-formatted data you want to associate with this object
 * @member {Object.<String, Object>} metadata
 */
LeadsidLead.prototype.metadata = undefined;
