import { Module } from "@nestjs/common";
import { AudioService } from "./audio.service";
import { StorageModule } from "../storage/storage.module";
import { AudioController } from "./audio.controller";
import { DatabaseModule } from "../db/database.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AudioSchemaFactory } from "./audio.schema";
import { Connection } from "mongoose";

@Module({
  imports: [ConfigModule, DatabaseModule, StorageModule],
  controllers: [AudioController],
  providers: [
    AudioService,
    {
      provide: "AUDIO_MODEL",
      useFactory: (configService: ConfigService, connection: Connection) => {
        return AudioSchemaFactory(configService, connection);
      },
      inject: [ConfigService, "DATABASE_CONNECTION"],
    },
  ],
  exports: [AudioService],
})
export class AudioModule {}
