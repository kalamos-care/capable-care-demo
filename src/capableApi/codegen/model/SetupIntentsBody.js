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
import { SetupIntentsSetupIntent } from "./SetupIntentsSetupIntent";

/**
 * The SetupIntentsBody model module.
 * @module model/SetupIntentsBody
 * @version v0.3
 */
export class SetupIntentsBody {
  /**
   * Constructs a new <code>SetupIntentsBody</code>.
   * @alias module:model/SetupIntentsBody
   * @class
   */
  constructor() {}

  /**
   * Constructs a <code>SetupIntentsBody</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/SetupIntentsBody} obj Optional instance to populate.
   * @return {module:model/SetupIntentsBody} The populated <code>SetupIntentsBody</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new SetupIntentsBody();
      if (data.hasOwnProperty("setup_intent"))
        obj.setupIntent = SetupIntentsSetupIntent.constructFromObject(data["setup_intent"]);
    }
    return obj;
  }
}

/**
 * @member {module:model/SetupIntentsSetupIntent} setupIntent
 */
SetupIntentsBody.prototype.setupIntent = undefined;