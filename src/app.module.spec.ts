import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "./app.module";

describe("AppModule Integration", () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider("DATABASE_CONNECTION")
      .useValue({
        model: jest.fn().mockReturnValue({
          find: jest.fn(),
          findById: jest.fn(),
        }),
      })
      .compile();
  });

  it("should compile the module successfully", () => {
    expect(module).toBeDefined();
  });
});
