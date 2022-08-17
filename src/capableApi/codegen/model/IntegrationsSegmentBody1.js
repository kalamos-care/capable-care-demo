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
import { IntegrationsfreshpaintFreshpaintIntegration1 } from "./IntegrationsfreshpaintFreshpaintIntegration1";

/**
 * The IntegrationsSegmentBody1 model module.
 * @module model/IntegrationsSegmentBody1
 * @version v0.3
 */
export class IntegrationsSegmentBody1 {
  /**
   * Constructs a new <code>IntegrationsSegmentBody1</code>.
   * @alias module:model/IntegrationsSegmentBody1
   * @class
   */
  constructor() {}

  /**
   * Constructs a <code>IntegrationsSegmentBody1</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/IntegrationsSegmentBody1} obj Optional instance to populate.
   * @return {module:model/IntegrationsSegmentBody1} The populated <code>IntegrationsSegmentBody1</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new IntegrationsSegmentBody1();
      if (data.hasOwnProperty("segment_integration"))
        obj.segmentIntegration = IntegrationsfreshpaintFreshpaintIntegration1.constructFromObject(
          data["segment_integration"]
        );
    }
    return obj;
  }
}

/**
 * @member {module:model/IntegrationsfreshpaintFreshpaintIntegration1} segmentIntegration
 */
IntegrationsSegmentBody1.prototype.segmentIntegration = undefined;