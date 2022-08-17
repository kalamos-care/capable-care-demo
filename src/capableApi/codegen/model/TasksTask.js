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
 * The TasksTask model module.
 * @module model/TasksTask
 * @version v0.3
 */
export class TasksTask {
  /**
   * Constructs a new <code>TasksTask</code>.
   * @alias module:model/TasksTask
   * @class
   * @param taskTemplateId {String} ID of the task template being used to create the task
   * @param carePlanId {String} ID of the care plan to associate the task with
   */
  constructor(taskTemplateId, carePlanId) {
    this.taskTemplateId = taskTemplateId;
    this.carePlanId = carePlanId;
  }

  /**
   * Constructs a <code>TasksTask</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TasksTask} obj Optional instance to populate.
   * @return {module:model/TasksTask} The populated <code>TasksTask</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new TasksTask();
      if (data.hasOwnProperty("task_template_id"))
        obj.taskTemplateId = ApiClient.convertToType(data["task_template_id"], "String");
      if (data.hasOwnProperty("care_plan_id"))
        obj.carePlanId = ApiClient.convertToType(data["care_plan_id"], "String");
      if (data.hasOwnProperty("name")) obj.name = ApiClient.convertToType(data["name"], "String");
      if (data.hasOwnProperty("description"))
        obj.description = ApiClient.convertToType(data["description"], "String");
      if (data.hasOwnProperty("due_on"))
        obj.dueOn = ApiClient.convertToType(data["due_on"], "Date");
      if (data.hasOwnProperty("tag_list"))
        obj.tagList = ApiClient.convertToType(data["tag_list"], ["String"]);
      if (data.hasOwnProperty("cms_entry_id"))
        obj.cmsEntryId = ApiClient.convertToType(data["cms_entry_id"], "String");
    }
    return obj;
  }
}

/**
 * ID of the task template being used to create the task
 * @member {String} taskTemplateId
 */
TasksTask.prototype.taskTemplateId = undefined;

/**
 * ID of the care plan to associate the task with
 * @member {String} carePlanId
 */
TasksTask.prototype.carePlanId = undefined;

/**
 * Name of the task. Defaults to name of the task template being used
 * @member {String} name
 */
TasksTask.prototype.name = undefined;

/**
 * Description of the task. Defaults to the description of the task template being used
 * @member {String} description
 */
TasksTask.prototype.description = undefined;

/**
 * Date by which the task should be accomplished
 * @member {Date} dueOn
 */
TasksTask.prototype.dueOn = undefined;

/**
 * Add an array of strings to help manage your resources
 * @member {Array.<String>} tagList
 */
TasksTask.prototype.tagList = undefined;

/**
 * Add a link to your CMS content
 * @member {String} cmsEntryId
 */
TasksTask.prototype.cmsEntryId = undefined;