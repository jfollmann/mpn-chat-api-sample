import "jasmine";

import { HelloRoutes } from "../../src/routes/HelloRoutes";
import { helloController } from "../../src/controllers/HelloController";

describe("Hello Routes", () => {

  it("- Say Hello", () => {
    const router = new HelloRoutes();

    const spyController = spyOn(helloController, "index")
    router.index({ } as any, {} as any);

    expect(spyController).toHaveBeenCalled();
  })
})
