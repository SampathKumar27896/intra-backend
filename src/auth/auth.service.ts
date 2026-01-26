import { Injectable, Inject } from "@nestjs/common";
import {
  type RegisterUserDto,
  type LoginUserDto,
} from "./auth.validationPipes";
import { Model } from "mongoose";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
interface Auth {
  userName: string;
  email: string;
  password: string;
}
@Injectable()
export class AuthService {
  constructor(
    @Inject("AUTH_MODEL") private authModel: Model<Auth>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async createUser(registerUserDto: RegisterUserDto) {
    await this.authModel.create(registerUserDto);
  }

  async findUser(loginUserDto: LoginUserDto): Promise<Auth | null> {
    const user = await this.authModel
      .findOne({ email: loginUserDto.email })
      .select("userName email password");
    console.log(user);
    if (user) {
      const result: boolean = await bcrypt.compare(
        loginUserDto.password,
        user.password,
      );
      console.log(result, loginUserDto.password, user.password);
      if (!result) return null;
    }
    return user;
  }

  createAuthToken(auth: Auth): string {
    const jwtSecret = this.configService.get<string>("JWT_SECRET");
    const jwtToken = this.jwtService.sign(
      { userName: auth.userName, sub: auth.email },
      {
        secret: jwtSecret,
      },
    );
    return jwtToken;
  }
}
