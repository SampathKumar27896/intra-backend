import mongoose, { Connection } from "mongoose";
import { ConfigService } from "@nestjs/config";

export const AudioSchemaFactory = (
  configService: ConfigService,
  connection: Connection,
) => {
  const AudioSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      movie: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      fileName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      filePath: {
        type: String,
        unique: true,
        trim: true,
      },
      fileUrl: {
        type: String,
        unique: true,
        trim: true,
      },
      albumArt: {
        type: String,
        unique: true,
        trim: true,
      },
    },
    { timestamps: true },
  );
  return connection.model("AUDIO", AudioSchema);
};
