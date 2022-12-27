import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from '@src/auth/local.auth.guards';
import { AuthService } from '@src/auth/auth.service';
import { ApiSecurity } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @ApiSecurity('basic')
  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
