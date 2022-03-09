import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import { PaginateResult } from 'mongoose';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import {
  ListUsersRequest,
  GetUserRequest,
  CreateUserRequest,
  UpdateUserRequest,
  DeleteUserRequest,
} from './interfaces/user.interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'ListUsers')
  listUsers(request: ListUsersRequest): Promise<PaginateResult<User>> {
    try {
      const users = this.userService.listUsers(request);

      return users;
    } catch (error) {
      throw new RpcException({
        code: status.UNAVAILABLE,
        message: error?.message,
      });
    }
  }

  @GrpcMethod('UserService', 'GetUser')
  async getUser(request: GetUserRequest): Promise<User> {
    try {
      const user = await this.userService.getUser(request);

      if (!user) {
        throw new RpcException({
          code: status.NOT_FOUND,
          message: 'User not found',
        });
      }

      return user;
    } catch (error) {
      throw new RpcException({
        code: status.UNAVAILABLE,
        message: error?.message,
      });
    }
  }

  @GrpcMethod('UserService', 'CreateUser')
  async createUser(request: CreateUserRequest): Promise<User> {
    try {
      const user = await this.userService.createUser(request);

      return user;
    } catch (error) {
      if (error?.code === 11000) {
        throw new RpcException({
          code: status.ALREADY_EXISTS,
          message: 'User already exists',
        });
      } else {
        throw new RpcException({
          code: status.UNAVAILABLE,
          message: error?.message,
        });
      }
    }
  }

  @GrpcMethod('UserService', 'UpdateUser')
  async updateUser(request: UpdateUserRequest): Promise<User> {
    try {
      const user = await this.userService.updateUser(request);

      if (!user) {
        throw new RpcException({
          code: status.NOT_FOUND,
          message: 'User not found',
        });
      }

      return user;
    } catch (error) {
      throw new RpcException({
        code: status.UNAVAILABLE,
        message: error?.message,
      });
    }
  }

  @GrpcMethod('UserService', 'DeleteUser')
  async DeleteUser(request: DeleteUserRequest): Promise<User> {
    try {
      const user = await this.userService.deleteUser(request);

      if (!user) {
        throw new RpcException({
          code: status.NOT_FOUND,
          message: 'User not found',
        });
      }

      return user;
    } catch (error) {
      throw new RpcException({
        code: status.UNAVAILABLE,
        message: error?.message,
      });
    }
  }
}
