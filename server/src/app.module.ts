import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './feature/user/user.app.module';
import { User } from './entity/user.entity';
import { AuthModule } from './feature/auth/auth.app.module';
import { AdminModule } from './feature/admin/admin.app.module';
import { AccountBook } from './entity/accountBook.entity';
import { AccountBookModule } from './feature/accountBook/accountBook.app.module';
import { SearchModule } from './feature/search/search.app.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, AccountBook],
      synchronize: false, // 개발환경(DB 만들고 false로 변경하기)
      logging: true,
      keepConnectionAlive: true,
    }),
    AuthModule,
    UserModule,
    AdminModule,
    AccountBookModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
