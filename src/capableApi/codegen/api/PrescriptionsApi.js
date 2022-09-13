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
 * Prescriptions service.
 * @module api/PrescriptionsApi
 * @version v0.3
 */
export class PrescriptionsApi {
  /**
    * Constructs a new PrescriptionsApi. 
    * @alias module:api/PrescriptionsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
  constructor(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;
  }

  /**
   * Callback function to receive the result of the prescriptionsGet operation.
   * @callback moduleapi/PrescriptionsApi~prescriptionsGetCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */

  /**
   * List all Patient Prescriptions
   * &lt;h3&gt;   &amp;#128275; Access policy &lt;/h3&gt; &lt;p&gt;You can access this endpoint with the following token types:&lt;/p&gt; &lt;p&gt;&amp;#9989; M2M&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#9989; Patient&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#9989; Practitioner&lt;/p&gt;
   * @param {Object} opts Optional parameters
   * @param {Array.<String>} opts.byPatientId Filter by patient id
   * @param {Boolean} opts.hasRefillsLeft Filter by any with refills left
   * @param {Number} opts.page Page number (default to <.>)
   * @param {Number} opts.size Page size (default to <.>)
   * @param {Array.<module:model/String>} opts.sortBy Sort results
   * @param {Array.<String>} opts.filters *Note: that the strings are stringified and encoded objects.*  Filter with operators.  | Field          | Operator | | ---------------| ---------| | patient_id | eq, not_eq, matches, does_not_match, in, not_in | | has_refills_left | eq, not_eq, in, not_in | | external_case_id | eq, not_eq, matches, does_not_match, in, not_in |  Example query value: &#x60;&#x60;&#x60; { &#x27;field&#x27;: &#x27;patient_id&#x27;, &#x27;operator&#x27;:&#x27;eq&#x27;, &#x27;value&#x27;:&#x27;expected_value&#x27;, } &#x60;&#x60;&#x60;  Example stringified and encoded query value: &#x60;&#x60;&#x60; %7B%22field%22%3A%22%23%7Bpatient_id%7D%22%2C%22operator%22%3A%22eq%22%2C%22value%22%3A%22expected_value%22%7D &#x60;&#x60;&#x60;
   * @param {module:model/String} opts.filtersOperator Operator to chain filters
   * @param {module:api/PrescriptionsApi~prescriptionsGetCallback} callback The callback function, accepting three arguments: error, data, response
   */
  prescriptionsGet(opts, callback) {
    opts = opts || {};
    let postBody = null;

    let pathParams = {};
    let queryParams = {
      by_patient_id: this.apiClient.buildCollectionParam(opts["byPatientId"], "csv"),
      has_refills_left: opts["hasRefillsLeft"],
      page: opts["page"],
      size: opts["size"],
      sort_by: this.apiClient.buildCollectionParam(opts["sortBy"], "csv"),
      "filters[]": this.apiClient.buildCollectionParam(opts["filters"], "multi"),
      filters_operator: opts["filtersOperator"],
    };
    let headerParams = {};
    let formParams = {};

    let authNames = [];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = null;

    return this.apiClient.callApi(
      "/prescriptions",
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
   * Callback function to receive the result of the prescriptionsIdGet operation.
   * @callback moduleapi/PrescriptionsApi~prescriptionsIdGetCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Retrieve a Prescription
   * &lt;h3&gt;   &amp;#128275; Access policy &lt;/h3&gt; &lt;p&gt;You can access this endpoint with the following token types:&lt;/p&gt; &lt;p&gt;&amp;#9989; M2M&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#9989; Patient&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#9989; Practitioner&lt;/p&gt;
   * @param {String} id
   * @param {module:api/PrescriptionsApi~prescriptionsIdGetCallback} callback The callback function, accepting three arguments: error, data, response
   */
  prescriptionsIdGet(id, callback) {
    let postBody = null;
    // verify the required parameter 'id' is set
    if (id === undefined || id === null) {
      throw new Error("Missing the required parameter 'id' when calling prescriptionsIdGet");
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
      "/prescriptions/{id}",
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
}
