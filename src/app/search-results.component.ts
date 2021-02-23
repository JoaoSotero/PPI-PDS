import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SearchResult } from 'tmdb-typescript-api';


@Component({
  selector: 'app-search-results',
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.css"]
})
export class SearchResultsComponent implements OnChanges {
  @Input() searchResult: SearchResult<MovieFilmesed>;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.searchResult) {
      this.searchResult.results.forEach(movie => {
        (movie.poster_path = this.getPosterUrl(movie.poster_path));
      });
    }
  }

  getPosterUrl(poster: string) {
    return poster ? `https://image.tmdb.org/t/p/w92${poster}` : null;
  }
}
