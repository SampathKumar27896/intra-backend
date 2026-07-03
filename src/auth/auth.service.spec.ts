import { Test, TestingModule } from "@nestjs/testing";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { AuthService } from "./auth.service";

const mockAuthModel = {
  create: jest.fn(),
  findOne: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
};

const mockConfigService = {
  get: jest.fn(),
};

let service: AuthService;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      AuthService,
      {
        provide: "AUTH_MODEL",
        useValue: mockAuthModel,
      },
      {
        provide: JwtService,
        useValue: mockJwtService,
      },
      {
        provide: ConfigService,
        useValue: mockConfigService,
      },
    ],
  }).compile();
  service = module.get(AuthService);
});

describe("Auth service", () => {
  it("should create a user", async () => {
    const dto = {
      userName: "John",
      email: "john@test.com",
      password: "234r4",
      retypePassword: "234r4",
    };

    mockAuthModel.create.mockResolvedValue(dto);
    await service.createUser(dto);
    expect(mockAuthModel.create).toHaveBeenCalledWith(dto);
  });
});
