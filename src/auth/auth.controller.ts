import { Controller, Post, Body } from "@nestjs/common";

@Controller()
export class AuthController {
  constructor() {}
  @Post("/register")
  registerUser() {
    return { status: true, message: "User registered successfully" };
  }

  @Post("/login")
  loginUser() {
    return { status: true, message: "user logged in successfully" };
  }
}
