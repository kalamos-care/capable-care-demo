import { DataWrapper } from "./DataWrapper";

class Patient extends DataWrapper {
  get name() {
    let name = this.first_name || this.last_name;
    if (!name && this.email) name = this.email.split("@")[0].split("+")[0];
    else if (!name) name = "";

    // Capitalise the first letter
    name = name.charAt(0).toUpperCase() + name.slice(1);

    return name;
  }

  get joinedAt() {
    const created = new Date(this.data.created_at);

    return created?.getFullYear();
  }
}

export default Patient;
