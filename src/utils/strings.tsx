import { isPatient } from "./patients";
import { Patient } from "models/patients/Patient.types";
import { User } from "models/users/User.types";

export const getInitials = (
  firstName: string | null,
  lastName: string | null
): string => {
  let initials = "";
  if (firstName) {
    initials += firstName[0].toUpperCase();
  }
  if (lastName) {
    initials += lastName[0].toUpperCase();
  }

  return initials;
};

export const formatError = (e: any): string => {
  let parsedError = "";
  if (typeof e === "object" && (e.response?.body?.errors || e.errors)) {
    const errors = e.response?.body?.errors || e.errors;
    parsedError = errors.map((e) => [e.title, e.message].join(": ")).join("\n");
  } else if (typeof e === "object" && e.response?.body) {
    parsedError = JSON.stringify(e.response.body);
  } else if (typeof e === "string") {
    parsedError = e;
  } else {
    try {
      parsedError = JSON.stringify(e);
    } catch {
      parsedError = "Sorry, an unexpected error occurred";
    }
  }
  return parsedError;
};

export const displayName = (user: User | Patient): string => {
  let identity: string;
  if (user?.first_name) {
    identity = user.last_name
      ? `${user.first_name} ${user.last_name}`
      : user.first_name;
  } else if (user?.email) {
    identity = user.email;
  } else if (isPatient(user)) {
    identity = user.phone_number?.number;
  } else {
    identity = "Unknown";
  }
  return identity;
};

export const displayNameWithLabel = (user: User, label?: string): string => {
  return `${displayName(user)}${label ? ` (${label})` : ""}`;
};
