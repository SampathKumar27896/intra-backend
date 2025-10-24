import { Connection, connect } from "mongoose";
import { Provider } from "@nestjs/common";

export const MongooseConnectionProvider: Provider = {
  provide: "MONGOOSE_CONNECTION",
  useFactory: async (): Promise<Connection> => {
    const connection = await connect(process.env.DATABASE_URI || "");
    return connection.connection;
  },
};
