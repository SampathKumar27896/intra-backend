import { Controller, Post, Body, UsePipes } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {
  registerUserSchema,
  type RegisterUserDto,
} from "./auth.validationPipes";
import { ZodValidationPipe } from "../app.validationPipe";

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
  loginUser() {
    return { status: true, message: "user logged in successfully" };
  }
}
