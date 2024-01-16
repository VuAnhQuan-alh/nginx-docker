import { Reflector } from '@nestjs/core';

export const RolesOfAdmin = Reflector.createDecorator<string[]>();
