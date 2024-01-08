import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PAGE_SIZE } from '../constant';

interface Response {
  data: unknown;
  meta: Meta | object;
}
interface Meta {
  page: number;
  size: number;
  total: number;
}
type BodyRes = {
  data: unknown;
  message: string;
  total?: number;
};

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response> {
    let meta: Meta | object;

    return next.handle().pipe(
      map((data: BodyRes) => {
        const query = context.switchToHttp().getRequest().query;

        if (data.data instanceof Array) {
          meta = {
            page: +query.page || 1,
            size: +query.size || PAGE_SIZE,
            total: data.total,
          };
        } else {
          meta = {};
        }

        return { data: data.data, message: data.message, meta };
      }),
    );
  }
}
