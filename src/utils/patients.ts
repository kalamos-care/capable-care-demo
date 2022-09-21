import { UserTypes } from "./../models/users/User.types";

import { User } from "models/users/User.types";
import { Patient } from "../models/patients/Patient.types";

export const isPatient = (user: User | Patient): user is Patient => {
  return user.type === UserTypes.Patient;
};
