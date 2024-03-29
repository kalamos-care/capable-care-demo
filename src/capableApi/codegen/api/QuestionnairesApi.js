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
import { QuestionnairesBody } from "../model/QuestionnairesBody";
import { QuestionnairesIdBody } from "../model/QuestionnairesIdBody";

/**
 * Questionnaires service.
 * @module api/QuestionnairesApi
 * @version v0.3
 */
export class QuestionnairesApi {
  /**
    * Constructs a new QuestionnairesApi. 
    * @alias module:api/QuestionnairesApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
  constructor(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;
  }

  /**
   * Callback function to receive the result of the questionnairesGet operation.
   * @callback moduleapi/QuestionnairesApi~questionnairesGetCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */

  /**
   * List all Questionnaires
   * &lt;h3&gt;   &amp;#128275; Access policy &lt;/h3&gt; &lt;p&gt;You can access this endpoint with the following token types:&lt;/p&gt; &lt;p&gt;&amp;#9989; M2M&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#10060; &lt;s&gt;Patient&lt;/s&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#9989; Practitioner&lt;/p&gt;
   * @param {Object} opts Optional parameters
   * @param {Boolean} opts.includeRelationships Whether to include questions and answer or not (default to <.>)
   * @param {Number} opts.page Page number (default to <.>)
   * @param {Number} opts.size Page size (default to <.>)
   * @param {Array.<module:model/String>} opts.sortBy Sort results
   * @param {Array.<String>} opts.filters *Note: that the strings are stringified and encoded objects.*  Filter with operators.  | Field          | Operator | | ---------------| ---------| | created_at | eq, not_eq, gt, gteq, lt, lteq, in, not_in | | updated_at | eq, not_eq, gt, gteq, lt, lteq, in, not_in | | id | eq, not_eq, matches, does_not_match, in, not_in | | status | eq, not_eq, matches, does_not_match, lt, lteq, gt, gteq, in, not_in | | title | eq, not_eq, matches, does_not_match, in, not_in | | is_public | eq, not_eq, in, not_in | | tags | eq, not_eq, matches, does_not_match, in, not_in |  Example query value: &#x60;&#x60;&#x60; { &#x27;field&#x27;: &#x27;created_at&#x27;, &#x27;operator&#x27;:&#x27;eq&#x27;, &#x27;value&#x27;:&#x27;expected_value&#x27;, } &#x60;&#x60;&#x60;  Example stringified and encoded query value: &#x60;&#x60;&#x60; %7B%22field%22%3A%22%23%7Bcreated_at%7D%22%2C%22operator%22%3A%22eq%22%2C%22value%22%3A%22expected_value%22%7D &#x60;&#x60;&#x60;
   * @param {module:model/String} opts.filtersOperator Operator to chain filters
   * @param {Array.<String>} opts.byTags Filter by tags
   * @param {module:model/String} opts.byStatus Filter by status
   * @param {String} opts.byTitle Filter by title
   * @param {Boolean} opts.byIsPublic Filter by is public
   * @param {Array.<String>} opts.byId Filter by id
   * @param {module:api/QuestionnairesApi~questionnairesGetCallback} callback The callback function, accepting three arguments: error, data, response
   */
  questionnairesGet(opts, callback) {
    opts = opts || {};
    let postBody = null;

    let pathParams = {};
    let queryParams = {
      include_relationships: opts["includeRelationships"],
      page: opts["page"],
      size: opts["size"],
      sort_by: this.apiClient.buildCollectionParam(opts["sortBy"], "csv"),
      "filters[]": this.apiClient.buildCollectionParam(opts["filters"], "multi"),
      filters_operator: opts["filtersOperator"],
      by_tags: this.apiClient.buildCollectionParam(opts["byTags"], "csv"),
      by_status: opts["byStatus"],
      by_title: opts["byTitle"],
      by_is_public: opts["byIsPublic"],
      by_id: this.apiClient.buildCollectionParam(opts["byId"], "csv"),
    };
    let headerParams = {};
    let formParams = {};

    let authNames = [];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = null;

    return this.apiClient.callApi(
      "/questionnaires",
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
   * Callback function to receive the result of the questionnairesIdExportGet operation.
   * @callback moduleapi/QuestionnairesApi~questionnairesIdExportGetCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Submissions export as CSV
   * @param {String} id ID of the questionnaire
   * @param {module:api/QuestionnairesApi~questionnairesIdExportGetCallback} callback The callback function, accepting three arguments: error, data, response
   */
  questionnairesIdExportGet(id, callback) {
    let postBody = null;
    // verify the required parameter 'id' is set
    if (id === undefined || id === null) {
      throw new Error("Missing the required parameter 'id' when calling questionnairesIdExportGet");
    }

    let pathParams = {
      id: id,
    };
    let queryParams = {};
    let headerParams = {};
    let formParams = {};

    let authNames = [];
    let contentTypes = [];
    let accepts = [];
    let returnType = null;

    return this.apiClient.callApi(
      "/questionnaires/{id}/export",
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
   * Callback function to receive the result of the questionnairesIdGet operation.
   * @callback moduleapi/QuestionnairesApi~questionnairesIdGetCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Retrieve a Questionnaire
   * &lt;h3&gt;   &amp;#128275; Access policy &lt;/h3&gt; &lt;p&gt;You can access this endpoint with the following token types:&lt;/p&gt; &lt;p&gt;&amp;#9989; M2M&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#10060; &lt;s&gt;Patient&lt;/s&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#9989; Practitioner&lt;/p&gt;
   * @param {String} id
   * @param {module:api/QuestionnairesApi~questionnairesIdGetCallback} callback The callback function, accepting three arguments: error, data, response
   */
  questionnairesIdGet(id, callback) {
    let postBody = null;
    // verify the required parameter 'id' is set
    if (id === undefined || id === null) {
      throw new Error("Missing the required parameter 'id' when calling questionnairesIdGet");
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
      "/questionnaires/{id}",
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
   * Callback function to receive the result of the questionnairesIdPatch operation.
   * @callback moduleapi/QuestionnairesApi~questionnairesIdPatchCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Update a Questionnaire
   * &lt;h3&gt;   &amp;#128275; Access policy &lt;/h3&gt; &lt;p&gt;You can access this endpoint with the following token types:&lt;/p&gt; &lt;p&gt;&amp;#9989; M2M&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#10060; &lt;s&gt;Patient&lt;/s&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#9989; Practitioner&lt;/p&gt;
   * @param {String} id
   * @param {Object} opts Optional parameters
   * @param {module:model/QuestionnairesIdBody} opts.body
   * @param {module:api/QuestionnairesApi~questionnairesIdPatchCallback} callback The callback function, accepting three arguments: error, data, response
   */
  questionnairesIdPatch(id, opts, callback) {
    opts = opts || {};
    let postBody = opts["body"];
    // verify the required parameter 'id' is set
    if (id === undefined || id === null) {
      throw new Error("Missing the required parameter 'id' when calling questionnairesIdPatch");
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
      "/questionnaires/{id}",
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
   * Callback function to receive the result of the questionnairesPost operation.
   * @callback moduleapi/QuestionnairesApi~questionnairesPostCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Create a Questionnaire
   * &lt;h3&gt;   &amp;#128275; Access policy &lt;/h3&gt; &lt;p&gt;You can access this endpoint with the following token types:&lt;/p&gt; &lt;p&gt;&amp;#9989; M2M&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#10060; &lt;s&gt;Patient&lt;/s&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;#9989; Practitioner&lt;/p&gt;
   * @param {Object} opts Optional parameters
   * @param {module:model/QuestionnairesBody} opts.body
   * @param {module:api/QuestionnairesApi~questionnairesPostCallback} callback The callback function, accepting three arguments: error, data, response
   */
  questionnairesPost(opts, callback) {
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
      "/questionnaires",
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
