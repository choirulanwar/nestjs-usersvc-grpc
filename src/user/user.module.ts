import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Query } from 'mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema, UserDocument } from './schemas/user.schema';
import bcrypt from 'bcryptjs';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;

          schema.pre<UserDocument>('save', async function (next) {
            if (this?.password) {
              const salt = await bcrypt.genSalt(6);
              this.password = await bcrypt.hash(this.password, salt);
            }

            return next();
          });

          schema.pre<Query<User, UserDocument>>(
            'findByIdAndUpdate',
            async function (next) {
              const _update = <UserDocument>this.getUpdate();

              if (_update?.password) {
                const salt = await bcrypt.genSalt(6);
                const password = await bcrypt.hash(_update.password, salt);

                _update.password = password;
              }

              return next();
            },
          );

          return schema;
        },
      },
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
