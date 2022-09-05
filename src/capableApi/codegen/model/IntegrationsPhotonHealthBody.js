/*
 * Capable Health API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v0.3
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 3.0.35
 *
 * Do not edit the class manually.
 *
 */
import { ApiClient } from "../ApiClient";
import { IntegrationsphotonHealthPhotonHealthIntegration } from "./IntegrationsphotonHealthPhotonHealthIntegration";

/**
 * The IntegrationsPhotonHealthBody model module.
 * @module model/IntegrationsPhotonHealthBody
 * @version v0.3
 */
export class IntegrationsPhotonHealthBody {
  /**
   * Constructs a new <code>IntegrationsPhotonHealthBody</code>.
   * @alias module:model/IntegrationsPhotonHealthBody
   * @class
   */
  constructor() {}

  /**
   * Constructs a <code>IntegrationsPhotonHealthBody</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/IntegrationsPhotonHealthBody} obj Optional instance to populate.
   * @return {module:model/IntegrationsPhotonHealthBody} The populated <code>IntegrationsPhotonHealthBody</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new IntegrationsPhotonHealthBody();
      if (data.hasOwnProperty("photon_health_integration"))
        obj.photonHealthIntegration =
          IntegrationsphotonHealthPhotonHealthIntegration.constructFromObject(
            data["photon_health_integration"]
          );
    }
    return obj;
  }
}

/**
 * @member {module:model/IntegrationsphotonHealthPhotonHealthIntegration} photonHealthIntegration
 */
IntegrationsPhotonHealthBody.prototype.photonHealthIntegration = undefined;
