import { Module, } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShoppingCartController } from "./shopping-cart/shopping-cart.controller";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';

//import { APP_GUARD } from '@nestjs/core';

//import { AuthenticationMiddleware } from './common/authentication.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
//import { RolesGuard} from "./common/roles.guard";

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
