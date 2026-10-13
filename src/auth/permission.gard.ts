import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permit } from 'permitio';

export interface RequiredPermission {
  action: string;
  resource: string;
}

export const PERMISSION_KEY = 'permission';
export const RequirePermission = (action: string, resource: string) =>
  SetMetadata(PERMISSION_KEY, { action, resource } as RequiredPermission);

@Injectable()
export class PermissionsGuard implements CanActivate {
  private readonly permit = new Permit({
    pdp: 'https://cloudpdp.api.permit.io',
    token: process.env.PERMIT_IO_TOKEN,
  });

  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required = this.reflector.getAllAndOverride<RequiredPermission>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!required) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Not authenticated.');
    }

    const userHasPermission = await this.permit.check(
      user.id,
      required.action,
      required.resource,
    );

    if (!userHasPermission) {
      throw new ForbiddenException('You do not have the necessary permissions.');
    }

    return true;
  }
}