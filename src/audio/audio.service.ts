import { Injectable, Inject } from "@nestjs/common";
import { Model } from "mongoose";
import { StorageService } from "../storage/storage.service";
import { UpdateAudioDto } from "./dto/update-audio.dto";
import { AudioResponseDto } from "./dto/get-audio-list.dto";
import { ConfigService } from "@nestjs/config";

interface Audio {
  id: string;
  title: string;
  movie: string;
  fileName: string;
  fileUrl: string;
  albumArt: string;
  createdAt: Date;
  updatedAt: Date;
}
@Injectable()
export class AudioService {
  constructor(
    @Inject("AUDIO_MODEL") private audioModel: Model<Audio>,
    private readonly storageService: StorageService,
    private configService: ConfigService,
  ) {}
  create() {
    return "This action adds a new audio";
  }

  async findAll(): Promise<AudioResponseDto[]> {
    const result = await this.audioModel.find({}, { filePath: 0 }).exec();
    console.log(result);
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} audio`;
  }

  async getOrUpdateAudio(songId: string) {
    const result = await this.audioModel
      .findById(songId)
      .select("fileUrl fileName");
    let signedUrl = "";
    const bucketPath =
      this.configService.get<string>("AUDIO_BUCKET_PATH") || "";
    if (result?.fileName) {
      signedUrl = await this.storageService.getSignedUrl(
        bucketPath,
        result?.fileName,
      );
    }
    await this.audioModel.updateOne(
      { _id: songId },
      { $set: { fileUrl: signedUrl } },
    );
    return signedUrl;
  }

  update(id: number, updateAudioDto: UpdateAudioDto) {
    return `This action updates a #${id} audio`;
  }

  remove(id: number) {
    return `This action removes a #${id} audio`;
  }
}
