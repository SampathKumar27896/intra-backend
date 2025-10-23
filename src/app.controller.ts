import { Controller, Get, Post, Body } from "@nestjs/common";
import { AppService } from "./app.service";
import { createResourceDTO } from "./create-resource.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("/create")
  createResource(@Body() createResource: createResourceDTO) {
    console.log(createResource);
    return createResource;
  }
}
