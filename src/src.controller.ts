import { Controller, Get } from '@nestjs/common';

@Controller()
export class Basic {
  @Get()
  get() {
    console.log('Hello world');
  }
}
