import { Patient } from "../models/patients/Patient.types";

export const isPatient = (user: any): user is Patient => {
  // TODO: Currently userType is something we set on Kariko but we should get userType from API and
  //  check against userType here so for now check if obj contains mdi_patient_id key
  return Object.keys(user).includes("mdi_patient_id");
};
