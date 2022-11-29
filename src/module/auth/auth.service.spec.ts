import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { generateHash, validatePassword } from '../../utils/passwords';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { Role } from './enum/role.enum';


const mockAuthRepository = () => ({
  createUser: jest.fn(),
  signIn: jest.fn()
})
describe('AuthService', () => {
  let authService: AuthService
  let authRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,
        { provide: AuthRepository, useFactory: mockAuthRepository }],
    }).compile();

    authService = await module.get(AuthService)
    authRepository = await module.get(AuthRepository)


  });

  describe('signup and login',  () => {

    const mock = {
      username: 'emmaspi',
      password: "djjcpdjocdojod",
      role: Role.admin
    }
   

    it('sign up', async () => {

      let hash = await generateHash(mock.password)
      let isValid = await validatePassword(mock.password, hash)

      expect(isValid).toBe(true)
      mock.password = hash
      authRepository.createUser.mockResolvedValue(mock)
      const result = await authService.signUp(mock)
      expect(result).toEqual(mock)
    })

    it('login in', async()=>{
      let res: Response
      const mockLogin = {username: mock.username, password: mock.password}
      authRepository.signIn.mockResolvedValue(mockLogin,res)
      const result = await authService.signIn(mock,res)
      expect(result).toEqual(mock)
    })
  })


});
