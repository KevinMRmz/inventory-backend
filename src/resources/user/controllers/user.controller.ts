import { APIResponse } from '@common/types';
import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  ParseIntPipe,
  Param,
  Patch,
} from '@nestjs/common';
import { UserEntity } from '@user/entities';
import { UserService } from '../services/user.service';
import { CreateUserDto, UpdatePasswordDto, UpdateUserDto } from './../dtos';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  async getUsers(): Promise<APIResponse<UserEntity[]>> {
    return await this._userService.handleUsersResponse();
  }

  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<APIResponse<UserEntity>> {
    return await this._userService.handleUserResponse(id);
  }

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<APIResponse<UserEntity>> {
    return await this._userService.handleCreateUserResponse(createUserDto);
  }

  @Post('change-password/:id')
  async updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdatePasswordDto,
  ): Promise<APIResponse<UserEntity>> {
    return await this._userService.handleUpdatePasswordResponse(
      id,
      updateUserDto,
    );
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<APIResponse<UserEntity>> {
    return await this._userService.handleUpdateUserResponse(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<APIResponse<UserEntity>> {
    return await this._userService.handleDeleteUserResponse(id);
  }
}
