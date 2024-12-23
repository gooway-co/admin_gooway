import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthApiService } from './infrastructure/services/auth-api/auth-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tecni Admin School';
  isLoggedIn$: Observable<boolean> | undefined;

  constructor(
    private _authService: AuthApiService,
  ){}

  ngOnInit(): void {
    this.isLoggedIn$ = this._authService.isLoggedIn;

  }

}
