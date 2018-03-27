import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PapaParseModule } from 'ngx-papaparse';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import {DataTableModule} from 'primeng/datatable';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,BrowserModule,PapaParseModule,DataTableModule,TableModule,FileUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
