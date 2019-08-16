import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject,Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Coords } from 'src/structures/coords.structure';
import { map } from 'rxjs/operators';
import { Weather } from 'src/structures/weather.structure';




@Injectable({
  providedIn: 'root'
})
export class CurrentWeatherService {
  public weatherSubject: Subject<any> = new Subject<any>();
  //se va a declarar un observable , es decir una fuente a la cual me puedo subscribir 
  //para recibir una informacion
  //es un string de dato y nos podemos subscribir
  //el observable weather$ va a recibir su informacion o va a ser el sujeto
  //pero actuando como un observable asObservable
  public weather$: Observable<any> = this.weatherSubject.asObservable();

  endpoint: string = 'https://api.openweathermap.org/data/2.5/weather'

  //se inyecta en el constructor
  constructor(private http:HttpClient) {
    //se pasa como argumentos todas las operaciones que queramos que se ejecuten sobre el string de la informacion
    this.weather$ = this.weatherSubject.asObservable().pipe(
      //lee que cuando haya nuevos datos en el observable estos se pasan por la funcion map
     
      map((data:any)=>{
        let mainWeather = data.weather[0]
        let weather: Weather = {
        //id: data.weather.id,
        name:data.name,
        cod: data.cod,
        temp:data.main.temp,
        ...mainWeather//agarra todas las propiedades y las combina con este objeto
      }
        return weather;
    })
    )
    this.get({
      lat:-33.448891,
      lon:-70.669266
    });
   }
  get(coords:Coords){
    //un observable es una manera de manejar datos que sedscargan de manera asincrona y
    //para recibir la informacion que viene del observable hay que suscribirse a el
    //retorna un observable el metodo
    //le decimos a nuestro sujeto que se suscriba a los datos que provengan de la peticion
    //http, el resultado de la peticion es un observable
    //en este caso el sujeto hace las veces de un observador se esta subscribiendo 
    // a un observable para recibir informacion 
    let args:string = `?lat=${coords.lat}&lon=${coords.lon}&APPID=${environment.key}&units=metric`
    //se puede decir que la url final es
    let url = this.endpoint + args

    if(isDevMode()){
      // si 1 es verdadero (estamos en desarrollo)
      url = 'assets/weather.json'
     
    }
    //este 2 no se ejecuta
    this.http.get(url).subscribe(this.weatherSubject);
    // y nosotros le proveemos de un observer 
   /*  observable.subscribe() */
  /*  setTimeout(()=>{
    this.weatherSubject.next({})
   }) */
  }
  //Subject 
}
 