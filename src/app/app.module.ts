import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SplitStringPipe } from './split-string.pipe';

import { AppComponent } from './app.component';
import { Filmes } from './filmes.service';
import { SearchFieldComponent } from './search-field.component';
import { SearchResultsComponent } from './search-results.component';


@NgModule({
  imports: [ CommonModule,BrowserModule,BrowserAnimationsModule, FormsModule,ReactiveFormsModule, MatCardModule,MatInputModule,MatFormFieldModule,MatIconModule,MatToolbarModule
  ],
  declarations: [ AppComponent, SearchFieldComponent, SearchResultsComponent,SplitStringPipe],
  providers:    [ Filmes ],
  bootstrap:    [ AppComponent ],
  exports: [SplitStringPipe]
})
export class AppModule { }
