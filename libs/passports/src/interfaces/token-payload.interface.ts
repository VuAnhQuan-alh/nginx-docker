import { TypeRoles } from '@libs/common/constant/enum.fields';

export interface ITokenPayload {
  userId: string;
  roles: TypeRoles[];
}
