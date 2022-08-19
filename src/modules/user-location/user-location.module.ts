import { Module } from '@nestjs/common';
import { UserLocationService } from './user-location.service';
import { UserLocationController } from './user-location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLocation } from './entities/user-location.entity';
import { AuthModule } from 'src/modules/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserLocation]), AuthModule],
  controllers: [UserLocationController],
  providers: [UserLocationService],
})
export class UserLocationModule {}
