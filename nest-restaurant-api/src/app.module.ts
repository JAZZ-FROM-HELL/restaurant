import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShoppingCartController } from './shopping-cart/shopping-cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './cats/cats.module';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import {GlobalExceptionFilter} from './common/global-exception.filter';
import {AppLoggerService} from './common/app-logger.service';
import {LoggingInterceptor} from './common/logging.interceptor';
import {ContextMiddleware} from './common/context.middleware';
import {ConfigModule, ConfigService} from '@nestjs/config';

@Module({
  imports: [CatsModule, AuthModule, UsersModule, ItemsModule,
    ConfigModule.forRoot({
      envFilePath: [
        `./config/${process.env.RUN_ENV}.env`,
        `./config/dev.env`,
      ],
      ignoreEnvFile: false,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService:ConfigService) => {
        console.log(
            '\nprocess.env.RUN_ENV', process.env.RUN_ENV,
            '\nDB_HOST:', configService.get<string>('DB_HOST'),
            '\nDB_NAME:', configService.get<string>('DB_NAME'),
        );
        return ({
          type: 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          autoLoadEntities: true,
          synchronize: true,
        });
      },
    }),
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
