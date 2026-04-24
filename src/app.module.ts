import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './app/config';
import { AuthModule } from './app/module/auth/auth.module';
import { UserModule } from './app/module/user/user.module';
import { RedisModule } from './app/module/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(config.mongoUri as string),
    AuthModule,
    UserModule,
    RedisModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
