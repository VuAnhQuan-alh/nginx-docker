import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from '../models/users.repository';
import { DatabaseAdminModule } from '@libs/common/database/database-admin.module';
import { UserDocument, UserSchema } from '../models/user.schema';

@Module({
  imports: [
    DatabaseAdminModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
