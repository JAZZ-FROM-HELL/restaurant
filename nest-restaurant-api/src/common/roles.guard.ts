import {Injectable, CanActivate, ExecutionContext, Inject} from '@nestjs/common';
import {Role} from "../users/role";
import {User} from "../users/user";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private readonly role:Role) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        return request.user.role === this.role;
    }

}