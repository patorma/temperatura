import { Component } from '@angular/core';
import { CurrentWeatherService } from './services/current-weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'weather';
  constructor(private weatherService:CurrentWeatherService){}

  ngOnInit(){
    //se ejecuta cuando el componente esta listo
    // el weather$ observable que recibe los mismo datos de la peticion htto
    this.weatherService.weather$.subscribe(console.log)
    
  }
}
