import {MiddlewareConsumer, Module, NestModule, RequestMethod,} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShoppingCartController } from "./shopping-cart/shopping-cart.controller";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [AuthModule, UsersModule, ItemsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'q1w2e3r4',
      database: 'orm',
      autoLoadEntities: true,
      synchronize: true,
    })
  ],
  controllers: [AppController, ShoppingCartController],
  providers: [AppService],
})
export class AppModule { }
