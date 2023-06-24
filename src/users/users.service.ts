import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create({
    email,
    password,
    username,
    binance_private_key,
    binance_public_key,
    phone,
  }: CreateUserDto) {
    const userExists = await this.repo.findOne({ where: { email } });

    if (userExists) {
      throw new BadRequestException('User with this email already exists');
    }

    const user = this.repo.create({
      email,
      password: await argon2.hash(password),
      username,
      binance_private_key: binance_private_key ?? '',
      binance_public_key: binance_public_key ?? '',
      phone,
    });
    await this.repo.save(user);
    return user;
  }

  async findAll() {
    const users = await this.repo.find();

    return users;
  }

  async findOne(id: number) {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id:${id} was not found`);
    }

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.repo.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    Object.assign(user, updateUserDto);

    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    this.repo.remove(user);
    return true;
  }
}
