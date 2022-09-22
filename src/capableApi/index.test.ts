import api from "./index";

describe("the api module", () => {
  test("exports the api namespace object", () => {
    expect(typeof api).toEqual("object");
  });

  test("has a client member", () => {
    expect(typeof api.client).toEqual("object");
  });
});
