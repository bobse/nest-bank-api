import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@src/application/users/entities/user.entity';
import { UsersService } from '@src/application/users/users.service';
import { UsersModule } from '../application/users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

// describe('validateUser', () => {
//   let service: AuthService;
//   let userService: UsersService;

//   beforeEach(async () => {
//     const moduleRef: TestingModule = await Test.createTestingModule({
//       imports: [
//         UsersModule,
//         PassportModule,
//         JwtModule.register({
//           secret: process.env.JWT_SECRET,
//           signOptions: { expiresIn: '60s' },
//         }),
//       ],
//       providers: [AuthService, LocalStrategy, JwtStrategy, UsersService],
//     }).compile();

//     service = moduleRef.get<AuthService>(AuthService);
//     userService = moduleRef.get<UsersService>(UsersService);
//   });

//   it('should return a user object when credentials are valid', async () => {
//     // insert user into Repository
//     const res = await service.validateUser('test@test.com', 'password');
//     jest.spyOn(userService, 'findOneByEmail').mockImplementation(
//       async () =>
//         await new User({
//           id: 3,
//           email: 'test@test.com',
//           name: 'test',
//           password: 'password',
//         }),
//     );
//     expect(res.id).toEqual(3);
//   });
// });

describe('validateLogin', () => {
  let service: AuthService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy],
    }).compile();

    service = moduleRef.get<AuthService>(AuthService);
  });

  it('should return JWT object when credentials are valid', async () => {
    const res = service.login({ email: 'test@test.com', id: 3 });
    expect(res.access_token).toBeDefined();
  });
});
