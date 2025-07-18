import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Categoria } from '../../categorias/categoria';
import { CategoriasService } from '../../categorias/categorias.service';
import { LugarService } from '../lugar.service';

@Component({
  selector: 'app-lugar',
  standalone: false,
  templateUrl: './lugar.component.html',
  styleUrl: './lugar.component.scss'
})
export class LugarComponent implements OnInit {

  camposForm: FormGroup;
  categorias: Categoria[] = [];

  constructor(
    private categoriaService: CategoriasService,
    private service: LugarService
  ) {
    this.camposForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      categoria: new FormControl('', Validators.required),
      localizacao: new FormControl('', [Validators.required]),
      urlFoto: new FormControl('', Validators.required),
      avaliacao: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.categoriaService.obterCategorias().subscribe({
      next:(listarCategorias) => this.categorias = listarCategorias
    });

  }

  cadastrarLugar(){
    this.camposForm.markAllAsTouched();

    if (this.camposForm.valid) {
      this.service.salvarLugar(this.camposForm.value).subscribe({
        next: (lugar) => {
          console.log('Lugar cadastrado com sucesso:', lugar);
          this.camposForm.reset();
        }
        , error: (error) => {
          console.error('Erro ao cadastrar lugar:', error);     
        }
      });
    }
  }

  isCampoInvalidos(nomeCampo: string): boolean {
    const campo = this.camposForm.get(nomeCampo);
    return campo?.invalid && campo?.errors?.['required'] && campo?.touched;
  }

}
