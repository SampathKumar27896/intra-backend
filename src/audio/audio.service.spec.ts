import { Test, TestingModule } from "@nestjs/testing";
import { AudioService } from "./audio.service";
import { StorageService } from "../storage/storage.service";
import { ConfigService } from "@nestjs/config";

describe("AudioService", () => {
  let service: AudioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AudioService,
        {
          provide: "AUDIO_MODEL",
          useValue: {
            find: jest.fn(),
            findById: jest.fn(),
            updateOne: jest.fn(),
          },
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
    }).compile();

    service = module.get<AudioService>(AudioService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
