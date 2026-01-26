import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { AudioService } from "./audio.service";
import { CreateAudioDto } from "./dto/create-audio.dto";
import { UpdateAudioDto } from "./dto/update-audio.dto";
import { AuthGuard } from "../auth/auth.guard";

@Controller("audio")
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Post()
  create(@Body() createAudioDto: CreateAudioDto) {
    return this.audioService.create();
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    const songList = await this.audioService.findAll();
    return {
      message: "Audio list fetched successfully",
      data: { songList: songList },
    };
  }

  @Post("getSong")
  @UseGuards(AuthGuard)
  async getAudio(@Body("songId") songId: string) {
    console.log("coming here", songId);
    const songUrl = await this.audioService.getOrUpdateAudio(songId);
    return { data: { songUrl: songUrl } };
  }
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.audioService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAudioDto: UpdateAudioDto) {
    return this.audioService.update(+id, updateAudioDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.audioService.remove(+id);
  }
}
