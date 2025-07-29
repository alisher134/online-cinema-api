import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '@prisma/client';

import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) return true;

    const request = context.switchToHttp().getRequest<{ user: User }>();
    const user = request.user;

    const hasRoles = roles.includes(user.role);

    if (!user || !hasRoles) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    return true;
  }
}
