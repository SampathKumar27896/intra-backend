import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./db/database.module";
import { AudioModule } from "./audio/audio.module";
import { ConfigModule } from "@nestjs/config";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        DatabaseModule,
        AudioModule,
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ".env",
        }),
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("root", () => {
    it('should return "Hello World!"', () => {
      const mockResponse = {"data": {"greeting": "Hello World!"}, "message": "Welcome home!"}
      expect(appController.getHello()).toEqual(mockResponse);
    });
  });
});
