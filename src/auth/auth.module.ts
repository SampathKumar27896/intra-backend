import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { MongooseConnectionProvider } from "../db/dbconnection.provider";
import { AuthService } from "./auth.service";
@Module({
  controllers: [AuthController],
  providers: [MongooseConnectionProvider, AuthService],
})
export class AuthModule {}
