import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CategoryService } from 'src/app/infrastructure/services/category/category.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {

  categoryId : any ;
  data : any;
  loading : false;

  constructor( private _activateRouter : ActivatedRoute, private _categoryService : CategoryService ) { }

  ngOnInit(): void {
    this._activateRouter.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.categoryId = params.get('id');
          return this._categoryService.getCategoryById(this.categoryId);
        })
      )
      .subscribe((value: any) => {
        this.data = value.data;
        if (value.error) {
          this.loading = false;
          return;
        }
        this.loading = false;
    }
  );
  }

}
