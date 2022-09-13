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
 * The OrdersOrderShippingAddress model module.
 * @module model/OrdersOrderShippingAddress
 * @version v0.3
 */
export class OrdersOrderShippingAddress {
  /**
   * Constructs a new <code>OrdersOrderShippingAddress</code>.
   * Shipping address for the order
   * @alias module:model/OrdersOrderShippingAddress
   * @class
   */
  constructor() {}

  /**
   * Constructs a <code>OrdersOrderShippingAddress</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OrdersOrderShippingAddress} obj Optional instance to populate.
   * @return {module:model/OrdersOrderShippingAddress} The populated <code>OrdersOrderShippingAddress</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new OrdersOrderShippingAddress();
      if (data.hasOwnProperty("address_id"))
        obj.addressId = ApiClient.convertToType(data["address_id"], "String");
      if (data.hasOwnProperty("line1"))
        obj.line1 = ApiClient.convertToType(data["line1"], "String");
      if (data.hasOwnProperty("line2"))
        obj.line2 = ApiClient.convertToType(data["line2"], "String");
      if (data.hasOwnProperty("city")) obj.city = ApiClient.convertToType(data["city"], "String");
      if (data.hasOwnProperty("state"))
        obj.state = ApiClient.convertToType(data["state"], "String");
      if (data.hasOwnProperty("zip")) obj.zip = ApiClient.convertToType(data["zip"], "String");
      if (data.hasOwnProperty("country"))
        obj.country = ApiClient.convertToType(data["country"], "String");
    }
    return obj;
  }
}

/**
 * @member {String} addressId
 */
OrdersOrderShippingAddress.prototype.addressId = undefined;

/**
 * @member {String} line1
 */
OrdersOrderShippingAddress.prototype.line1 = undefined;

/**
 * @member {String} line2
 */
OrdersOrderShippingAddress.prototype.line2 = undefined;

/**
 * @member {String} city
 */
OrdersOrderShippingAddress.prototype.city = undefined;

/**
 * @member {String} state
 */
OrdersOrderShippingAddress.prototype.state = undefined;

/**
 * @member {String} zip
 */
OrdersOrderShippingAddress.prototype.zip = undefined;

/**
 * @member {String} country
 */
OrdersOrderShippingAddress.prototype.country = undefined;
