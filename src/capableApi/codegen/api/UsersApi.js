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
 * Users service.
 * @module api/UsersApi
 * @version v0.3
 */
export class UsersApi {
  /**
    * Constructs a new UsersApi. 
    * @alias module:api/UsersApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
  constructor(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;
  }

  /**
   * Callback function to receive the result of the usersGet operation.
   * @callback moduleapi/UsersApi~usersGetCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */

  /**
   * List all Users
   * &lt;h3&gt;   &amp;#128275; Access policy &lt;/h3&gt; &lt;p&gt;You can access this endpoint with the following token types:&lt;/p&gt; &lt;p&gt;&amp;#9989; M2M&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#9989; Patient&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#9989; Practitioner&lt;/p&gt;
   * @param {Object} opts Optional parameters
   * @param {Array.<String>} opts.byType Filter by type
   * @param {Number} opts.page Page number (default to <.>)
   * @param {Number} opts.size Page size (default to <.>)
   * @param {Array.<module:model/String>} opts.sortBy Sort results
   * @param {Array.<String>} opts.filters *Note: that the strings are stringified and encoded objects.*  Filter with operators.  | Field          | Operator | | ---------------| ---------| | created_at | eq, not_eq, gt, gteq, lt, lteq, in, not_in | | updated_at | eq, not_eq, gt, gteq, lt, lteq, in, not_in | | first_name | eq, not_eq, matches, does_not_match, in, not_in | | middle_name | eq, not_eq, matches, does_not_match, in, not_in | | last_name | eq, not_eq, matches, does_not_match, in, not_in | | email | eq, not_eq, matches, does_not_match, in, not_in |  Example query value: &#x60;&#x60;&#x60; { &#x27;field&#x27;: &#x27;created_at&#x27;, &#x27;operator&#x27;:&#x27;eq&#x27;, &#x27;value&#x27;:&#x27;expected_value&#x27;, } &#x60;&#x60;&#x60;  Example stringified and encoded query value: &#x60;&#x60;&#x60; %7B%22field%22%3A%22%23%7Bcreated_at%7D%22%2C%22operator%22%3A%22eq%22%2C%22value%22%3A%22expected_value%22%7D &#x60;&#x60;&#x60;
   * @param {module:model/String} opts.filtersOperator Operator to chain filters
   * @param {String} opts.byFirstName Filter by first name
   * @param {String} opts.byMiddleName Filter by middle name
   * @param {String} opts.byLastName Filter by last name
   * @param {Array.<String>} opts.byEmail Filter by email
   * @param {Array.<String>} opts.byId Filter by id
   * @param {String} opts.search Search records against first_name, last_name, and email
   * @param {module:api/UsersApi~usersGetCallback} callback The callback function, accepting three arguments: error, data, response
   */
  usersGet(opts, callback) {
    opts = opts || {};
    let postBody = null;

    let pathParams = {};
    let queryParams = {
      by_type: this.apiClient.buildCollectionParam(opts["byType"], "csv"),
      page: opts["page"],
      size: opts["size"],
      sort_by: this.apiClient.buildCollectionParam(opts["sortBy"], "csv"),
      "filters[]": this.apiClient.buildCollectionParam(opts["filters"], "multi"),
      filters_operator: opts["filtersOperator"],
      by_first_name: opts["byFirstName"],
      by_middle_name: opts["byMiddleName"],
      by_last_name: opts["byLastName"],
      by_email: this.apiClient.buildCollectionParam(opts["byEmail"], "csv"),
      by_id: this.apiClient.buildCollectionParam(opts["byId"], "csv"),
      search: opts["search"],
    };
    let headerParams = {};
    let formParams = {};

    let authNames = [];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = null;

    return this.apiClient.callApi(
      "/users",
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
