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
 * PhotonHealthPrescriptions service.
 * @module api/PhotonHealthPrescriptionsApi
 * @version v0.3
 */
export class PhotonHealthPrescriptionsApi {
  /**
    * Constructs a new PhotonHealthPrescriptionsApi. 
    * @alias module:api/PhotonHealthPrescriptionsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
  constructor(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;
  }

  /**
   * Callback function to receive the result of the photonHealthPrescriptionsGet operation.
   * @callback moduleapi/PhotonHealthPrescriptionsApi~photonHealthPrescriptionsGetCallback
   * @param {String} error Error message, if any.
   * @param data This operation does not return a value.
   * @param {String} response The complete HTTP response.
   */

  /**
   * List Photon Health Prescriptions
   * @param {Object} opts Optional parameters
   * @param {String} opts.byPatientId Filter by Capable Health patient ID
   * @param {module:api/PhotonHealthPrescriptionsApi~photonHealthPrescriptionsGetCallback} callback The callback function, accepting three arguments: error, data, response
   */
  photonHealthPrescriptionsGet(opts, callback) {
    opts = opts || {};
    let postBody = null;

    let pathParams = {};
    let queryParams = {
      by_patient_id: opts["byPatientId"],
    };
    let headerParams = {};
    let formParams = {};

    let authNames = [];
    let contentTypes = [];
    let accepts = ["application/json"];
    let returnType = null;

    return this.apiClient.callApi(
      "/photon_health/prescriptions",
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
