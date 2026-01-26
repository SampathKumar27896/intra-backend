import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { createResourceDTO } from "./create-resource.dto";
import { AuthGuard } from "./auth/auth.guard";
@Controller("home")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard)
  getHello() {
    return {
      message: "Welcome home!",
      data: { greeting: this.appService.getHello() },
    };
  }

  @Post("/create")
  createResource(@Body() createResource: createResourceDTO) {
    console.log(createResource);
    return createResource;
  }
}
