import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { jwtToken } from "./model/jwt-token.model";
import { AuthService } from "./service/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public token$ = this.authService.token$;
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: jwtToken = this.authService.token$.value;
    if (!token.isAuthenticated) {
      // Retourne la requête d'origine sans modifications
      return next.handle(req);
    }
    // Retourne une copie de la requête d'origine, contenant en plus un token d'authentification
    const updateReq = req.clone({
      headers: req.headers.set('Authorization', "bearer " + token.token),
    });
    return next.handle(updateReq);
  }
}
