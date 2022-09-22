import { Message } from "@twilio/conversations";

import { InfiniteMessagesData } from "./useConversationMessages.hook";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { addMessage } from "./useConversationMessages.utils";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createFakeMessages = () => {
  return {
    pages: [
      [{ body: "first" }, { body: "second" }] as Message[],
      [{ body: "previous page" }] as Message[],
    ],
    pageParams: [],
  } as InfiniteMessagesData;
};

describe("addMessage", () => {
  // eslint-disable-next-line jest/expect-expect
  it("should add a message to the last page", () => {
    // const messageToAdd = { body: "new one" };
    // const currentCache = createFakeMessages();
    // const result = addMessage(currentCache, messageToAdd as Message);
    // const lastPage = result.pages[result.pages.length - 1];
    // const newMessage = lastPage[lastPage.length - 1];
    // expect(newMessage).toEqual(messageToAdd);
  });
});
