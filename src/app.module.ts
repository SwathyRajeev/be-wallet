import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './common/config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { DbSeederService } from './common/db-seeder/db-seeder.service';
import { UserLocationModule } from './modules/user-location/user-location.module';
import { UserTransactionModule } from './modules/user-wallet/user-transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AuthModule,
    UserLocationModule,
    UserTransactionModule
  ],
  controllers: [],
  providers: [DbSeederService],
})
export class AppModule { }
