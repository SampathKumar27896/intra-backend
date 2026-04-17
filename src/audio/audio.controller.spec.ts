
jest.mock("mongoose", () => {
  const actualMongoose = jest.requireActual("mongoose");
  return {
    ...actualMongoose,
    connect: jest.fn(),
  };
});

import { Test, TestingModule } from "@nestjs/testing";
import { AudioController } from "./audio.controller";
import { AudioService } from "./audio.service";
import { StorageService } from "../storage/storage.service";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "../auth/auth.guard";
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

const mockAudioModel = {
  find: jest.fn(),
  findById: jest.fn(),
  updateOne: jest.fn(),
};

describe("AudioController", () => {
  let controller: AudioController;

  beforeEach(async () => {
    (connect as jest.Mock).mockResolvedValue(mockConnection);
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AudioController],
      providers: [
        AudioService,
        {
          provide: "AUDIO_MODEL",
          useValue: mockAudioModel,
        },
        {
          provide: StorageService,
          useValue: {
            getSignedUrl: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue("")
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn().mockResolvedValue(true) })
      .compile();

    controller = module.get<AudioController>(AudioController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
