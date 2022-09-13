export interface SubscriptionScheduleDetail {
  interval: "day" | "week" | "month" | "year";
  interval_count: number;
}

interface ProductMetadata {
  description: string;
  name: string;
  images: string[];
}

export interface SubscriptionOption {
  id: string;
  nickname: string;
  unit_amount: number;
  unit_amount_decimal: string;
  metadata: Record<string, any>;
  type: "recurring" | "one-time";
  recurring: SubscriptionScheduleDetail;
  product: string;
  capable_health_metadata?: ProductMetadata;
  // Not a value returned by capable api. Temp variable to store a name created by frontend if no nickname is available
  temp_name?: string;
}

export interface Subscription {
  name: string;
  stripe_subscription_id: string;
  status: string;
  upcoming_invoice_date: string;
  patient_id: string;
  billing_period: "day" | "week" | "month" | "year";
  billing_interval: number;
  created_at: string;
  cancel_at: string;
  trial_end: string;
  plan_price: number;
}
