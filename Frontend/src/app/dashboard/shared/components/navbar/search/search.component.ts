import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchValue!: Subject<string>;
  ngOnInit(): void {
    this.searchValue = new Subject<string>();
  }
  handleSearch(event : Event ) {
      this.searchValue.next((<HTMLInputElement>event.target).value)
  }
}
