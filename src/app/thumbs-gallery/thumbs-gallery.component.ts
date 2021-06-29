import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/service/global.service';

@Component({
  selector: 'app-thumbs-gallery',
  templateUrl: './thumbs-gallery.component.html',
  styleUrls: ['./thumbs-gallery.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ThumbsGalleryComponent implements OnInit, OnDestroy {
  redditJSON: any[] = [];
  subscription!: Subscription;
  redditJSONLength: number = 0;
  justLoadedThumbs: boolean = true;
  valueSearch: string[] = [];

  constructor(
    public globalService: GlobalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initPage();
  }

  initPage() {
    if(this.globalService.jsonFromReddit.length < 1) {
      this.subscriptionTopics();
    } else {
      this.redditJSON = this.globalService.jsonFromReddit;
      for (const newEl of this.redditJSON) {
        newEl.justLoadedThumbs = true;
      }
      setTimeout( ()=>{
        for (const newEl of this.redditJSON) {
          newEl.justLoadedThumbs = false;
        }
      }, 600)
      this.subscriptionTopics();
    }
  }

  subscriptionTopics() {
    this.subscription = this.globalService.getRedditJSON().subscribe(JSON => {
      if(JSON) {
        if (JSON[0]) {
          this.thumbsGallery(JSON[0].data.children);
        } else {
          console.log('Errore');
        }
      }
    });
  }

  thumbsGallery(redditJSON: any) {
    for (const newEl of redditJSON) {
      newEl.justLoadedThumbs = true;
    }
    let thumbsInJson = true;
    if(thumbsInJson) {
      this.redditJSON.push({
        'topic': this.globalService.wordSearched,
        'data': {
          'id': null
        }
      });
    }
    for (const iterator of redditJSON) {
      if(iterator.data.thumbnail_width) {
        this.redditJSON.push(iterator);
      }
    }
    thumbsInJson = false;
    this.redditJSONLength = this.redditJSON.length;
    this.globalService.jsonFromReddit = this.redditJSON;
    setTimeout( ()=>{
      for (const newEl of this.redditJSON) {
        newEl.justLoadedThumbs = false;
      }
    }, 600)
  }

  hoverThumb(el: any) {
    el.hover = true;
  }

  leaveThumb(el: any) {
    el.hover = false;
  }

  removeTopic(el: any) {
    let indexFind = this.redditJSON.findIndex(item => item.topic == el.topic);
    let item = this.redditJSON[indexFind];
    const topicDaEliminare = el.topic;
    // verifica la cancellazione del primo TOPIC, il PRIMO!
    while (item != undefined && (item.topic == undefined || item.topic == el.topic)) {
      item = this.redditJSON[indexFind];
      if (item != undefined && (item.topic == undefined || item.topic == el.topic)) {
        this.redditJSON.splice(indexFind, 1);
        const contieneIndex = this.globalService.valuesSearchedList.indexOf(topicDaEliminare.toLowerCase());
        if (contieneIndex >= 0) {
          this.globalService.valuesSearchedList.splice(contieneIndex, 1);
        }
      }
    }
  }

  clickOnThumb(el: any) {
    this.router.navigate(['/detail/', (el.data.id).toLowerCase()])
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
