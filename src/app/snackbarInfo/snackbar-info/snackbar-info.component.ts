import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/service/global.service';

@Component({
  selector: 'app-snackbar-info',
  templateUrl: './snackbar-info.component.html',
  styleUrls: ['./snackbar-info.component.scss']
})
export class SnackbarInfoComponent implements OnInit {

  constructor(
    public globalService: GlobalService
    ) { }

  ngOnInit(): void {
  }

}
