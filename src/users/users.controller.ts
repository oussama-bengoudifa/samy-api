import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { CurrentUserId } from 'src/decorators/current-user-id.decorator';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Serialize(UserDto)
  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /*   @Serialize(UserDto)
  @Get()
  findAll() {
    return this.usersService.findAll();
  } */

  @UseGuards(AccessTokenGuard)
  @Serialize(UserDto)
  @Get('/me')
  findOne(@CurrentUserId() id: number) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AccessTokenGuard)
  @Serialize(UserDto)
  @Patch('/me')
  update(@CurrentUserId() id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  /*   @Serialize(UserDto)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  } */
}
