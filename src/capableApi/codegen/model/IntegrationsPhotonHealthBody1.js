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
import { IntegrationsphotonHealthPhotonHealthIntegration1 } from "./IntegrationsphotonHealthPhotonHealthIntegration1";

/**
 * The IntegrationsPhotonHealthBody1 model module.
 * @module model/IntegrationsPhotonHealthBody1
 * @version v0.3
 */
export class IntegrationsPhotonHealthBody1 {
  /**
   * Constructs a new <code>IntegrationsPhotonHealthBody1</code>.
   * @alias module:model/IntegrationsPhotonHealthBody1
   * @class
   */
  constructor() {}

  /**
   * Constructs a <code>IntegrationsPhotonHealthBody1</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/IntegrationsPhotonHealthBody1} obj Optional instance to populate.
   * @return {module:model/IntegrationsPhotonHealthBody1} The populated <code>IntegrationsPhotonHealthBody1</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new IntegrationsPhotonHealthBody1();
      if (data.hasOwnProperty("photon_health_integration"))
        obj.photonHealthIntegration =
          IntegrationsphotonHealthPhotonHealthIntegration1.constructFromObject(
            data["photon_health_integration"]
          );
    }
    return obj;
  }
}

/**
 * @member {module:model/IntegrationsphotonHealthPhotonHealthIntegration1} photonHealthIntegration
 */
IntegrationsPhotonHealthBody1.prototype.photonHealthIntegration = undefined;
