import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsController } from "./items/items.controller";
import { ItemsService } from './items/items.service';
import { ShoppingCartController } from "./shopping-cart/shopping-cart.controller";
import { TypeOrmModule } from '@nestjs/typeorm';

import { APP_GUARD } from '@nestjs/core';

//import { AuthenticationMiddleware } from './common/authentication.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesGuard} from "./common/roles.guard";

@Module({
  imports: [AuthModule, UsersModule,
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
  controllers: [AppController, ItemsController, ShoppingCartController],
  providers: [AppService, ItemsService],
})
export class AppModule {

  /*public configure(consumer: MiddlewareConsumer) {
    consumer
        .apply(AuthenticationMiddleware)
        .forRoutes(
            { path: '/items', method: RequestMethod.POST },
            { path: '/shopping-cart', method: RequestMethod.POST },
        );
  }*/

}
