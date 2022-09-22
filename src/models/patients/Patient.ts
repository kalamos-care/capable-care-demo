import { BaseModel } from "../baseModel/BaseModel";
import { Patient as PatientApi } from "./Patient.types";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Patient extends PatientApi {}
class Patient extends BaseModel {
  get name(): string {
    let name = this.first_name || this.last_name;
    if (!name && this.email) {
      name = this.email.split("@")[0].split("+")[0];
    } else if (!name) {
      name = "";
    }

    // Capitalise the first letter
    name = name.charAt(0).toUpperCase() + name.slice(1);

    return name;
  }

  get joinedAt(): number {
    const created = new Date(this.created_at);

    return created?.getFullYear();
  }
}

export default Patient;
