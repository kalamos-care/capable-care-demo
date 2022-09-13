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
 * The ProductsidProduct model module.
 * @module model/ProductsidProduct
 * @version v0.3
 */
export class ProductsidProduct {
  /**
   * Constructs a new <code>ProductsidProduct</code>.
   * @alias module:model/ProductsidProduct
   * @class
   */
  constructor() {}

  /**
   * Constructs a <code>ProductsidProduct</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ProductsidProduct} obj Optional instance to populate.
   * @return {module:model/ProductsidProduct} The populated <code>ProductsidProduct</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ProductsidProduct();
      if (data.hasOwnProperty("name")) obj.name = ApiClient.convertToType(data["name"], "String");
      if (data.hasOwnProperty("retail_price_cents"))
        obj.retailPriceCents = ApiClient.convertToType(data["retail_price_cents"], "Number");
      if (data.hasOwnProperty("external_id"))
        obj.externalId = ApiClient.convertToType(data["external_id"], "String");
      if (data.hasOwnProperty("metadata"))
        obj.metadata = ApiClient.convertToType(data["metadata"], {
          String: Object,
        });
      if (data.hasOwnProperty("cms_entry_id"))
        obj.cmsEntryId = ApiClient.convertToType(data["cms_entry_id"], "String");
      if (data.hasOwnProperty("tag_list"))
        obj.tagList = ApiClient.convertToType(data["tag_list"], ["String"]);
      if (data.hasOwnProperty("provider_name"))
        obj.providerName = ApiClient.convertToType(data["provider_name"], "String");
      if (data.hasOwnProperty("provider_product_id"))
        obj.providerProductId = ApiClient.convertToType(data["provider_product_id"], "String");
      if (data.hasOwnProperty("provider_product_type"))
        obj.providerProductType = ApiClient.convertToType(data["provider_product_type"], "String");
    }
    return obj;
  }
}

/**
 * Name of the product
 * @member {String} name
 */
ProductsidProduct.prototype.name = undefined;

/**
 * Retail price in cents
 * @member {Number} retailPriceCents
 */
ProductsidProduct.prototype.retailPriceCents = undefined;

/**
 * External Id to reference
 * @member {String} externalId
 */
ProductsidProduct.prototype.externalId = undefined;

/**
 * Any JSON-formatted data you want to associate with this object
 * @member {Object.<String, Object>} metadata
 */
ProductsidProduct.prototype.metadata = undefined;

/**
 * Add a link to your CMS content
 * @member {String} cmsEntryId
 */
ProductsidProduct.prototype.cmsEntryId = undefined;

/**
 * Add an array of strings to help manage your resources
 * @member {Array.<String>} tagList
 */
ProductsidProduct.prototype.tagList = undefined;

/**
 * Allowed values for the <code>providerName</code> property.
 * @enum {String}
 * @readonly
 */
ProductsidProduct.ProviderNameEnum = {
  /**
   * value: "mdi"
   * @const
   */
  mdi: "mdi",

  /**
   * value: "butterfly_labs"
   * @const
   */
  butterflyLabs: "butterfly_labs",

  /**
   * value: "curexa"
   * @const
   */
  curexa: "curexa",

  /**
   * value: "imaware"
   * @const
   */
  imaware: "imaware",

  /**
   * value: "null"
   * @const
   */
  _null: "null",
};
/**
 * Name of the provider you want to attach a product from)
 * @member {module:model/ProductsidProduct.ProviderNameEnum} providerName
 */
ProductsidProduct.prototype.providerName = undefined;

/**
 * ID of the provider product you want to attach to the Capable Health product
 * @member {String} providerProductId
 */
ProductsidProduct.prototype.providerProductId = undefined;

/**
 * Type of the provider product you want to attach to the Capable Health product
 * @member {String} providerProductType
 */
ProductsidProduct.prototype.providerProductType = undefined;
