import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { catchError, map, of, switchMap } from "rxjs";
import { TrilhaService } from "../../services/trilha.service";

@Component({
  selector: "app-detalhe-conteudo",
  imports: [AsyncPipe, RouterLink],
  templateUrl: "./detalhe-conteudo.html",
  styleUrl: "./detalhe-conteudo.css",
})
export class DetalheConteudo {
  private route = inject(ActivatedRoute);
  private trilhaService = inject(TrilhaService);

  readonly trilha$ = this.route.paramMap.pipe(
    map((parametros) => parametros.get("id") ?? ""),
    switchMap((id) =>
      this.trilhaService.getById(id).pipe(
        map((trilha) => (trilha && trilha.nome ? trilha : null)),
        catchError(() => of(null)),
      ),
    ),
  );
}