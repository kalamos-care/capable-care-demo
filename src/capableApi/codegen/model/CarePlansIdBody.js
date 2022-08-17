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
import { CarePlansidCarePlan } from "./CarePlansidCarePlan";

/**
 * The CarePlansIdBody model module.
 * @module model/CarePlansIdBody
 * @version v0.3
 */
export class CarePlansIdBody {
  /**
   * Constructs a new <code>CarePlansIdBody</code>.
   * @alias module:model/CarePlansIdBody
   * @class
   */
  constructor() {}

  /**
   * Constructs a <code>CarePlansIdBody</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CarePlansIdBody} obj Optional instance to populate.
   * @return {module:model/CarePlansIdBody} The populated <code>CarePlansIdBody</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new CarePlansIdBody();
      if (data.hasOwnProperty("care_plan"))
        obj.carePlan = CarePlansidCarePlan.constructFromObject(data["care_plan"]);
    }
    return obj;
  }
}

/**
 * @member {module:model/CarePlansidCarePlan} carePlan
 */
CarePlansIdBody.prototype.carePlan = undefined;