import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';


@Injectable({ providedIn: 'root' })
export class AuthService {

  apiURL: string = 'http://localhost:8081/users';
  token!: string;
  loggedUser!: string;
  roles!: string[];
  isloggedIn = false;
  private helper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) { }

  login(user: User): Observable<any> {
    return this.http.post<User>(this.apiURL + '/login', user, { observe: 'response' });
  }

  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt);
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  }

  decodeJWT() {
    if (this.token == undefined)
      return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.roles = decodedToken.roles;
    this.loggedUser = decodedToken.sub;
  }

  loadToken() {
    this.token = localStorage.getItem('jwt')!;
    this.decodeJWT();
  }

  getToken(): string {
    return this.token;
  }

  isAdmin(): Boolean {
    if (!this.roles)
      return false;
    return this.roles.indexOf('ADMIN') >= 0;
  }

  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token = undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  isTokenExpired(): Boolean {
    return this.helper.isTokenExpired(this.token);
  }

  registerUser(user: User) {
    return this.http.post<User>(this.apiURL + '/register', user,
      { observe: 'response' });
  }
  public regitredUser: User = new User();
  setRegistredUser(user: User) {
    this.regitredUser = user;
  }
  getRegistredUser() {
    return this.regitredUser;
  }
  validateEmail(code: string) {
    return this.http.get<User>(this.apiURL + '/verifyEmail/' + code);
  }
}
