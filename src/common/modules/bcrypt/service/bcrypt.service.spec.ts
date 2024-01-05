import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { BcryptService } from './bcrypt.service';

jest.mock('bcrypt', () => ({
  genSalt: jest.fn(),
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('BcryptService', () => {
  let bcryptService: BcryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptService],
    }).compile();

    bcryptService = module.get<BcryptService>(BcryptService);
  });

  describe('hash', () => {
    it('should hash the data using bcrypt', async () => {
      const data = 'password123';
      const hashedResult = 'hashedPassword123';

      (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt123');
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedResult);

      const result = await bcryptService.hash(data);

      expect(result).toEqual(hashedResult);
      expect(bcrypt.genSalt).toHaveBeenCalledWith(bcryptService['_SALT']);
      expect(bcrypt.hash).toHaveBeenCalledWith(data, 'salt123');
    });
  });

  describe('compare', () => {
    it('should compare hashed and candidate using bcrypt', async () => {
      const hashed = 'hashedPassword123';
      const candidate = 'password123';

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await bcryptService.compare(hashed, candidate);

      expect(result).toEqual(true);
      expect(bcrypt.compare).toHaveBeenCalledWith(hashed, candidate);
    });
  });
});
