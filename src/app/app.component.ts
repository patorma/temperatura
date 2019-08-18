import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'weather';
  constructor(){}

  ngOnInit(){
    //se ejecuta cuando el componente esta listo
    // el weather$ observable que recibe los mismo datos de la peticion htto
   
    
  }
}
