import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Injectable({
  providedIn: "root",
})
export class AtelierFinancierGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const allowedRoles = ["responsable_atelier", "responsable_financier"];
    const hasAccess = allowedRoles.some((role) =>
      this.authService.hasRole(role)
    );

    if (hasAccess) {
      return true;
    }

    this.router.navigate(["/"]);
    return false;
  }
}
