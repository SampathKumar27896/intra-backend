import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import { AuthGuard } from "./auth.guard";





let guard: AuthGuard;

describe("AuthGuard fails when there is no cookie", () => {

    beforeEach(() => {
        const mockJwtService = {
            verifyAsync: jest.fn(),
        }

        const mockConfigService = {
            get: jest.fn().mockReturnValue("test-secret"),
        }
        guard = new AuthGuard(
            mockJwtService as unknown as  JwtService,
            mockConfigService as unknown as ConfigService
        )
    });

    it("should throw UnauthorizedException when token exists", async() => {
        const request = {
            cookies: {},
        };
        const context = {
            switchToHttp: jest.fn().mockReturnValue({
                getRequest: () => request,
            }),
        } as unknown as ExecutionContext;

        await expect(
            guard.canActivate(context),
        ).rejects.toThrow(UnauthorizedException);
    });
    
});
describe("AuthGuard pass when there is  cookie", () => {

    beforeEach(() => {
        const mockJwtService = {
            verifyAsync: jest.fn().mockResolvedValue({
                email: "john@gmail.com",
                userName: "John"
            }),
        }

        const mockConfigService = {
            get: jest.fn().mockReturnValue("test-secret"),
        }
        guard = new AuthGuard(
            mockJwtService as unknown as  JwtService,
            mockConfigService as unknown as ConfigService
        )
    });

    it("should throw UnauthorizedException when token exists", async() => {
        const request = {
            cookies: {
                jwt: "valid-token"
            },
            user: {}
        };
        const context = {
            switchToHttp: jest.fn().mockReturnValue({
                getRequest: () => request,
            }),
        } as unknown as ExecutionContext;

       const result = await guard.canActivate(context);
       expect(result).toBe(true);
       expect(request.user).toEqual({
            email: "john@gmail.com",
            userName: "John"
       });
    });
    
});
