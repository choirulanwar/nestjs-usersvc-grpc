import { User } from '../schemas/user.schema';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { OrderBy, OrderType } from '../enums/user.enum';

export interface ListUsersRequest {
  offset?: number;
  limit?: number;
  orderBy?: OrderBy;
  orderType?: OrderType;
}

export interface ListUsersResponse {
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  docs: User[];
  nextPage: number;
  prevPage: number;
  pagingCounter: number;
  hasPrevPage: number;
  hasNextPage: number;
}

export interface GetUserRequest {
  id?: string;
  username?: string;
  email?: string;
}

export interface CreateUserRequest {
  user: CreateUserDto;
}

export interface UpdateUserRequest {
  id: string;
  user: UpdateUserDto;
}

export interface DeleteUserRequest {
  id: string;
}
