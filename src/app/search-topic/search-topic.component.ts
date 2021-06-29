import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalService } from 'src/service/global.service';
import { SnackbarInfoComponent } from '../snackbarInfo/snackbar-info/snackbar-info.component';

@Component({
  selector: 'app-search-topic',
  templateUrl: './search-topic.component.html',
  styleUrls: ['./search-topic.component.scss']
})
export class SearchTopicComponent implements OnInit {
  valueSearch: string = '';

  constructor (
    public globalService: GlobalService,
    private _snackBar: MatSnackBar
    ) {
  }

  ngOnInit(): void {
    if(this.globalService.jsonFromReddit.length < 1) {
      this.valueSearch =  'Italy';
    }
  }

  searchKeyWord(event: Event) {    
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue.length > 2) {
      this.valueSearch = filterValue
    }
  }
  search() {
    const valueLower = this.valueSearch.toLowerCase();
    if(!this.globalService.valuesSearchedList.includes(valueLower) && valueLower && valueLower.length > 2) {
      this.globalService.wordSearched = this.valueSearch;
      this.globalService.valuesSearchedList.push(valueLower);
      this.globalService.sendGetRequestReddit(valueLower).subscribe( 
        (res: any) => {
          this.globalService.sendRedditJSON(res, this.valueSearch);
          this.valueSearch = '';
        },
        err => {
            this.globalService.snackBarInfo = `Topic not found! Try again and change the topic.`;
            this._snackBar.openFromComponent(SnackbarInfoComponent, {
              duration: 7000,
            });   
          }
      )
    } else {
      if (valueLower.length <= 2) {
        this.globalService.snackBarInfo = `Insert at least 3 letters to search.`
      } else if (this.globalService.valuesSearchedList.includes(valueLower)) {
        this.globalService.snackBarInfo = `The keyword: '${this.valueSearch}' is already in Gallery. Try with another topic.`  
      }
      this._snackBar.openFromComponent(SnackbarInfoComponent, {
        duration: 7000,
      });      
    }
  }

}
