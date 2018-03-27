import { Component, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { PapaParseService } from 'ngx-papaparse';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedData: any = [];
  data = [];
  directoryData = [];
  changeDetectorRefs: ChangeDetectorRef[] = [];
  isAvailable = false;
  title = 'My CSV Editor !';
  headers = [];
  fileName: string;
  constructor(private papa: PapaParseService, private ref: ChangeDetectorRef, private applicationRef: ApplicationRef, private zone: NgZone) {

  }
  /**
   * Table coloumn config 
   * @memberof AppComponent
   */
  cols = [
    { field: '', header: '' },
    { field: '', header: '' },
    { field: '', header: '' },
    { field: '', header: '' }
  ];
  /**
   * Method that listens to any change in the folder selection 
   * Uses Javascript file reader API's   
   * @param {*} event 
   * @memberof AppComponent
   */
  public changeListener(event: any) {
    let self = this;
    this.data = [];
    //for (var i = 0; i < event.target.files.length; i++) {
      this.fileName = event.target.files[0].name.split(".")[0];
      {
        let file: File = event.target.files.item(0);
        let reader: FileReader = new FileReader();
        reader.onloadend = function (event) {
          self.parseCSVFile(reader.result);
        }
        reader.readAsText(file);
      }
    
    console.log("All files data", this.data);
    this.fillTheColumnHeader();
  }
  /**
   * Method to parse the csv File
   * @param {*} data 
   * @memberof AppComponent
   */
  public parseCSVFile(data: any) {
    var lines = data.split("\n");

    var result = [];

    this.headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {

      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < this.headers.length; j++) {
        obj[this.headers[j]] = currentline[j];
      }

      this.data.push(obj);
    }
  }
  /**
   * Method to fill the coloumn header for the table
   * Uses the this.header array for filling 
   * @memberof AppComponent
   */
  public fillTheColumnHeader() {
    for (var i = 0; i < this.headers.length; i++) {
      this.cols[i].field = this.headers[i];
      this.cols[i].header = this.cols[i].field;
    }
  }
}
