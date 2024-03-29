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
 * The IntegrationsformsortFormsortIntegration model module.
 * @module model/IntegrationsformsortFormsortIntegration
 * @version v0.3
 */
export class IntegrationsformsortFormsortIntegration {
  /**
   * Constructs a new <code>IntegrationsformsortFormsortIntegration</code>.
   * @alias module:model/IntegrationsformsortFormsortIntegration
   * @class
   * @param signingKey {String}
   */
  constructor(signingKey) {
    this.signingKey = signingKey;
  }

  /**
   * Constructs a <code>IntegrationsformsortFormsortIntegration</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/IntegrationsformsortFormsortIntegration} obj Optional instance to populate.
   * @return {module:model/IntegrationsformsortFormsortIntegration} The populated <code>IntegrationsformsortFormsortIntegration</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new IntegrationsformsortFormsortIntegration();
      if (data.hasOwnProperty("signing_key"))
        obj.signingKey = ApiClient.convertToType(data["signing_key"], "String");
      if (data.hasOwnProperty("enabled"))
        obj.enabled = ApiClient.convertToType(data["enabled"], "Boolean");
    }
    return obj;
  }
}

/**
 * @member {String} signingKey
 */
IntegrationsformsortFormsortIntegration.prototype.signingKey = undefined;

/**
 * @member {Boolean} enabled
 * @default true
 */
IntegrationsformsortFormsortIntegration.prototype.enabled = true;
