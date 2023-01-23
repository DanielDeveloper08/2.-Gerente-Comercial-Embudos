import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralResponse, paramsToSend, ResponseDataAsesor } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class GraficosService {
  urlBase : string = "https://c9c7-186-70-98-172.sa.ngrok.io/api/tratos";

  constructor(private _http: HttpClient) { }


  getAsesores(params: paramsToSend): Observable<GeneralResponse<ResponseDataAsesor>>{
    const headers = new HttpHeaders()
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        .set('Access-Control-Allow-Headers', 'Content-Type')
        .set('ngrok-skip-browser-warning', 'any');
    let queryParamas = "?";
    params?.fechaInicio ? (queryParamas += `fechaInicio=${params?.fechaInicio}&`) : null;
    params?.fechaFinal ? (queryParamas += `fechaFinal=${params?.fechaFinal}&`) : null;
    params?.idUsuario ? (queryParamas += `idUsuario=${params?.idUsuario}`) : null;

    return this._http.get<GeneralResponse<ResponseDataAsesor>>
        (`${this.urlBase}/asesores${queryParamas}`, { headers: headers });
  }

 

  
}
