import "jasmine";

import { UserRoutes } from "../../src/routes/UserRoutes";
import { userController } from "../../src/controllers/UserController";

describe("Message Routes", () => {

  it("- Index", () => {
    const router = new UserRoutes();

    const spyController = spyOn(userController, "index")
    router.index({ } as any, {} as any);

    expect(spyController).toHaveBeenCalled();
  })

  it("- Store", () => {
    const router = new UserRoutes();

    const spyController = spyOn(userController, "store")
    router.store({ } as any, {} as any);

    expect(spyController).toHaveBeenCalled();
  })

  it("- Show", () => {
    const router = new UserRoutes();

    const spyController = spyOn(userController, "show")
    router.show({ } as any, {} as any);

    expect(spyController).toHaveBeenCalled();
  })

  it("- Update", () => {
    const router = new UserRoutes();

    const spyController = spyOn(userController, "update")
    router.update({ } as any, {} as any);

    expect(spyController).toHaveBeenCalled();
  })

  it("- Destroy", () => {
    const router = new UserRoutes();

    const spyController = spyOn(userController, "destroy")
    router.destroy({ } as any, {} as any);

    expect(spyController).toHaveBeenCalled();
  })
})
