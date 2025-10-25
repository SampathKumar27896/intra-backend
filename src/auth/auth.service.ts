import { Injectable, Inject } from "@nestjs/common";
import { type RegisterUserDto } from "./auth.validationPipes";
import { Model } from "mongoose";
interface Auth {
  userName: string;
  email: string;
  password: string;
}
@Injectable()
export class AuthService {
  constructor(@Inject("AUTH_MODEL") private authModel: Model<Auth>) {}

  async createUser(registerUserDto: RegisterUserDto) {
    await this.authModel.create(registerUserDto);
  }
}
