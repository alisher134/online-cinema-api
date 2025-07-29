import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';

import { JwtGuard } from '../guards';
import { RolesGuard } from '../guards/roles.guards';

import { Roles } from './roles.decorator';

export const Auth = (...roles: UserRole[]) => {
  if (roles.length > 0) {
    return applyDecorators(Roles(...roles), UseGuards(JwtGuard, RolesGuard));
  }

  return applyDecorators(UseGuards(JwtGuard));
};
