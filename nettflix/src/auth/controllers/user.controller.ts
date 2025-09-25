import { Body, Controller, Post } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { UserSignDto } from 'src/auth/dtos/user-sign.dto';
import { UserService } from 'src/auth/services/user.service';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post('signup')
  signUp(@Body() dto: UserSignDto) {
    return this.userService.signUp(dto);
  }

  @IsPublic()
  @Post('signin')
  signIn(@Body() dto: UserSignDto) {
    return this.userService.signIn(dto);
  }
}
