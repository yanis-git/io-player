import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {fromEvent, Observable, Subscription} from 'rxjs/index';
import {map} from 'rxjs/internal/operators';

@Component({
  selector: 'io-player',
  templateUrl: './io-player.component.html',
  styleUrls: ['./io-player.component.scss']
})
export class IoPlayerComponent implements OnInit, OnDestroy {


  @Input('src') source: string;
  @Input('cover') cover: string;
  @Input('author') author: string;
  @Input('song') song: string;

  @ViewChild('coverEl') coverElement: ElementRef;

  public isPlaying = false;
  public progression: number = 0;
  private audio: HTMLAudioElement;

  private subscriptions: Subscription[] = [];

  constructor() { }

  ngOnInit() {
    this.initPlayer();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onPlayHandler() {
    if (!this.isPlaying) {
      this.play();
    } else {
      this.pause();
    }
  }

  private play() {
    this.audio.play();
    this.isPlaying = true;
  }

  private pause() {
    this.audio.pause();

    this.isPlaying = false;
  }

  private initPlayer() {
    this.audio = document.createElement('audio');
    this.subscriptions.push(
      this.percentageReaded$.subscribe(percentage => {
          this.progression = percentage;
      }),
      this.audioFinish$.subscribe(() => this.isPlaying = false)
    );
    this.audio.src = this.source;
  }

  get percentageReaded$(): Observable<number> {
      return fromEvent(this.audio, 'timeupdate').pipe(map(() => {
          return (this.audio.currentTime / this.audio.duration) * 100;
      }));
  }
  get audioFinish$(): Observable<void> {
      return fromEvent(this.audio, 'ended').pipe(map((e) => {
        return null;
      }));
  }
}
