import { Controller, Post, Body, Patch, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { SignInDto } from './dto/sign-in.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiTags('Authentication')
  @Post('sign-in')
  async login(@Body() signInDto: SignInDto) {
    return await this.authService.login(signInDto);
  }

  @ApiTags('Authentication')
  @Post('sign-up')
  async create(@Body() signInDto: SignInDto) {
    return await this.authService.create(signInDto);
  }

  @ApiTags('Authentication')
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard())
  @Patch('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return await this.authService.changePassword(changePasswordDto);
  }
}
