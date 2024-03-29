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
 * The ObservationstypesObservationType model module.
 * @module model/ObservationstypesObservationType
 * @version v0.3
 */
export class ObservationstypesObservationType {
  /**
   * Constructs a new <code>ObservationstypesObservationType</code>.
   * @alias module:model/ObservationstypesObservationType
   * @class
   * @param name {String} Name of the Observation Type, which typically would match the LOINC code name
   */
  constructor(name) {
    this.name = name;
  }

  /**
   * Constructs a <code>ObservationstypesObservationType</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ObservationstypesObservationType} obj Optional instance to populate.
   * @return {module:model/ObservationstypesObservationType} The populated <code>ObservationstypesObservationType</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ObservationstypesObservationType();
      if (data.hasOwnProperty("name")) obj.name = ApiClient.convertToType(data["name"], "String");
      if (data.hasOwnProperty("description"))
        obj.description = ApiClient.convertToType(data["description"], "String");
      if (data.hasOwnProperty("data_type"))
        obj.dataType = ApiClient.convertToType(data["data_type"], "String");
      if (data.hasOwnProperty("unit")) obj.unit = ApiClient.convertToType(data["unit"], "String");
      if (data.hasOwnProperty("tag_list"))
        obj.tagList = ApiClient.convertToType(data["tag_list"], ["String"]);
    }
    return obj;
  }
}

/**
 * Name of the Observation Type, which typically would match the LOINC code name
 * @member {String} name
 */
ObservationstypesObservationType.prototype.name = undefined;

/**
 * Description of the Observation Type, which can be any text helpful to practitioners for understanding a given Observation
 * @member {String} description
 */
ObservationstypesObservationType.prototype.description = undefined;

/**
 * Allowed values for the <code>dataType</code> property.
 * @enum {String}
 * @readonly
 */
ObservationstypesObservationType.DataTypeEnum = {
  /**
   * value: "string"
   * @const
   */
  _string: "string",

  /**
   * value: "boolean"
   * @const
   */
  _boolean: "boolean",

  /**
   * value: "integer"
   * @const
   */
  integer: "integer",

  /**
   * value: "float"
   * @const
   */
  _float: "float",

  /**
   * value: "datetime"
   * @const
   */
  datetime: "datetime",
};
/**
 * Data type of the measured value
 * @member {module:model/ObservationstypesObservationType.DataTypeEnum} dataType
 */
ObservationstypesObservationType.prototype.dataType = undefined;

/**
 * Allowed values for the <code>unit</code> property.
 * @enum {String}
 * @readonly
 */
ObservationstypesObservationType.UnitEnum = {
  /**
   * value: "fluid ounce"
   * @const
   */
  fluidOunce: "fluid ounce",

  /**
   * value: "pound (US and British)"
   * @const
   */
  poundUSAndBritish: "pound (US and British)",

  /**
   * value: "mile"
   * @const
   */
  mile: "mile",

  /**
   * value: "drinks / day"
   * @const
   */
  drinksDay: "drinks / day",

  /**
   * value: "events"
   * @const
   */
  events: "events",

  /**
   * value: "day"
   * @const
   */
  day: "day",

  /**
   * value: "hour"
   * @const
   */
  hour: "hour",

  /**
   * value: "liter"
   * @const
   */
  liter: "liter",

  /**
   * value: "minute"
   * @const
   */
  minute: "minute",

  /**
   * value: "second"
   * @const
   */
  second: "second",

  /**
   * value: "week"
   * @const
   */
  week: "week",

  /**
   * value: "count"
   * @const
   */
  count: "count",

  /**
   * value: "heart beats per minute"
   * @const
   */
  heartBeatsPerMinute: "heart beats per minute",

  /**
   * value: "inch"
   * @const
   */
  inch: "inch",

  /**
   * value: "feet"
   * @const
   */
  feet: "feet",

  /**
   * value: "per minute"
   * @const
   */
  perMinute: "per minute",

  /**
   * value: "percent"
   * @const
   */
  percent: "percent",

  /**
   * value: "degree Fahrenheit"
   * @const
   */
  degreeFahrenheit: "degree Fahrenheit",

  /**
   * value: "kilogram / (meter ^ 2)"
   * @const
   */
  kilogramMeter2: "kilogram / (meter ^ 2)",

  /**
   * value: "millimeter of mercury"
   * @const
   */
  millimeterOfMercury: "millimeter of mercury",

  /**
   * value: "{score}"
   * @const
   */
  score: "{score}",

  /**
   * value: "International Unit / Liter"
   * @const
   */
  internationalUnitLiter: "International Unit / Liter",

  /**
   * value: "milligrams / decilitre"
   * @const
   */
  milligramsDecilitre: "milligrams / decilitre",

  /**
   * value: "nanograms / millilitre"
   * @const
   */
  nanogramsMillilitre: "nanograms / millilitre",

  /**
   * value: "milligrams / litre"
   * @const
   */
  milligramsLitre: "milligrams / litre",

  /**
   * value: "milliunits / litre"
   * @const
   */
  milliunitsLitre: "milliunits / litre",

  /**
   * value: "ratio"
   * @const
   */
  ratio: "ratio",

  /**
   * value: "Enzyme Unit Per Liter"
   * @const
   */
  enzymeUnitPerLiter: "Enzyme Unit Per Liter",
};
/**
 * Unit of the measured value. Must be populated for any data type of integer or float
 * @member {module:model/ObservationstypesObservationType.UnitEnum} unit
 */
ObservationstypesObservationType.prototype.unit = undefined;

/**
 * Add an array of strings to help manage your resources
 * @member {Array.<String>} tagList
 */
ObservationstypesObservationType.prototype.tagList = undefined;
