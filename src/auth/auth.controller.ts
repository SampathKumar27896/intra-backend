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
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    console.log(registerUserDto);
    return this.authService.createUser(registerUserDto);
  }

  @Post("/login")
  loginUser() {
    return { status: true, message: "user logged in successfully" };
  }
}
