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
import { SubscriptionsidcancelSubscription } from "./SubscriptionsidcancelSubscription";

/**
 * The IdCancelBody model module.
 * @module model/IdCancelBody
 * @version v0.3
 */
export class IdCancelBody {
  /**
   * Constructs a new <code>IdCancelBody</code>.
   * @alias module:model/IdCancelBody
   * @class
   */
  constructor() {}

  /**
   * Constructs a <code>IdCancelBody</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/IdCancelBody} obj Optional instance to populate.
   * @return {module:model/IdCancelBody} The populated <code>IdCancelBody</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new IdCancelBody();
      if (data.hasOwnProperty("subscription"))
        obj.subscription = SubscriptionsidcancelSubscription.constructFromObject(
          data["subscription"]
        );
    }
    return obj;
  }
}

/**
 * @member {module:model/SubscriptionsidcancelSubscription} subscription
 */
IdCancelBody.prototype.subscription = undefined;
