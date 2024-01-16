import { DatabaseAdminModule } from '@libs/common/database/database-admin.module';
import { Module } from '@nestjs/common';

import { UserRepository } from '../models/user.repository';
import { UserDocument, UserSchema } from '../models/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    DatabaseAdminModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService],
})
export class UsersModule {}
