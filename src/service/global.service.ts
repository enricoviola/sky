import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private REST_API_SERVER_reddit = "https://www.reddit.com/r/";
  public jsonFromReddit: any[] = [];
  private subjectRedditJSON = new Subject<any>();
  public snackBarInfo: string = '';
  public wordSearched: string = '';
  public valuesSearchedList: string[] = [];

  constructor(private httpClient: HttpClient) {}

  public sendGetRequestReddit(keyword: string){
    return this.httpClient.get(this.REST_API_SERVER_reddit + keyword + '/top.json')
  }

  sendRedditJSON(json: any, valueSearch: string) {
    this.subjectRedditJSON.next([json, valueSearch]);
  }
  getRedditJSON(): Observable<any> {
    return this.subjectRedditJSON.asObservable();
  }
  nextRedditJSON() {
    this.subjectRedditJSON.next();
  }
}
