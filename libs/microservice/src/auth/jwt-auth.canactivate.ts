import { catchError, map, Observable, tap } from 'rxjs';

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
import { ClientKafka } from '@nestjs/microservices';
import { ServiceMessage, ServiceName } from '../utils/service';

@Injectable()
export class JWTCanAuth implements CanActivate {
  private readonly logger = new Logger(JWTCanAuth.name);

  constructor(
    @Inject(ServiceName.ADMIN) private readonly authClient: ClientKafka,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().headers.authorization;
    if (!jwt) throw new UnauthorizedException();

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    return this.authClient
      .send(ServiceMessage.AUTHENTICATION, {
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
