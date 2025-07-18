import { Component, OnInit } from '@angular/core';
import { Lugar } from '../../lugares/lugar';
import { Categoria } from '../../categorias/categoria';
import { LugarService } from '../../lugares/lugar.service';
import { CategoriasService } from '../../categorias/categorias.service';

@Component({
  selector: 'app-galeria',
  standalone: false,
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.scss'
})
export class GaleriaComponent implements OnInit {

  lugares: Lugar[] = [];
  categoriasFiltro: Categoria[] = [];
  nomeFiltro: string = '';
  categoriaFiltro: string = '';

  constructor(
    private lugarService: LugarService,
    private categoriaService: CategoriasService
  ) { }

  ngOnInit(): void {
    this.categoriaService.obterCategorias()
    .subscribe(categorias => this.categoriasFiltro = categorias);
    this.lugarService.obterTodos()
    
    this.lugarService.obterTodos()
    .subscribe(lugaresResposta => this.lugares = lugaresResposta);
  }

  getTotalEstrelas(lugar: Lugar): string {
    return '★'.repeat(lugar.avaliacao || 0) + '☆'.repeat(5 - (lugar.avaliacao || 0));
  }

  filtar(){
    this.lugarService.filtrar(this.nomeFiltro, this.categoriaFiltro)
      .subscribe(resultado => this.lugares = resultado);
  }
}
