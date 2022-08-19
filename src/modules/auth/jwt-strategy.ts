import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(Auth) private authRepository: Repository<Auth>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '8R9SBUCVDXFYGZJ3K4M6P7Q8SATBUDWEXFZH2J3M5N6P7R9SATCVDWEYGZ',
    });
  }

  async validate(payload: JwtPayload): Promise<Auth> {
    const { user_id } = payload;
    const user = await this.authRepository.findOne({ where: { user_id } });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
