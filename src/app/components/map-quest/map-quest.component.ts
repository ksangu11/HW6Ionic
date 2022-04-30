import { Component, OnInit } from '@angular/core';
import { DirectionServiceService } from '../../services/direction-service.service';
import { Observable, Subject} from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-map-quest',
  templateUrl: './map-quest.component.html',
  styleUrls: ['./map-quest.component.scss']
})
export class MapQuestComponent implements OnInit {

  private searchTerms: Subject<string[]>;

  from: any
  to: any;
  directionList: Array<any>;

  constructor( private directionServiceService : DirectionServiceService ) {
      this.from = 'Boston, MA';
      this.to = 'Cambridge, MA';
  }

  search(from: string, to: string): void {
      //console.log(from,to)
      let list = [];
      list.push(from)
      list.push(to)
      this.searchTerms.next(list);
  }

  searchTo(term: string): void {
      this.to = term;
      this.search(this.from, term);
  }

  searchFrom(term: string): void {
      this.from = term;
      this.search(term, this.to);
  }

  ngOnInit() {
      this.directionList = [];

      this.searchTerms = new Subject<string[]>();

      this.searchTerms.pipe(
          debounceTime(1000),
          distinctUntilChanged(),
          switchMap((list: string[]) =>
            this.directionList = this.directionServiceService.getDirection(list[0], list[1]))).subscribe();

  }

  ngAfterViewInit() {
  	  this.search(this.from, this.to);
  }

  get(): void {
      this.directionList = [];
      this.directionList = this.directionServiceService.getDirection(this.from, this.to);
      //console.log(this.directionList)
  }
}
