import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lugar } from './lugar';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LugarService {

  apiUrl:string = environment.apiUrl + '/lugares';

  constructor( private http: HttpClient) { }

  salvarLugar(lugar: Lugar): Observable<Lugar> {
    return this.http.post<Lugar>(this.apiUrl, lugar);
  }

  obterTodos(): Observable<Lugar[]> {
    return this.http.get<Lugar[]>(this.apiUrl);
  }

filtrar(nome: string, categoria: string): Observable<Lugar[]> {
  let parametros = new HttpParams()
  if (nome) {
   parametros = parametros.set('nome_like', nome);
  }
  if (categoria) {
   parametros = parametros.set('categoria', categoria);
  }

    return this.http.get<Lugar[]>(`http://localhost:3000/lugares`,{
      params: parametros
    });
  }
}
