import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable, map } from 'rxjs';
import { TrilhaService } from '../../services/trilha.service';
import { Trilha } from '../../models/trilha.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  private trilhaService = inject(TrilhaService);

  conteudosDestaque$!: Observable<any[]>;
  loading = true;

  ngOnInit(): void {
    this.carregarDestaques();
  }

  carregarDestaques() {
    this.conteudosDestaque$ = this.trilhaService.getAll().pipe(
      map(trilhas => trilhas.map(t => ({
        id: t.id,
        titulo: t.nome,
        categoria: t.dificuldade || 'Geral',
        cor: 'azul',
        icone: '🌿'
      })))
    );
    this.loading = false;
  }

  moverCarrossel(element: HTMLElement, direcao: number) {
    const scrollAmount = 300 * direcao;
    element.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}