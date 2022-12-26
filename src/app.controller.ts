import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from '@src/auth/local.auth.guards';
import { AuthService } from '@src/auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
