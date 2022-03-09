import { Injectable } from '@nestjs/common';
import ShortID from 'short-uuid';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateResult } from 'mongoose';
import {
  CreateUserRequest,
  DeleteUserRequest,
  GetUserRequest,
  ListUsersRequest,
  UpdateUserRequest,
} from './interfaces/user.interface';
import { OrderBy, OrderType } from './enums/user.enum';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private model: PaginateModel<User>) {}

  async listUsers(request: ListUsersRequest): Promise<PaginateResult<User>> {
    const {
      offset = 0,
      limit = 10,
      orderBy = 'DEFAULT',
      orderType = 'DESC',
    } = request;

    const user = await this.model.paginate(
      {},
      {
        offset,
        limit,
        sort: { [OrderBy[orderBy]]: OrderType[orderType] },
        select: '-password',
      },
    );

    return user;
  }

  async getUser(request: GetUserRequest): Promise<User> {
    if (!Object.keys(request)?.length) {
      throw new Error('Missing parameters');
    }
    const user = await this.model.findOne(request).select('-password');

    return user;
  }

  async createUser(request: CreateUserRequest): Promise<User> {
    const id = ShortID.generate();
    const user = await this.model.create({ id, ...request.user });

    return user;
  }

  async updateUser(request: UpdateUserRequest): Promise<User> {
    if (!Object.keys(request)?.length) {
      throw new Error('Missing parameters');
    }
    if (!request.id) {
      throw new Error('Invalid ID');
    }

    const user = await this.model
      .findOneAndUpdate({ id: request.id }, request.user, {
        new: true,
      })
      .select('-password');

    return user;
  }

  async deleteUser(request: DeleteUserRequest): Promise<User> {
    if (!Object.keys(request)?.length) {
      throw new Error('Missing parameters');
    }
    if (!request.id) {
      throw new Error('Invalid ID');
    }

    const user = await this.model
      .findOneAndDelete({ id: request.id })
      .select('-password');

    return user;
  }
}
