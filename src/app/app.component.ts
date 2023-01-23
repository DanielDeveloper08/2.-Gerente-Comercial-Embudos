import { Component } from '@angular/core';
import { dataAsesorI, paramsToSend, ResponseCurrentUserI } from './interfaces/usuario.interface';
import { GraficosService } from './services/graficos.service';
import { isEmpty } from "lodash";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private graficosService: GraficosService) { }
  nombreAsesor: string = "";
  chartOptions: any[] = [];
  loading: boolean = true;
  loadingFunnels:number[] = [1,2,3,4];



  currentUser: ResponseCurrentUserI = {} as ResponseCurrentUserI;
  dataResponse !: dataAsesorI[];

  ngOnInit(): void {
    if (localStorage.getItem("Usuario") != null) {
      this.currentUser = JSON.parse(localStorage.getItem("Usuario")!);
      if (!isEmpty(this.currentUser)) {
        this.getData();
      }
    }
  }

  getData() {
    let params: paramsToSend = {
      fechaInicio: "2019-01-20",
      fechaFinal: "2023-04-20",
      idUsuario: this.currentUser.users[0].id
    }

    this.graficosService.getAsesores(params).subscribe(
      (data) => {
        this.dataResponse = data.data as unknown as dataAsesorI[];
        
        if(this.dataResponse){
          this.loading=false;
        }

        for (const asesor of this.dataResponse) {
          console.log(asesor)
          this.chartOptions = [...this.chartOptions, {
            animationEnabled: true,

            data: [{
              type: "funnel",
              indexLabel: "{name}: {y}",
              valueRepresents: "area",
              dataPoints:
                asesor.cabecera.keys.map(key => {
                  return { y: asesor.cabecera.values[key], name: key }
                })
            }],
            nombreAsesor: asesor.cabecera.nameUsuario,
            mostrar: asesor.detalle.length
          }]
        }

      }
    );
  }





}
