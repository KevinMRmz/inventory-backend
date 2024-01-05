import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  private readonly _SALT = 10;

  async hash(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(this._SALT);
    return await bcrypt.hash(data, salt);
  }

  async compare(hashed: string, candidate: string): Promise<boolean> {
    return await bcrypt.compare(hashed, candidate);
  }
}
