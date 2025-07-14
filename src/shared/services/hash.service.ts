import { Injectable } from '@nestjs/common';
import { hash, verify } from 'argon2';

@Injectable()
export class HashService {
  async hash(text: string) {
    return hash(text);
  }

  async comparePassword(hashText: string, text: string) {
    return verify(hashText, text);
  }
}
