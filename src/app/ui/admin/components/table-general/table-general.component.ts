import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-table-general',
  templateUrl: './table-general.component.html',
  styleUrls: ['./table-general.component.scss']
})
export class TableGeneralComponent implements OnInit {

  @Input() dataSource : any = [];
  @Input() rowTable : any = [];
  @Output() dataTable: EventEmitter<any> = new EventEmitter();
  @Output() showWindowsBool: EventEmitter<boolean> = new EventEmitter();
  @Output() showWindowsDelete: EventEmitter<boolean> = new EventEmitter();


  booleanClick : boolean = false;

  @ViewChild('dt') dt: Table | undefined;

  ngOnInit(): void {
  }

  onRowSelect(event : any) {
    console.log('onRowSelect ', event);
  }

  onRowUnselect(event : any) {
    console.log('onRowUnselect ', event);
  }

  edit(data: any){
    console.log('hola ', data);
    
    this.booleanClick = true;
    this.dataTable.emit(data);
    this.showWindowsBool.emit(this.booleanClick);
  }

  delete(data: any){
    
    this.booleanClick = true;
    this.dataTable.emit(data);
    this.showWindowsDelete.emit(this.booleanClick);
  }

}
