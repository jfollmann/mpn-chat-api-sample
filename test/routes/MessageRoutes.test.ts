import "jasmine";

import { MessageRoutes } from "../../src/routes/MessageRoutes";
import { messageController } from "../../src/controllers/MessageController";

describe("Message Routes", () => {

  it("- Index", () => {
    const router = new MessageRoutes();

    const spyController = spyOn(messageController, "index")
    router.index({ } as any, {} as any);

    expect(spyController).toHaveBeenCalled();
  })

  it("- Store", () => {
    const router = new MessageRoutes();

    const spyController = spyOn(messageController, "store")
    router.store({ } as any, {} as any);

    expect(spyController).toHaveBeenCalled();
  })

  it("- Update", () => {
    const router = new MessageRoutes();

    const spyController = spyOn(messageController, "update")
    router.update({ } as any, {} as any);

    expect(spyController).toHaveBeenCalled();
  })
})
