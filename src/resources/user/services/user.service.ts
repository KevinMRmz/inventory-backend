import { Injectable, HttpStatus, BadRequestException } from '@nestjs/common';
import { PrismaService } from './../../../common/modules/prisma/prisma.service';
import { UserEntity } from '@user/entities';
import { APIResponse } from '@common/types';
import { UserNotFoundException, EmailAlreadyExistsException } from '../errors';
import { CreateUserDto, UpdatePasswordDto, UpdateUserDto } from './../dtos';
import { BcryptService } from './../../../common/modules/bcrypt/service/bcrypt.service';

@Injectable()
export class UserService {
  constructor(
    private readonly _prismaService: PrismaService,
    private readonly _bcryptService: BcryptService,
  ) {}

  // TODO:
  // write query, pagination, sort and limit
  async getUsers(): Promise<UserEntity[]> {
    return await this._prismaService.user.findMany({});
  }

  async handleUsersResponse(): Promise<APIResponse<UserEntity[]>> {
    const data = await this.getUsers();

    return {
      statusCode: HttpStatus.OK,
      data,
      count: data.length,
    };
  }

  async getUserById(id: number): Promise<UserEntity> {
    const user = await this.findUserById(id);

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async findUserById(id: number): Promise<UserEntity | null> {
    const user = await this._prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) return null;

    return user;
  }

  async handleUserResponse(id: number): Promise<APIResponse<UserEntity>> {
    const data = await this.getUserById(id);

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this._prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return null;

    return user;
  }

  async handleUserCreation(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { email, password, confirmPassword } = createUserDto;

    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const user = await this.findUserByEmail(email);

    if (user) {
      throw new EmailAlreadyExistsException();
    }

    const hashedPassword = await this._bcryptService.hash(password);

    return await this.createUser(createUserDto, hashedPassword);
  }

  private async createUser(
    createUserDto: CreateUserDto,
    password: string,
  ): Promise<UserEntity> {
    return await this._prismaService.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password,
        role: createUserDto.role,
      },
    });
  }

  async handleCreateUserResponse(
    createUserDto: CreateUserDto,
  ): Promise<APIResponse<UserEntity>> {
    const data = await this.handleUserCreation(createUserDto);

    return {
      statusCode: HttpStatus.CREATED,
      data,
    };
  }

  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.getUserById(id);

    const { password, confirmPassword } = updatePasswordDto;

    const hash = await this._bcryptService.hash(password);

    return await this._prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hash,
      },
    });
  }

  async handleUpdatePasswordResponse(
    id: number,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<APIResponse<UserEntity>> {
    const data = await this.updatePassword(id, updatePasswordDto);

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.getUserById(id);

    const { email } = updateUserDto;

    if (email && email !== user.email && (await this.findUserByEmail(email))) {
      throw new EmailAlreadyExistsException();
    }

    return await this._prismaService.user.update({
      where: {
        id,
      },
      data: {
        username: updateUserDto.username,
        email: updateUserDto.email,
        role: updateUserDto.role,
      },
    });
  }

  async handleUpdateUserResponse(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<APIResponse<UserEntity>> {
    const data = await this.updateUser(id, updateUserDto);

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  async deleteUser(id: number): Promise<UserEntity> {
    const user = await this.getUserById(id);

    return await this._prismaService.user.delete({ where: { id: user.id } });
  }

  async handleDeleteUserResponse(id: number): Promise<APIResponse<UserEntity>> {
    const data = await this.deleteUser(id);

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }
}
