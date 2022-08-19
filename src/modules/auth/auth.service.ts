import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as byCrypt from 'bcrypt';
import { EntityManager, Repository } from 'typeorm';
import { queryGetUserByUsername } from './db-queries';
import { ChangePasswordDto } from './dto/change-password.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Auth } from './entities/auth.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
    private jwtService: JwtService,
    private manager: EntityManager
  ) { }

  async create(createUserDto: SignInDto) {
    let { password, username } = createUserDto;
    let newAuth = new Auth();
    newAuth.username = username;
    newAuth.salt = await byCrypt.genSalt();
    newAuth.password = await this.hashPassword(password, newAuth.salt);
    let auth_data = this.manager.create(Auth, newAuth);
    return await this.manager.save(Auth, auth_data);
  }

  async login(signInDto: SignInDto) {
    let { username, password } = signInDto;
    const [user] = await this.manager.query(queryGetUserByUsername(username));

    if (!user) {
      throw new UnauthorizedException('Invalid Username / Your account is not active now');
    }

    const isPasswordValid = await this.validatePassword(password, user.password, user.salt);
    if (user && isPasswordValid) {
      const { user_id, username } = user;
      return { accessToken: await this.generateToken(user_id, username) };
    } else {
      throw new UnauthorizedException('Invalid Password');
    }
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    let { username, old_password, new_password } = changePasswordDto;
    const [user] = await this.manager.query(queryGetUserByUsername(username));
    if (!user) {
      throw new UnauthorizedException('Invalid Username / Your account is not active now');
    } else {
      const isPasswordValid = await this.validatePassword(old_password, user.password, user.salt);
      if (user && isPasswordValid) {
        const { user_id, username } = user;
        let salt = await byCrypt.genSalt();
        let password = await this.hashPassword(new_password, salt);
        const result = await this.authRepository.update(user_id, { password, salt });
        if (result.affected <= 0) {
          throw new InternalServerErrorException(`Update Failed, Please try again!`);
        } else {
          return await this.generateToken(user_id, username);
        }
      } else {
        throw new UnauthorizedException('Invalid Credentials');
      }
    }
  }

  private async validatePassword(password: string, userPassword: string, userSalt: string): Promise<boolean> {
    const hash = await byCrypt.hash(password, userSalt);
    const isRightPassword = hash === userPassword;
    if (!isRightPassword) {
      throw new UnauthorizedException(`Invalid password, Please try again`);
    }
    return isRightPassword;
  }

  private async generateToken(user_id: string, username: string,) {
    const payload: JwtPayload = { user_id, username };
    const accessToken = await this.jwtService.sign(payload);
    return accessToken;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return byCrypt.hash(password, salt);
  }

  //#endregion
}
