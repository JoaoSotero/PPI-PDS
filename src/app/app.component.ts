import value from '*.json';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { PartialObserver } from 'rxjs/Observer';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Movie, SearchResult, TmdbApi } from 'tmdb-typescript-api';

import { Filmes } from './filmes.service';


@Component({
  selector: 'app-root',
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  api: TmdbApi = new TmdbApi('0f1fa939649718d383c52b555c0712ce'); //chave da API

  observer: PartialObserver<string>;
  searchResult$: Observable<SearchResult>;
  private _subject: Subject<string>;

  emptyResult: SearchResult<Movie> = {
    page: 0,
    results: [],
    total_results: 0,
    total_pages: 0
  };

  error = '';
  loading = false;

  constructor(private filmes: Filmes) {}

  ngOnInit(): void {
    this._subject = new Subject<string>();
    this.observer = this._subject;
    this.searchResult$ = this._subject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(_ => {
        this.error = null;
        this.loading = true;
      }),
      switchMap(query => {
        if (query && query !== '') {
          return this.api.search.movies(query);
        } else {
          return of(this.emptyResult);
        }
      }),
      map(searchResult => ({
        ...searchResult,
        results: searchResult.results.map(movie => this.filmes.critic(movie))
      })),
      tap(_ => (this.loading = false))
    );

  }

  rating_value = 0

  ratings = [{
    id: 4, name: '0 - 4' },
  {
    id: 7, name: '5 - 7' },
  {
    id: 10, name: '8 - 10'},
  ];

  onChange(deviceValue) {
    this.rating_value = deviceValue;
  }

}
