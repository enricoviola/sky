import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/service/global.service';

@Component({
  selector: 'app-detail-topic',
  templateUrl: './detail-topic.component.html',
  styleUrls: ['./detail-topic.component.scss']
})
export class DetailTopicComponent implements OnInit, OnDestroy {
  redditJSON: any[] = [];
  subscription!: Subscription;
  subIDParams!: Subscription;
  redditJSONLength: number = 0;
  justLoadedThumbs: boolean = true;
  valueSearch: string[] = [];
  idTopic: string = '';
  topic: any;
  topicImg: string = '';
  prevTopicID: string = '';
  nextTopicID: string = '';
  imgLoadedB: boolean = false;

  constructor(
    public globalService: GlobalService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.initTopic();
  }

  initTopic(){
    this.prevTopicID = '';
    this.nextTopicID = '';
    this.imgLoadedB = false;
    
    this.subIDParams = this.route.params.subscribe(params => {
       this.idTopic = params['id'];
       let indexTopicinArray: number = -1;
       if(this.idTopic && this.globalService.jsonFromReddit.length > 0) {
        this.topic = this.globalService.jsonFromReddit.find((element, index) => {
          indexTopicinArray = index;
          return element.data.id == this.idTopic;
        });
        if(this.topic.data.preview) {
          this.topicImg = (this.topic.data.preview.images[0].source.url).replace('&amp;','&');
        } else {
          this.topicImg = (this.topic.data.thumbnail).replace('&amp;','&');
        }
        this.prevNextTopic(indexTopicinArray);
       } else {
        this.router.navigate([''])
       }
    });
  }

  prevNextTopic(indexTopicinArray: number) {
    if(indexTopicinArray >= 0 && this.globalService.jsonFromReddit[indexTopicinArray + 1]) {
      if(this.globalService.jsonFromReddit[indexTopicinArray + 1].data.id) {
        this.nextTopicID = this.globalService.jsonFromReddit[indexTopicinArray + 1].data.id
      } else {
        // salta di 2 se incontra l'oggetto 'parola ricercata'
        this.nextTopicID = this.globalService.jsonFromReddit[indexTopicinArray + 2].data.id ? this.globalService.jsonFromReddit[indexTopicinArray + 2].data.id : '';
      }
    }
    if(indexTopicinArray >= 0 && this.globalService.jsonFromReddit[indexTopicinArray - 1]) {
      if(this.globalService.jsonFromReddit[indexTopicinArray - 1].data.id) {
        this.prevTopicID = this.globalService.jsonFromReddit[indexTopicinArray - 1].data.id
      } else {
        // salta di 2 se incontra l'oggetto 'parola ricercata'
        this.prevTopicID = this.globalService.jsonFromReddit[indexTopicinArray - 2].data.id ? this.globalService.jsonFromReddit[indexTopicinArray - 2].data.id : '';
      }
    }
  }
  imgLoadedF() {
    this.imgLoadedB = true;
  }

  gotoSearch() {
    this.imgLoadedB = false;
    this.router.navigate(['']).then( res => {
      this.globalService.nextRedditJSON();
    });
  }
  gotoPrev() {
    this.subIDParams.unsubscribe();
    this.imgLoadedB = false;
    this.router.navigate(['/detail/', this.prevTopicID.toLowerCase()]).then( res => {
      this.initTopic();
    });
  }
  gotoNext() {
    this.subIDParams.unsubscribe();
    this.imgLoadedB = false;
    this.router.navigate(['/detail/', this.nextTopicID.toLowerCase()]).then( res => {
      this.initTopic();
    });
  }

  ngOnDestroy() {
    this.subIDParams.unsubscribe();
  }

}
