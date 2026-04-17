jest.mock("mongoose", () => {
  const actualMongoose = jest.requireActual("mongoose");
  return {
    ...actualMongoose,
    connect: jest.fn(), // 👈 only override this
  };
});

import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./db/database.module";
import { AudioModule } from "./audio/audio.module";
import { ConfigModule } from "@nestjs/config";
import { connect } from "mongoose";

const mockConnection = {
  connection: {
    readyState: 1,
    model: jest.fn().mockReturnValue({
      find: jest.fn(),
      create: jest.fn(),
    }),
  },
};
describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    (connect as jest.Mock).mockResolvedValue(mockConnection);
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        DatabaseModule,
        AudioModule,
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ".env.test",
        }),
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });
  describe("root", () => {
    it('should return "Hello World!"', () => {
      const mockResponse = {
        data: { greeting: "Hello World!" },
        message: "Welcome home!",
      };
      expect(appController.getHello()).toEqual(mockResponse);
    });
  });
});
