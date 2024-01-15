import {
  SERVICE_NAME,
  SERVICE_PATTERN,
} from '@libs/common/constant/service.name';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, tap, map } from 'rxjs';

@Injectable()
export class JWTCanAuth implements CanActivate {
  constructor(
    @Inject(SERVICE_NAME.AUTH_SERVICE) private readonly authClient: ClientProxy,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().headers.authorization;

    if (!jwt) return false;

    return this.authClient
      .send(SERVICE_PATTERN.AUTHENTICATION, {
        headers: {
          authorization: jwt,
        },
      })
      .pipe(
        tap((res) => {
          context.switchToHttp().getRequest().user = res;
        }),
        map(() => true),
      );
  }
}
