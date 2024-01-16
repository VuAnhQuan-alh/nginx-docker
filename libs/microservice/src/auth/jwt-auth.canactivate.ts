import { catchError, map, Observable, tap } from 'rxjs';

import {
  SERVICE_NAME,
  SERVICE_PATTERN,
} from '@libs/common/constant/service.name';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class JWTCanAuth implements CanActivate {
  private readonly logger = new Logger(JWTCanAuth.name);

  constructor(
    @Inject(SERVICE_NAME.AUTH_SERVICE) private readonly authClient: ClientProxy,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().headers.authorization;
    if (!jwt) throw new UnauthorizedException();

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    return this.authClient
      .send(SERVICE_PATTERN.AUTHENTICATION, {
        headers: {
          authorization: jwt,
        },
      })
      .pipe(
        tap((res) => {
          if (roles) {
            for (const role of roles) {
              if (!res.roles.includes(role)) {
                throw new ForbiddenException();
              }
            }
          }
          context.switchToHttp().getRequest().user = res;
        }),
        map(() => true),
        catchError((error) => {
          this.logger.error(error);
          if (error.message === 'Forbidden') {
            throw new ForbiddenException();
          } else {
            throw new UnauthorizedException();
          }
        }),
      );
  }
}
