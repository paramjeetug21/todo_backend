import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    console.log('signUp started !');
    return await this.UserService.createUser(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    return await this.UserService.login(dto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.UserService.deleteUser(id);
  }
}
