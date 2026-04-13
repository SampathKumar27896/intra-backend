import { Module } from "@nestjs/common";
import { DatabaseProvider } from "./database.provider";
import { ConfigModule } from "@nestjs/config";
@Module({
  imports: [ConfigModule],
  providers: [DatabaseProvider],
  exports: [DatabaseProvider],
})
export class DatabaseModule {}
