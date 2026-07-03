import { Test, TestingModule } from "@nestjs/testing";
import { AudioService } from "./audio.service";
import { StorageService } from "../storage/storage.service";
import { ConfigService } from "@nestjs/config";
import { AudioResponseDto } from "./dto/get-audio-list.dto";
describe("AudioService", () => {
  let audioService: AudioService;
  let audioModel;
  let configService: ConfigService;
  let storageService: StorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AudioService,
        {
          provide: "AUDIO_MODEL",
          useValue: {
            find: jest.fn().mockReturnThis(),
            findById: jest.fn().mockReturnThis(),
            updateOne: jest.fn().mockReturnThis(),
            exec: jest.fn(),
            select: jest.fn()
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
          }
        },
      ],
    }).compile();

    audioService = module.get<AudioService>(AudioService);
    audioModel = module.get<any>("AUDIO_MODEL");
    configService = module.get<ConfigService>(ConfigService);
    storageService = module.get<StorageService>(StorageService);
  });

  test("findAll", async() => {
    const expectedResult: AudioResponseDto[] = [
      {
        id: "aud-9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        title: "The Next Episode",
        movie: "The Wash",
        fileName: "the_next_episode_2001.mp3",
        createdAt: new Date("2026-01-15T08:30:00Z"),
        updatedAt: new Date("2026-06-05T10:28:00Z")
      }
    ]
    jest.spyOn(audioModel, "exec").mockResolvedValue(expectedResult);
    const actualResult = await audioService.findAll();
    expect(actualResult).toEqual(expectedResult);
  });

  test("getOrUpdateAudio", async() => {
    const selectResult = {
      fileUrl: "https://fileUrl",
      fileName: "Samplefile.mp3"
    };
    const bucketPath = "storage/music";
    const signedUrl = "https://signedUrl";
    jest.spyOn(audioModel, "select").mockResolvedValue(selectResult);
    jest.spyOn(configService, "get").mockReturnValue(bucketPath);
    jest.spyOn(storageService, "getSignedUrl").mockResolvedValue(signedUrl);
    jest.spyOn(audioModel, "updateOne").mockResolvedValue(signedUrl);

    const actualResult = await audioService.getOrUpdateAudio("songId");
    expect(audioModel.select).toHaveBeenCalledWith("fileUrl fileName");
    expect(storageService.getSignedUrl).toHaveBeenCalledWith(bucketPath, selectResult.fileName);
    expect(audioModel.updateOne).toHaveBeenCalledWith({_id: "songId"}, { $set: { fileUrl: signedUrl}});
    expect(actualResult).toBe(signedUrl);
  })
});
