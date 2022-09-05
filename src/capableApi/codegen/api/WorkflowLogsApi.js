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
 * WorkflowLogs service.
 * @module api/WorkflowLogsApi
 * @version v0.3
 */
export class WorkflowLogsApi {
  /**
    * Constructs a new WorkflowLogsApi. 
    * @alias module:api/WorkflowLogsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
  constructor(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;
  }

  /**
   * Callback function to receive the result of the workflowsLogsGet operation.
   * @callback moduleapi/WorkflowLogsApi~workflowsLogsGetCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */

  /**
   * List all WorkflowLogs
   * &lt;h3&gt;   &amp;#128275; Access policy &lt;/h3&gt; &lt;p&gt;You can access this endpoint with the following token types:&lt;/p&gt; &lt;p&gt;&amp;#9989; M2M&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#10060; &lt;s&gt;Patient&lt;/s&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#9989; Practitioner&lt;/p&gt;
   * @param {Object} opts Optional parameters
   * @param {Array.<String>} opts.filters *Note: that the strings are stringified and encoded objects.*  Filter with operators.  | Field          | Operator | | ---------------| ---------| | id | eq, not_eq, matches, does_not_match, in, not_in | | workflow_id | eq, not_eq, matches, does_not_match, in, not_in | | author_id | eq, not_eq, matches, does_not_match, in, not_in | | level | eq, not_eq, matches, does_not_match, lt, lteq, gt, gteq, in, not_in | | affected_user_id | eq, not_eq, matches, does_not_match, in, not_in | | author_id | eq, not_eq, matches, does_not_match, in, not_in | | author_type | eq, not_eq, matches, does_not_match, in, not_in | | created_at | eq, not_eq, gt, gteq, lt, lteq, in, not_in | | workflow_execution_group_id | eq, not_eq, matches, does_not_match, in, not_in |  Example query value: &#x60;&#x60;&#x60; { &#x27;field&#x27;: &#x27;id&#x27;, &#x27;operator&#x27;:&#x27;eq&#x27;, &#x27;value&#x27;:&#x27;expected_value&#x27;, } &#x60;&#x60;&#x60;  Example stringified and encoded query value: &#x60;&#x60;&#x60; %7B%22field%22%3A%22%23%7Bid%7D%22%2C%22operator%22%3A%22eq%22%2C%22value%22%3A%22expected_value%22%7D &#x60;&#x60;&#x60;
   * @param {Number} opts.page Page number (default to <.>)
   * @param {Number} opts.size Page size (default to <.>)
   * @param {Array.<module:model/String>} opts.sortBy Sort results
   * @param {module:api/WorkflowLogsApi~workflowsLogsGetCallback} callback The callback function, accepting three arguments: error, data, response
   */
  workflowsLogsGet(opts, callback) {
    opts = opts || {};
    let postBody = null;

    let pathParams = {};
    let queryParams = {
      "filters[]": this.apiClient.buildCollectionParam(opts["filters"], "multi"),
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
      "/workflows/logs",
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
