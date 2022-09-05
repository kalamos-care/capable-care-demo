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
import { OrdersBody } from "../model/OrdersBody";

/**
 * Orders service.
 * @module api/OrdersApi
 * @version v0.3
 */
export class OrdersApi {
  /**
    * Constructs a new OrdersApi. 
    * @alias module:api/OrdersApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
  constructor(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;
  }

  /**
   * Callback function to receive the result of the ordersGet operation.
   * @callback moduleapi/OrdersApi~ordersGetCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */

  /**
   * List all Orders
   * &lt;h3&gt;   &amp;#128275; Access policy &lt;/h3&gt; &lt;p&gt;You can access this endpoint with the following token types:&lt;/p&gt; &lt;p&gt;&amp;#9989; M2M&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#9989; Patient&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#9989; Practitioner&lt;/p&gt;
   * @param {Object} opts Optional parameters
   * @param {Array.<String>} opts.byPatientId Filter by patient id
   * @param {Number} opts.page Page number (default to <.>)
   * @param {Number} opts.size Page size (default to <.>)
   * @param {Array.<module:model/String>} opts.sortBy Sort results
   * @param {Array.<String>} opts.byId Filter by id
   * @param {module:api/OrdersApi~ordersGetCallback} callback The callback function, accepting three arguments: error, data, response
   */
  ordersGet(opts, callback) {
    opts = opts || {};
    let postBody = null;

    let pathParams = {};
    let queryParams = {
      by_patient_id: this.apiClient.buildCollectionParam(opts["byPatientId"], "csv"),
      page: opts["page"],
      size: opts["size"],
      sort_by: this.apiClient.buildCollectionParam(opts["sortBy"], "csv"),
      by_id: this.apiClient.buildCollectionParam(opts["byId"], "csv"),
    };
    let headerParams = {};
    let formParams = {};

    let authNames = [];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = null;

    return this.apiClient.callApi(
      "/orders",
      "GET",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the ordersIdApprovePost operation.
   * @callback moduleapi/OrdersApi~ordersIdApprovePostCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Approve an Order
   * &lt;h3&gt;   &amp;#128275; Access policy &lt;/h3&gt; &lt;p&gt;You can access this endpoint with the following token types:&lt;/p&gt; &lt;p&gt;&amp;#9989; M2M&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#10060; &lt;s&gt;Patient&lt;/s&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#9989; Practitioner&lt;/p&gt;
   * @param {String} id
   * @param {module:api/OrdersApi~ordersIdApprovePostCallback} callback The callback function, accepting three arguments: error, data, response
   */
  ordersIdApprovePost(id, callback) {
    let postBody = null;
    // verify the required parameter 'id' is set
    if (id === undefined || id === null) {
      throw new Error("Missing the required parameter 'id' when calling ordersIdApprovePost");
    }

    let pathParams = {
      id: id,
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};

    let authNames = [];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = null;

    return this.apiClient.callApi(
      "/orders/{id}/approve",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the ordersIdGet operation.
   * @callback moduleapi/OrdersApi~ordersIdGetCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Retrieve an Order
   * &lt;h3&gt;   &amp;#128275; Access policy &lt;/h3&gt; &lt;p&gt;You can access this endpoint with the following token types:&lt;/p&gt; &lt;p&gt;&amp;#9989; M2M&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#9989; Patient&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#9989; Practitioner&lt;/p&gt;
   * @param {String} id
   * @param {module:api/OrdersApi~ordersIdGetCallback} callback The callback function, accepting three arguments: error, data, response
   */
  ordersIdGet(id, callback) {
    let postBody = null;
    // verify the required parameter 'id' is set
    if (id === undefined || id === null) {
      throw new Error("Missing the required parameter 'id' when calling ordersIdGet");
    }

    let pathParams = {
      id: id,
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};

    let authNames = [];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = null;

    return this.apiClient.callApi(
      "/orders/{id}",
      "GET",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the ordersIdPaymentIntentGet operation.
   * @callback moduleapi/OrdersApi~ordersIdPaymentIntentGetCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Retrieve an Order&#x27;s Payment Intent
   * &lt;h3&gt;   &amp;#128275; Access policy &lt;/h3&gt; &lt;p&gt;You can access this endpoint with the following token types:&lt;/p&gt; &lt;p&gt;&amp;#10060; &lt;s&gt;M2M&lt;/s&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#9989; Patient&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#10060; &lt;s&gt;Practitioner&lt;/s&gt;&lt;/p&gt;
   * @param {String} id
   * @param {module:api/OrdersApi~ordersIdPaymentIntentGetCallback} callback The callback function, accepting three arguments: error, data, response
   */
  ordersIdPaymentIntentGet(id, callback) {
    let postBody = null;
    // verify the required parameter 'id' is set
    if (id === undefined || id === null) {
      throw new Error("Missing the required parameter 'id' when calling ordersIdPaymentIntentGet");
    }

    let pathParams = {
      id: id,
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};

    let authNames = [];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = null;

    return this.apiClient.callApi(
      "/orders/{id}/payment_intent",
      "GET",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
  /**
   * Callback function to receive the result of the ordersPost operation.
   * @callback moduleapi/OrdersApi~ordersPostCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Create an Order
   * &lt;h3&gt;   &amp;#128275; Access policy &lt;/h3&gt; &lt;p&gt;You can access this endpoint with the following token types:&lt;/p&gt; &lt;p&gt;&amp;#9989; M2M&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#9989; Patient&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#9989; Practitioner&lt;/p&gt;
   * @param {Object} opts Optional parameters
   * @param {module:model/OrdersBody} opts.body
   * @param {module:api/OrdersApi~ordersPostCallback} callback The callback function, accepting three arguments: error, data, response
   */
  ordersPost(opts, callback) {
    opts = opts || {};
    let postBody = opts["body"];

    let pathParams = {};
    let queryParams = {};
    let headerParams = {};
    let formParams = {};

    let authNames = [];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = null;

    return this.apiClient.callApi(
      "/orders",
      "POST",
      pathParams,
      queryParams,
      headerParams,
      formParams,
      postBody,
      authNames,
      contentTypes,
      accepts,
      returnType,
      callback
    );
  }
}
