import { Injectable, Inject } from "@nestjs/common";
import { Connection } from "mongoose";
import { type RegisterUserDto } from "./auth.validationPipes";
@Injectable()
export class AuthService {
  constructor(
    @Inject("MONGOOSE_CONNECTION") private readonly connection: Connection,
  ) {}

  createUser(registerUserDto: RegisterUserDto) {
    return registerUserDto;
  }
}
