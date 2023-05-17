import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento/pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-pensamentos',
  templateUrl: './criar-pensamentos.component.html',
  styleUrls: ['./criar-pensamentos.component.css']
})
export class CriarPensamentosComponent implements OnInit {



  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder
     ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      conteudo: ['', Validators.compose(
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]+$/), Validators.minLength(3), Validators.maxLength(1000)])],
      autoria: ['', Validators.compose(
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]+$/), Validators.minLength(3), Validators.maxLength(1000)])],
      modelo: ['modelo1'],
      favorito: [false]

  })
}

  criarPensamento()
  {
    console.log(this.formulario.get('autoria')?.errors);
    if(this.formulario.valid){
      this.service.criar(this.formulario.value).subscribe(()=>{
        this.router.navigate(['/listarPensamento']);
      });
    }
    }


  cancelar(){
    this.router.navigate(['/listarPensamento']);
  }

  habilitarBotao(): string{
    if(this.formulario.valid){
      return 'botao'
  } else {
    return 'botao__desabilitado';
  }

}
}
