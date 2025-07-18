import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categoria } from './categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) { }

  salvarCategorias(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>('http://localhost:3000/categorias', categoria);
  }

  obterCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>('http://localhost:3000/categorias');
  }
}
