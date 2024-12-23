import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-campaign-type',
  templateUrl: './campaign-type.component.html',
  styleUrls: ['./campaign-type.component.scss']
})
export class CampaignTypeComponent implements OnInit {

  @Output() onBooleanSelectedOut: EventEmitter<boolean> = new EventEmitter();
  @Output() onHideWindowsOut: EventEmitter<boolean> = new EventEmitter();
  @Input() displayModal: boolean = false; 
  selectedValue: string = "";
  booleanClick: boolean = true;
  itemCurrent: string = "";
  val1: string = "";
  itemOptionSelected: any = [];
  typesCampaignArray: any = [
    {
      text: 'Reconocimiento',
      icon: 'fa fa-duotone fa-bullhorn',
      tooltip: 'Dashboard',
      id: "recognition",
      image : "../../../../../assets/img/reconocimiento.png",
      description: 'Muestra tus anuncios a las personas con más probabilidades de recordarlos.',
      ideal: [
        {
          text: "Alcance",
          tooltip: "Para llegar al máximo número de personas"
        },
        {
          text: "Reconocimiento de marca",
          tooltip: "Para llegar al máximo número de personas"
        },
        {
          text: "Reproducían de video",
          tooltip: "Para llegar al máximo número de personas"
        },
        {
          text: "Posicionamiento",
          tooltip: "Para llegar al máximo número de personas"
        }

      ]
    },
    {
      text: 'Tráfico',
      icon: 'fa-sharp fa-solid fa-earth-americas',
      tooltip: 'Dashboard',
      description: 'Dirige a las personas a un destino, como tu sitio web, app o evento de Facebook.',
      id: "traffic",
      image : "../../../../../assets/img/traffic.png",
      ideal: [
        {
          text: "Click en enlace",
          tooltip: "Para llegar al máximo número de personas"
        },
        {
          text: "Visita a pagina web de destino",
          tooltip: "Para llegar al máximo número de personas"
        }
      ]
    },
    {
      text: 'Interacción',
      icon: 'fa fa-message',
      tooltip: 'Dashboard',
      description: 'Consigue más mensajes, reproducciones de video, interacciones con tus publicaciones, Me gusta de la página o respuestas a eventos.',
      id: "interaction",
      image : "../../../../../assets/img/interaction.png",
      ideal: [
        {
          text: "Click en enlace",
          tooltip: "Para llegar al máximo número de personas"
        },
        {
          text: "Visita a pagina web de destino",
          tooltip: "Para llegar al máximo número de personas"
        }
      ]
    },
  ];
  options: any;
  itemOptionAdsForm!:  FormGroup;
  date3: any = new Date();
  date8: any = new Date();


  constructor(
    private formBuilder: FormBuilder

  ) { }



  ngOnInit(): void {
    this.itemOptionSelected = this.typesCampaignArray[0];
    this.itemOptionAdsForm = this.formBuilder.group({
      recognition: [''],
      traffic: [''],
      interaction: ['']
     
    });

    this.options = {
      center: {lat: 36.890257, lng: 30.707417},
      zoom: 12
  };
  }

  elementoActivo: any;

  activateCampaign(data: any){
    
    this.onBooleanSelectedOut.emit(this.booleanClick);
    this.itemCurrent = data.id;
    this.val1 = data.id;
    this.itemOptionSelected = data;
  }

  onClickButton(index: any, item: any) {
    //this.booleanClick = !this.booleanClick;
    
  }

  hideWindow(){
    this.displayModal = false;
    this.onHideWindowsOut.emit( this.displayModal);
  }

}
