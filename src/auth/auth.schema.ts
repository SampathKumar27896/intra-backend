import mongoose, { Connection, Model, Document } from "mongoose";
import bcrypt from "bcrypt";
import { ConfigService } from "@nestjs/config";

export const AuthSchemaFactory = (
  configService: ConfigService,
  connection: Connection,
) => {
  const AuthSchema = new mongoose.Schema(
    {
      userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    { timestamps: true },
  );
  AuthSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
    try {
      const saltRounds: number = parseInt(
        configService.get<string>("SALT_ROUND", "10"),
      );
      const saltSecret: string = configService.get<string>("SALT_PASSWORD", "");
      this.password = await bcrypt.hash(saltSecret, saltRounds);
      next();
    } catch (error) {
      next(error);
    }
  });
  return connection.model("USER", AuthSchema);
};
