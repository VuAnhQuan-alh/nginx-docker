import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('healthy')
  getHello() {
    return this.appService.getHello();
  }

  @Get('ahi')
  getAhi() {
    return { data: 'ahi', message: 'Ahihi do ngoc' };
  }
}
