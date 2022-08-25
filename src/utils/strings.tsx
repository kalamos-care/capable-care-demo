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
