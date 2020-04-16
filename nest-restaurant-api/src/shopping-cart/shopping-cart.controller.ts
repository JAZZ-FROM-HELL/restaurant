import {Post, Controller, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RolesGuard} from "../common/roles.guard";
import {Role} from "../users/role";

@Controller('shopping-cart')
export class ShoppingCartController {

    @Post()
    @UseGuards(JwtAuthGuard, new RolesGuard(Role.ADMIN))
    async addItem() {
        return 'Added to shopping cart - Admins only!';
    }

}