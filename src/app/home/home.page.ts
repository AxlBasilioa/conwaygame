import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  alto: number = 30;
  ancho: number = 30;
  public arr: number[][] = [];
  siguientearr: number[][] = [];

  constructor() {}

  ngOnInit() {
    this.arr = this.poblar(this.alto, this.ancho);
    this.iteracion();
  }
  // NECESITO ARREGLAR ESTA FUNCION!
  settearData(x:number, y:number){
    console.log('cambios!');
    if(this.arr[x][y] == 1){
      this.arr[x][y] = 0;
    }else{
      this.arr[x][y] = 1;
    }
  }
  iteracion() {
    setInterval(() => {
      this.contarVecinos();
      this.actualizarEstado();
    }, 500);
  }
  
  poblar(alto: number, ancho: number): number[][] {
    let tabla: number[][] = [];
    for (let i = 0; i < alto; i++) {
      tabla[i] = [];
      for (let j = 0; j < ancho; j++) {
        tabla[i][j] = Math.floor(Math.random() * 2);
        //tabla[i][j] = 0;
      }
    }
    return tabla;
  }

  contarVecinos() {
    this.siguientearr = this.copiarArreglo(this.arr);

    for (let i = 0; i < this.alto; i++) {
      for (let j = 0; j < this.ancho; j++) {
        let vecinos = this.contador(i, j);
        if (this.arr[i][j] == 0 && vecinos == 3) {
          this.siguientearr[i][j] = 1;
        } else if (this.arr[i][j] == 1 && (vecinos < 2 || vecinos > 3)) {
          this.siguientearr[i][j] = 0;
        }
      }
    }
  }

  actualizarEstado() {
    this.arr = this.copiarArreglo(this.siguientearr);
  }

  copiarArreglo(arregloOriginal: number[][]): number[][] {
    let copia: number[][] = [];
    for (let i = 0; i < arregloOriginal.length; i++) {
      copia[i] = [];
      for (let j = 0; j < arregloOriginal[i].length; j++) {
        copia[i][j] = arregloOriginal[i][j];
      }
    }
    return copia;
  }

  contador(x: number, y: number): number {
    let suma = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let primer = (x + i + this.alto) % this.alto;
        let segundo = (y + j + this.ancho) % this.ancho;
        suma += this.arr[primer][segundo];
      }
    }
    suma -= this.arr[x][y];
    return suma;
  }
}
