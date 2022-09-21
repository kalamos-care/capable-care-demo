type CarePlanStatus = "active" | "completed";

export interface CarePlan {
  name: string;
  id: string;
  status: CarePlanStatus;
};