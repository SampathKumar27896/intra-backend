import {
  Controller,
  Post,
  Body,
  UsePipes,
  BadRequestException,
  HttpCode,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
  registerUserSchema,
  loginUserSchema,
  type RegisterUserDto,
  type LoginUserDto,
} from "./auth.validationPipes";
import { ZodValidationPipe } from "../app.validationPipe";
import type { Response } from "express";

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/register")
  @UsePipes(new ZodValidationPipe(registerUserSchema))
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    await this.authService.createUser(registerUserDto);
    return { message: "Registration success" };
  }

  @Post("/login")
  @UsePipes(new ZodValidationPipe(loginUserSchema))
  @HttpCode(200)
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.findUser(loginUserDto);
    if (user) {
      const jwtToken = this.authService.createAuthToken(user);
      res.cookie("jwt", jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 60000,
      });
      return {
        message: "Login success",
        data: { userName: user.userName, email: user.email, token: jwtToken },
      };
    } else {
      throw new BadRequestException("Invalid credentials");
    }
  }
}
