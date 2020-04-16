import {Controller, Request, Get, Post, UseGuards} from '@nestjs/common';
import { AppService } from './app.service';
import {LocalAuthGuard} from "./auth/local-auth.guard";
import {UsersService} from "./users/users.service";
import { AuthService } from './auth/auth.service';
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {User} from "./users/user";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly usersService: UsersService, private authService: AuthService) {}

  /** root / is publicly available */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req):Promise<User> {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req):Promise<User>  {
    return await this.usersService.findOne(req.user.username);
  }

}
