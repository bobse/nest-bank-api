import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '@src/auth/jwt.auth.guards';
import {
  ProfileHttpResponse,
  UserViewModel,
} from './view_model/user.viewmodel';
import { ApiCreatedResponse, ApiProperty, ApiSecurity } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
  }

  @ApiSecurity('bearer')
  @ApiCreatedResponse({
    description: 'User profile.',
    type: ProfileHttpResponse,
  })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req): ProfileHttpResponse {
    return UserViewModel.toHTTP(req.user);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
