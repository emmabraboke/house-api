import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/module/auth/auth.service';
import { validateToken } from 'src/utils/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
constructor(

    private authService: AuthService){

}
  async use(req: Request, res: Response, next: NextFunction) {
    
    
    const auth = req?.headers?.authorization


    
    if(auth && auth.startsWith("Bearer ")){
    const token = auth.split("Bearer ")[1]
    const claims = validateToken(token)
    const {username} = claims

    const user = await this.authService.getUser(username)
    //@ts-ignore
    req.user = user
    return next();
    }

    if(req?.cookies?.jwt){
        const token = req.cookies.jwt
        const claims = validateToken(token)
        const {username} = claims
        const user = await this.authService.getUser(username)
        console.log(token)
        //@ts-ignore
        req.user = user
        return next()
    }
        throw new UnauthorizedException("provide valid token")
      
  }
}
