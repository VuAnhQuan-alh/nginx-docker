import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  getCodeHell(prefix: string): string {
    const code = this.makeCode(9);
    return prefix.toUpperCase() + code;
  }

  makeCode = (length: number) => {
    let result = '';
    let counter = 0;

    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }

    return result;
  };
}
