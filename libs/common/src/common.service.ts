import { Injectable } from '@nestjs/common';
import * as nanoid from 'nanoid';

@Injectable()
export class CommonService {
  getCodeHell(prefix: string): string {
    const genCode = nanoid.customAlphabet(
      '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    );
    return prefix.toUpperCase() + genCode(9);
  }
}
