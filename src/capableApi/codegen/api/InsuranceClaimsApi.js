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
import { InsuranceClaimsBody } from "../model/InsuranceClaimsBody";
import { InsuranceClaimsIdBody } from "../model/InsuranceClaimsIdBody";

/**
 * InsuranceClaims service.
 * @module api/InsuranceClaimsApi
 * @version v0.3
 */
export class InsuranceClaimsApi {
  /**
    * Constructs a new InsuranceClaimsApi. 
    * @alias module:api/InsuranceClaimsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
  constructor(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;
  }

  /**
   * Callback function to receive the result of the insuranceClaimsGet operation.
   * @callback moduleapi/InsuranceClaimsApi~insuranceClaimsGetCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */

  /**
   * List all insurance claims
   * &lt;h3&gt;   &amp;#128275; Access policy &lt;/h3&gt; &lt;p&gt;You can access this endpoint with the following token types:&lt;/p&gt; &lt;p&gt;&amp;#9989; M2M&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#10060; &lt;s&gt;Patient&lt;/s&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#9989; Practitioner&lt;/p&gt;
   * @param {Object} opts Optional parameters
   * @param {Array.<String>} opts.byEncounterId Filter by encounter id
   * @param {Array.<String>} opts.filters *Note: that the strings are stringified and encoded objects.*  Filter with operators.  | Field          | Operator | | ---------------| ---------| | encounter_id | eq, not_eq, matches, does_not_match, in, not_in |  Example query value: &#x60;&#x60;&#x60; { &#x27;field&#x27;: &#x27;encounter_id&#x27;, &#x27;operator&#x27;:&#x27;eq&#x27;, &#x27;value&#x27;:&#x27;expected_value&#x27;, } &#x60;&#x60;&#x60;  Example stringified and encoded query value: &#x60;&#x60;&#x60; %7B%22field%22%3A%22%23%7Bencounter_id%7D%22%2C%22operator%22%3A%22eq%22%2C%22value%22%3A%22expected_value%22%7D &#x60;&#x60;&#x60;
   * @param {module:model/String} opts.filtersOperator Operator to chain filters
   * @param {Number} opts.page Page number (default to <.>)
   * @param {Number} opts.size Page size (default to <.>)
   * @param {Array.<module:model/String>} opts.sortBy Sort results
   * @param {module:api/InsuranceClaimsApi~insuranceClaimsGetCallback} callback The callback function, accepting three arguments: error, data, response
   */
  insuranceClaimsGet(opts, callback) {
    opts = opts || {};
    let postBody = null;

    let pathParams = {};
    let queryParams = {
      by_encounter_id: this.apiClient.buildCollectionParam(opts["byEncounterId"], "csv"),
      "filters[]": this.apiClient.buildCollectionParam(opts["filters"], "multi"),
      filters_operator: opts["filtersOperator"],
      page: opts["page"],
      size: opts["size"],
      sort_by: this.apiClient.buildCollectionParam(opts["sortBy"], "csv"),
    };
    let headerParams = {};
    let formParams = {};

    let authNames = [];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = null;

    return this.apiClient.callApi(
      "/insurance_claims",
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
   * Callback function to receive the result of the insuranceClaimsIdGet operation.
   * @callback moduleapi/InsuranceClaimsApi~insuranceClaimsIdGetCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Retrieve an Insurance Claim
   * &lt;h3&gt;   &amp;#128275; Access policy &lt;/h3&gt; &lt;p&gt;You can access this endpoint with the following token types:&lt;/p&gt; &lt;p&gt;&amp;#9989; M2M&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#10060; &lt;s&gt;Patient&lt;/s&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#9989; Practitioner&lt;/p&gt;
   * @param {String} id
   * @param {module:api/InsuranceClaimsApi~insuranceClaimsIdGetCallback} callback The callback function, accepting three arguments: error, data, response
   */
  insuranceClaimsIdGet(id, callback) {
    let postBody = null;
    // verify the required parameter 'id' is set
    if (id === undefined || id === null) {
      throw new Error("Missing the required parameter 'id' when calling insuranceClaimsIdGet");
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
      "/insurance_claims/{id}",
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
   * Callback function to receive the result of the insuranceClaimsIdPatch operation.
   * @callback moduleapi/InsuranceClaimsApi~insuranceClaimsIdPatchCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Update an existing Insurance Claim
   * @param {String} id
   * @param {Object} opts Optional parameters
   * @param {module:model/InsuranceClaimsIdBody} opts.body
   * @param {module:api/InsuranceClaimsApi~insuranceClaimsIdPatchCallback} callback The callback function, accepting three arguments: error, data, response
   */
  insuranceClaimsIdPatch(id, opts, callback) {
    opts = opts || {};
    let postBody = opts["body"];
    // verify the required parameter 'id' is set
    if (id === undefined || id === null) {
      throw new Error("Missing the required parameter 'id' when calling insuranceClaimsIdPatch");
    }

    let pathParams = {
      id: id,
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};

    let authNames = [];
    let contentTypes = ["application/json"];
    let accepts = ["application/json"];
    let returnType = null;

    return this.apiClient.callApi(
      "/insurance_claims/{id}",
      "PATCH",
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
   * Callback function to receive the result of the insuranceClaimsIdSubmitPost operation.
   * @callback moduleapi/InsuranceClaimsApi~insuranceClaimsIdSubmitPostCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */

  /**
   * submit insurance claim
   * &lt;h3&gt;   &amp;#128275; Access policy &lt;/h3&gt; &lt;p&gt;You can access this endpoint with the following token types:&lt;/p&gt; &lt;p&gt;&amp;#9989; M2M&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#10060; &lt;s&gt;Patient&lt;/s&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#9989; Practitioner&lt;/p&gt;
   * @param {String} id
   * @param {module:api/InsuranceClaimsApi~insuranceClaimsIdSubmitPostCallback} callback The callback function, accepting three arguments: error, data, response
   */
  insuranceClaimsIdSubmitPost(id, callback) {
    let postBody = null;
    // verify the required parameter 'id' is set
    if (id === undefined || id === null) {
      throw new Error(
        "Missing the required parameter 'id' when calling insuranceClaimsIdSubmitPost"
      );
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
      "/insurance_claims/{id}/submit",
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
   * Callback function to receive the result of the insuranceClaimsPost operation.
   * @callback moduleapi/InsuranceClaimsApi~insuranceClaimsPostCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Create an Insurance Claim
   * &lt;h3&gt;   &amp;#128275; Access policy &lt;/h3&gt; &lt;p&gt;You can access this endpoint with the following token types:&lt;/p&gt; &lt;p&gt;&amp;#9989; M2M&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#10060; &lt;s&gt;Patient&lt;/s&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#9989; Practitioner&lt;/p&gt;
   * @param {Object} opts Optional parameters
   * @param {module:model/InsuranceClaimsBody} opts.body
   * @param {module:api/InsuranceClaimsApi~insuranceClaimsPostCallback} callback The callback function, accepting three arguments: error, data, response
   */
  insuranceClaimsPost(opts, callback) {
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
      "/insurance_claims",
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
