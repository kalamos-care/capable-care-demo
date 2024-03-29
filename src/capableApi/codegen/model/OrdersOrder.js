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
import { OrdersOrderBillingAddress } from "./OrdersOrderBillingAddress";
import { OrdersOrderOrderLineItems } from "./OrdersOrderOrderLineItems";
import { OrdersOrderShippingAddress } from "./OrdersOrderShippingAddress";

/**
 * The OrdersOrder model module.
 * @module model/OrdersOrder
 * @version v0.3
 */
export class OrdersOrder {
  /**
   * Constructs a new <code>OrdersOrder</code>.
   * @alias module:model/OrdersOrder
   * @class
   * @param orderType {module:model/OrdersOrder.OrderTypeEnum}
   * @param patientId {String} ID of the patient being assigned the order
   * @param shippingAddress {module:model/OrdersOrderShippingAddress}
   * @param billingAddress {module:model/OrdersOrderBillingAddress}
   */
  constructor(orderType, patientId, shippingAddress, billingAddress) {
    this.orderType = orderType;
    this.patientId = patientId;
    this.shippingAddress = shippingAddress;
    this.billingAddress = billingAddress;
  }

  /**
   * Constructs a <code>OrdersOrder</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/OrdersOrder} obj Optional instance to populate.
   * @return {module:model/OrdersOrder} The populated <code>OrdersOrder</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new OrdersOrder();
      if (data.hasOwnProperty("carrier"))
        obj.carrier = ApiClient.convertToType(data["carrier"], "String");
      if (data.hasOwnProperty("order_type"))
        obj.orderType = ApiClient.convertToType(data["order_type"], "String");
      if (data.hasOwnProperty("patient_id"))
        obj.patientId = ApiClient.convertToType(data["patient_id"], "String");
      if (data.hasOwnProperty("requires_approval"))
        obj.requiresApproval = ApiClient.convertToType(data["requires_approval"], "Boolean");
      if (data.hasOwnProperty("order_line_items"))
        obj.orderLineItems = ApiClient.convertToType(data["order_line_items"], [
          OrdersOrderOrderLineItems,
        ]);
      if (data.hasOwnProperty("submission_id"))
        obj.submissionId = ApiClient.convertToType(data["submission_id"], "String");
      if (data.hasOwnProperty("promotion_code"))
        obj.promotionCode = ApiClient.convertToType(data["promotion_code"], "String");
      if (data.hasOwnProperty("shipping_address"))
        obj.shippingAddress = OrdersOrderShippingAddress.constructFromObject(
          data["shipping_address"]
        );
      if (data.hasOwnProperty("billing_address"))
        obj.billingAddress = OrdersOrderBillingAddress.constructFromObject(data["billing_address"]);
    }
    return obj;
  }
}

/**
 * Allowed values for the <code>carrier</code> property.
 * @enum {String}
 * @readonly
 */
OrdersOrder.CarrierEnum = {
  /**
   * value: "USPS"
   * @const
   */
  USPS: "USPS",

  /**
   * value: "UPS"
   * @const
   */
  UPS: "UPS",

  /**
   * value: "FedEx"
   * @const
   */
  fedEx: "FedEx",

  /**
   * value: "DHL"
   * @const
   */
  DHL: "DHL",
};
/**
 * @member {module:model/OrdersOrder.CarrierEnum} carrier
 * @default 'USPS'
 */
OrdersOrder.prototype.carrier = "USPS";

/**
 * Allowed values for the <code>orderType</code> property.
 * @enum {String}
 * @readonly
 */
OrdersOrder.OrderTypeEnum = {
  /**
   * value: "medication"
   * @const
   */
  medication: "medication",

  /**
   * value: "encounter"
   * @const
   */
  encounter: "encounter",
};
/**
 * @member {module:model/OrdersOrder.OrderTypeEnum} orderType
 * @default 'medication'
 */
OrdersOrder.prototype.orderType = "medication";

/**
 * ID of the patient being assigned the order
 * @member {String} patientId
 */
OrdersOrder.prototype.patientId = undefined;

/**
 * In the case where `order_type` is `\"medication\"` and the order contains any line items withproducts that have `provider_product_type` of either `\"medication\"` or `\"compound\"`,setting `requires_approval` to `true` will make it so that after MDI completes the case, theorder will not be placed with Curexa until the order is approved via a subsequent API call.Otherwise, if `requires_approval` is set to `false`, the order will be placed with Curexaimmediately after MDI completes the case. In the case were `order_type` is `\"medication\"` and the order only contains line itemswith products that have `provider_product_type` set to `\"otc_medication\"`, setting`requires_approval` to `true` will make it so that the order will not be placed with Curexauntil the order is approved via a subsequent API call. Otherwise, if `requires_approval` isset to `false`, the order will be placed with Curexa immediately. In the case where `order_type` is `\"encounter\"`, setting `requires_approval` to `true`will make it so that an MDI case is not created until the order is approved via a subsequentAPI call. Otherwise, if `requires_approval` is set to `false`, the MDI case will be createdimmediately.
 * @member {Boolean} requiresApproval
 * @default false
 */
OrdersOrder.prototype.requiresApproval = false;

/**
 * @member {Array.<module:model/OrdersOrderOrderLineItems>} orderLineItems
 */
OrdersOrder.prototype.orderLineItems = undefined;

/**
 * When you create a medication order with non-OTC medications, a case will be created to ask for appropriated prescriptions. If you want to link questionnaire responses from a patient to the medication case, pass a Capable Health submission ID. The responses will appear in the MDI clinician portal.
 * @member {String} submissionId
 */
OrdersOrder.prototype.submissionId = undefined;

/**
 * The Stripe promotion code to apply to this order
 * @member {String} promotionCode
 */
OrdersOrder.prototype.promotionCode = undefined;

/**
 * @member {module:model/OrdersOrderShippingAddress} shippingAddress
 */
OrdersOrder.prototype.shippingAddress = undefined;

/**
 * @member {module:model/OrdersOrderBillingAddress} billingAddress
 */
OrdersOrder.prototype.billingAddress = undefined;
