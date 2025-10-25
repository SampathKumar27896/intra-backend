import { Connection, connect } from "mongoose";
import { Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export const DatabaseProvider: Provider = {
  provide: "DATABASE_CONNECTION",
  useFactory: async (configService: ConfigService): Promise<Connection> => {
    const connection = await connect(
      configService.get<string>("DATABASE_URI") || "",
    );
    return connection.connection;
  },
  inject: [ConfigService],
};
