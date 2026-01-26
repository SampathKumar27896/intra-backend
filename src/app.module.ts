import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./db/database.module";
import { ConfigModule } from "@nestjs/config";
import { ZodValidationPipe } from "./app.validationPipe";
import { AudioModule } from "./audio/audio.module";
import { StorageModule } from "./storage/storage.module";

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    StorageModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AudioModule,
  ],
  controllers: [AppController],
  providers: [AppService, ZodValidationPipe],
})
export class AppModule {}
