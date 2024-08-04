import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { request } from "express";
import { Observable } from "rxjs";

export class JwtGuard extends AuthGuard("jwt"){
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        console.log(request.headers);
        return super.canActivate(context);
    }
}