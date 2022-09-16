// Generated by https://quicktype.io

export interface Goal {
  id: string;
  name: string;
  description: string;
  achievement_status: string;
  start_on: string;
  due_on: string;
  cron_expression: string;
  care_plan_id: string;
  goal_template_id: string;
  created_at: string;
  upstringd_at: string;
  cms_entry_id: string;
  targets: Target[];
  tag_list: string[];
  observations: Observation[];
  imageUrl: string;
  url: string;
}

export interface Observation {
  id: null;
  patient_id: string;
  observed_value: string;
  created_at: string;
  upstringd_at: string;
  observed_string: string;
  target_id: string;
  goal_id: string;
  observation_type_id: string;
  source_id: string;
  source_type: string;
  note: string;
  provider_response: Record<string, string>;
}

export interface Target {
  id: string;
  name: string;
  description: string;
  value: string;
  goal_id: string;
  created_at: string;
  upstringd_at: string;
  observation_type_id: string;
  target_template_id: string;
  tag_list: string[];
  measure_id: string;
  data_type: string;
}
