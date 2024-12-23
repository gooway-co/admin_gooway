import { Component, OnInit } from '@angular/core';
import { AuthApiService } from 'src/app/infrastructure/services/auth-api/auth-api.service';
import { Auth } from 'src/app/domain/models/auth/aut.model';
import { PlaceService } from 'src/app/infrastructure/services/place/place-api.service';
import { CategoryService } from 'src/app/infrastructure/services/category/category.service';
import { Place } from 'src/app/domain/models/place/place.interface';
import { Category } from 'src/app/domain/models/category/category.model';
import { PartnersService } from 'src/app/infrastructure/services/partners/partners-api.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dataUser: any[] = [];
  dataTeacher: any[] = [];
  dataGrades: any[] = [];
  chartOptions: any;
  dataGraph: any;
  dataLocal!: Auth;
  places: Place[] = [];
  categories: Category[] = [];
  partners: any[] = [];


  constructor(
    private placeService: PlaceService,
    private _authApiService: AuthApiService,
    private categoryService: CategoryService,
    private partnersService: PartnersService,
    
  ) { }

  ngOnInit(): void {

    //this.veryfyToken();
    //this.dataLocal = this._authApiService.getInfoLocal();
    this.getAllCategoryByCompany();
    this.getAllPlaceByCompany();
    this.getAllPartnersByCompany();
 
  }


  getAllCategoryByCompany() {
    this.categoryService.getCategories().subscribe((value) => {
      if ((value.status = 200)) {
        this.categories = value.data;
      }
    });
  }

  getAllPlaceByCompany() {
    this.placeService.getPlacesByCompany().subscribe((value) => {
      if ((value.status = 200)) {
        this.places = value.data;
      }
    });
  }

  getAllPartnersByCompany() {
    this.partnersService.getPartnersByCompany().subscribe((value) => {
      if ((value.status = 200)) {
        this.partners = value.data;
      }
    });
  }

  // veryfyToken() {
  //   this._authApiService.protected().subscribe((value) => {
  //     if ((value.status = 200)) {
  //       this.partners = value.data;
  //     }
  //   });
  // }

}
