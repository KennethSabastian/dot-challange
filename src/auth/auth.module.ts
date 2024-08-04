import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [JwtModule.register({
    secret: "ayamgoreng",
    signOptions: {expiresIn: "6h"},
  }),
  UserModule,
  PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy]
})
export class AuthModule {}
