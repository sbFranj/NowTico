import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {

  busqueda:string = "";

  @Output() searchEvent = new EventEmitter<string>()

  sendSearch(){
    this.searchEvent.emit(this.busqueda)
  }

}
