import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs/index';
import {IoPlayerService} from './io-player.service';

@Component({
  selector: 'io-player',
  templateUrl: './io-player.component.html',
  styleUrls: ['./io-player.component.scss'],
  providers: [IoPlayerService]
})
export class IoPlayerComponent implements OnInit, OnDestroy {


  @Input('src') source: string;
  @Input('cover') cover: string;
  @Input('author') author: string;
  @Input('song') song: string;

  @ViewChild('coverEl') coverElement: ElementRef;
  @ViewChild('timelineBar') timelineElement: ElementRef;
  public isPlaying = false;
  public progression: number = 0;
  private subscriptions: Subscription[] = [];

  constructor(public playerService: IoPlayerService) { }

  ngOnInit() {
    this.playerService.init(this.source);
    this.subscriptions.push(
        this.playerService.isPlaying$.subscribe(state => this.isPlaying = state),
        this.playerService.percentageReaded$.subscribe(state => this.progression = state)
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onPlayHandler() {
    if (!this.isPlaying) {
      this.playerService.play();
    } else {
      this.playerService.pause();
    }
  }
  onChangeTimelinekHandler($event: MouseEvent) {
      const percentage = Math.floor(($event.offsetX / this.timelineElement.nativeElement.offsetWidth) * 100);
      this.playerService.readFromPercentage(percentage);
  }
}
