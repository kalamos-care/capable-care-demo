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
 * The IntegrationsacuityAcuityIntegration1 model module.
 * @module model/IntegrationsacuityAcuityIntegration1
 * @version v0.3
 */
export class IntegrationsacuityAcuityIntegration1 {
  /**
   * Constructs a new <code>IntegrationsacuityAcuityIntegration1</code>.
   * @alias module:model/IntegrationsacuityAcuityIntegration1
   * @class
   */
  constructor() {}

  /**
   * Constructs a <code>IntegrationsacuityAcuityIntegration1</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/IntegrationsacuityAcuityIntegration1} obj Optional instance to populate.
   * @return {module:model/IntegrationsacuityAcuityIntegration1} The populated <code>IntegrationsacuityAcuityIntegration1</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new IntegrationsacuityAcuityIntegration1();
      if (data.hasOwnProperty("credentials_client_id"))
        obj.credentialsClientId = ApiClient.convertToType(data["credentials_client_id"], "String");
      if (data.hasOwnProperty("credentials_client_secret"))
        obj.credentialsClientSecret = ApiClient.convertToType(
          data["credentials_client_secret"],
          "String"
        );
      if (data.hasOwnProperty("enabled"))
        obj.enabled = ApiClient.convertToType(data["enabled"], "Boolean");
    }
    return obj;
  }
}

/**
 * @member {String} credentialsClientId
 */
IntegrationsacuityAcuityIntegration1.prototype.credentialsClientId = undefined;

/**
 * @member {String} credentialsClientSecret
 */
IntegrationsacuityAcuityIntegration1.prototype.credentialsClientSecret = undefined;

/**
 * @member {Boolean} enabled
 */
IntegrationsacuityAcuityIntegration1.prototype.enabled = undefined;