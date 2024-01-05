import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { BcryptService } from '../../../common/modules/bcrypt/service/bcrypt.service';
import { UserNotFoundException } from '../errors';
import { PrismaService } from './../../../common/modules/prisma/prisma.service';
import { UserEntity } from '@user/entities';
import { APIResponse } from '@common/types';
import { Role } from '../types/user.types';

const usersMocked = [
  {
    id: 1,
    username: 'user1',
    email: 'user1@example.com',
    role: 'user',
    password: '12345678',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    username: 'user2',
    email: 'user2@example.com',
    role: 'admin',
    password: '12345678',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;
  let bcryptService: BcryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          },
        },
        BcryptService,
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
    bcryptService = module.get<BcryptService>(BcryptService);
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const mockUsers = usersMocked;

      jest.spyOn(prismaService.user, 'findMany').mockResolvedValue(mockUsers);

      const result = await userService.getUsers();

      expect(result).toEqual(mockUsers);
    });
  });

  describe('handleUsersResponse', () => {
    it('should return APIResponse with HttpStatus.OK and user data', async () => {
      const mockUsers: UserEntity[] = usersMocked;

      jest.spyOn(userService, 'getUsers').mockResolvedValue(mockUsers);

      const result = await userService.handleUsersResponse();

      const expectedResponse: APIResponse<UserEntity[]> = {
        statusCode: HttpStatus.OK,
        data: mockUsers,
        count: mockUsers.length,
      };

      expect(result).toEqual(expectedResponse);
    });
  });

  describe('getUserById', () => {
    it('should return a user when the user with the specified id exists', async () => {
      const mockUser = usersMocked[0];

      jest.spyOn(userService, 'findUserById').mockResolvedValue(mockUser);

      const result = await userService.getUserById(1);

      expect(result).toEqual(mockUser);
    });

    it('should return null when the user with the specified id does not exist', async () => {
      jest.spyOn(userService, 'findUserById').mockResolvedValue(null);

      // Ensure that calling getUserById with a non-existent user ID throws UserNotFoundException
      await expect(userService.getUserById(999)).rejects.toThrow(
        UserNotFoundException,
      );
    });
  });

  describe('findUserByEmail', () => {
    it('Should find a user by email', async () => {
      const mockUser = usersMocked[0];

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);

      const result = await userService.findUserByEmail('user1@example.com');

      expect(result).toEqual(mockUser);
    });

    it('Could not find a user by email', async () => {
      const mockResult = null;

      jest.spyOn(userService, 'findUserByEmail').mockResolvedValue(mockResult);

      const result = await userService.findUserByEmail(
        'nofoundEmail@gmail.com',
      );

      expect(result).toBeNull();
    });
  });

  describe('createUser', () => {
    it('Should create a user successfully', async () => {
      const createUserDto = {
        username: 'kevin',
        email: 'kevin10@gmail.com',
        password: 'pA55w0rD',
        confirmPassword: 'pA55w0rD',
        role: 'ADMIN' as Role,
      };

      jest.spyOn(userService, 'findUserByEmail').mockResolvedValue(null);

      jest
        .spyOn(bcryptService, 'hash')
        .mockResolvedValue(createUserDto.password);

      jest
        .spyOn(prismaService.user, 'create')
        .mockResolvedValue(usersMocked[0]);

      const result = await userService.handleUserCreation(createUserDto);

      expect(result).toBe(usersMocked[0]);
    });
  });
});
