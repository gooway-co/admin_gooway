import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-flyer',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor() { }
  booleanClick: boolean = true;
  headerTopBoolean: boolean = false;
  valueScroll : number = 0;
  

  ngOnInit(): void {
  }

}
