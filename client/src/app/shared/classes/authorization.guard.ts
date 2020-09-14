import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {AuthorizationService} from "../services/authorization.service";

@Injectable({
  providedIn: "root"
})

export class AuthorizationGuard implements CanActivate, CanActivateChild {

  constructor(private authorizationService: AuthorizationService,
              private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authorizationService.isAuthenticated()) {
      return of(true);
    } else {
      this.router.navigate(['login'], {
        queryParams: {
          notLogin: true
        }
      });
      return of(false);
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }

}
