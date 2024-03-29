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
 * The OrdersOrderOrderLineItems model module.
 * @module model/OrdersOrderOrderLineItems
 * @version v0.3
 */
export class OrdersOrderOrderLineItems {
  /**
   * Constructs a new <code>OrdersOrderOrderLineItems</code>.
   * @alias module:model/OrdersOrderOrderLineItems
   * @class
   */
  constructor() {}

  /**
   * Constructs a <code>OrdersOrderOrderLineItems</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OrdersOrderOrderLineItems} obj Optional instance to populate.
   * @return {module:model/OrdersOrderOrderLineItems} The populated <code>OrdersOrderOrderLineItems</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new OrdersOrderOrderLineItems();
      if (data.hasOwnProperty("product_id"))
        obj.productId = ApiClient.convertToType(data["product_id"], "String");
      if (data.hasOwnProperty("quantity"))
        obj.quantity = ApiClient.convertToType(data["quantity"], "Number");
      if (data.hasOwnProperty("prescription_id"))
        obj.prescriptionId = ApiClient.convertToType(data["prescription_id"], "String");
    }
    return obj;
  }
}

/**
 * ID of the product being assigned to the order
 * @member {String} productId
 */
OrdersOrderOrderLineItems.prototype.productId = undefined;

/**
 * @member {Number} quantity
 */
OrdersOrderOrderLineItems.prototype.quantity = undefined;

/**
 * ID of the prescription being assigned to the order. The prescription must has refills left. Otherwise, for first time prescriptions use `product_id` and `quantity`
 * @member {String} prescriptionId
 */
OrdersOrderOrderLineItems.prototype.prescriptionId = undefined;
