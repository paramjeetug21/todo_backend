import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { CreateUserDto, LoginUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { Todos } from '../task/task.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER')
    private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(dto: CreateUserDto) {
    try {
      const existing = await this.userModel.findOne({
        where: { email: dto.email },
      });

      if (existing) {
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);

      const user = await this.userModel.create({
        ...dto,
        password: hashedPassword,
      });

      return {
        message: 'User registered successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async login(dto: LoginUserDto) {
    try {
      const user = await this.userModel.findOne({
        where: { email: dto.email },
        include: [Todos],
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const isMatch = await bcrypt.compare(dto.password, user.password);
      if (!isMatch) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      const payload = { id: user.id, email: user.email };
      const token = this.jwtService.sign(payload);

      return {
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          todos: user.todos,
        },
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUser(id: string) {
    try {
      const user = await this.userModel.findByPk(id);
      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);

      await user.destroy();
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
