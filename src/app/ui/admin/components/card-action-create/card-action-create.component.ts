import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-action-create',
  templateUrl: './card-action-create.component.html',
  styleUrls: ['./card-action-create.component.scss']
})
export class CardActionCreateComponent implements OnInit {

  @Input() image: string = "";
  @Input() title: string = "";
  @Input() description : string = "";
  @Input() textButton : string = "";
  @Output() showWindowsBool: EventEmitter<boolean> = new EventEmitter();
  booleanClick: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  showWindows() {
    this.booleanClick = true;
    this.showWindowsBool.emit(this.booleanClick);
  }
}
