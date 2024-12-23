import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';
import { Auth } from 'src/app/domain/models/auth/aut.model';
import { AuthApiService } from 'src/app/infrastructure/services/auth-api/auth-api.service';
//import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-profile-bar',
  templateUrl: './profile-bar.component.html',
  styleUrls: ['./profile-bar.component.scss'],
})
export class ProfileBarComponent implements OnInit  {
  pageTitle: string = '';
  items!: MenuItem[];
  dataUser: any;
  numberNotification: any;
  globalDataNotification: any = [];
  dataNotification: any = [];
  containerActive = true;
  dataLocal!: Auth;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _authApiService: AuthApiService
    //private _notificationService: NotificationService,
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const childRoute = this.getChild(this.activatedRoute);
        childRoute.data.subscribe((data: { title: string }) => {
          this.pageTitle = data.title;
        });
      });
  }

  ngOnInit(): void {
    this.dataLocal = this._authApiService.getInfoLocal();
    this.loadItems();
  }

  getChild(activatedRoute: ActivatedRoute): any {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }


  clicked(active: boolean) {
    if (active == false && this.containerActive) {
      this.containerActive = !this.containerActive;
    } else if (this.containerActive == false && active == true) {
      this.containerActive = !this.containerActive;
    }

    if (this.containerActive) {
      this.dataNotification = [];
      this.dataNotification = this.globalDataNotification.unread_notifications;
    } else {
      this.dataNotification = [];
      this.dataNotification = this.globalDataNotification.read_notifications;
    }
  }

  getInitialName(name: string){
    return name.toUpperCase().substring(0, 1) ?? "N";
  }

  async loadItems() {
    this.items = [
      {
        items: [
          {
            label: 'Cerrar sesión',
            icon: 'pi pi-power-off',
            command: () => {
              this._authApiService.logout();
            }
          },
        ],
      },
    ];
  }
}
