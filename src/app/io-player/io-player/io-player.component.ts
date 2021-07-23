import {
    ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output,
    ViewChild
} from '@angular/core';
import {Subscription} from 'rxjs/internal/Subscription';
import {IoPlayerService} from './io-player.service';

@Component({
  selector: 'io-player',
  templateUrl: './io-player.component.html',
  styleUrls: ['./io-player.component.scss'],
  providers: [IoPlayerService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IoPlayerComponent implements OnInit, OnDestroy {


  @Input() src: string;
  @Input() cover: string;
  @Input() author: string;
  @Input() song: string;

  // eslint-disable-next-line  @angular-eslint/no-output-rename
  @Output('progression') progression$: EventEmitter<number>;

  @ViewChild('coverEl') coverElement: ElementRef;
  @ViewChild('timelineBar') timelineElement: ElementRef;

  public isPlaying = false;
  public progression = 0;
  private subscriptions: Subscription[] = [];

  constructor(
      public playerService: IoPlayerService,
      private changeRef: ChangeDetectorRef
  ) {
    this.progression$ = new EventEmitter<number>();
  }

  ngOnInit() {
    this.playerService.init(this.src);
    this.subscriptions.push(
        this.playerService.isPlaying$.subscribe(state => {
            this.isPlaying = state;
            this.changeRef.detectChanges();
        }),
        this.playerService.percentageReaded$.subscribe(state => {
          this.progression = state;
          this.progression$.emit(state);
          this.changeRef.detectChanges();
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  /**
   * Click handler on play pause button.
   */
  onPlayHandler() {
    if (!this.isPlaying) {
      this.playerService.play();
    } else {
      this.playerService.pause();
    }
  }

  /**
   * Click Handler on timeline bar
   */
  onChangeTimelinekHandler($event: MouseEvent) {
      const percentage = Math.floor(($event.offsetX / this.timelineElement.nativeElement.offsetWidth) * 100);
      this.playerService.readFromPercentage(percentage);
  }
}
