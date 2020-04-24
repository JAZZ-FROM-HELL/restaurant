import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShoppingCartController } from "./shopping-cart/shopping-cart.controller";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import {GlobalExceptionFilter} from "./common/global-exception.filter";
import {AppLoggerService} from "./common/app-logger.service";
import {LoggingInterceptor} from "./common/logging.interceptor";
import {ContextMiddleware} from "./common/context.middleware";


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
  providers: [AppService, AppLoggerService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    }],
  exports: [AppLoggerService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleware).forRoutes('*');
  }
}
