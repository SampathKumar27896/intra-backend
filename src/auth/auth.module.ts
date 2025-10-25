import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { DatabaseModule } from "../db/database.module";
import { AuthService } from "./auth.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthSchemaFactory } from "./auth.schema";
import { Connection } from "mongoose";
@Module({
  imports: [ConfigModule, DatabaseModule],

  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: "AUTH_MODEL",
      useFactory: (configService: ConfigService, connection: Connection) => {
        return AuthSchemaFactory(configService, connection);
      },
      inject: [ConfigService, "DATABASE_CONNECTION"],
    },
  ],
})
export class AuthModule {}
