import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriasService } from '../categorias.service';

@Component({
  selector: 'app-categorias',
  standalone: false,
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss',
})
export class CategoriasComponent {
  camposForm: FormGroup;

  constructor(private service: CategoriasService) {
    this.camposForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
    });
  }

  salvar() {
    this.camposForm.markAllAsTouched();
    if (this.camposForm.valid) {
      this.service.salvarCategorias(this.camposForm.value).subscribe({
        next: (categoria) => {
          console.log('Categoria salva com sucesso:', categoria);
          this.camposForm.reset();
        },
        error: (error) => {
          console.error('Erro ao salvar categoria:', error);
        },
      });
    }
    console.log('Valores do formulário:', this.camposForm.value);
  }

  isCampoInvalidos(nomeCampo: string): boolean {
    const campo = this.camposForm.get(nomeCampo);
    return campo?.invalid && campo?.errors?.['required'] && campo?.touched;
  }
}
