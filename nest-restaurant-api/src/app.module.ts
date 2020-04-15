import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsController } from "./items/items.controller";
import { ItemsService } from './items/items.service';
import { ShoppingCartController } from "./shopping-cart/shopping-cart.controller";
//import { AuthenticationMiddleware } from './common/authentication.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
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
