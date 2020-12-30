import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, from, fromEvent, Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable()
export class IoPlayerService implements OnDestroy {

    private _audio: HTMLAudioElement;
    private _isPlaying = false;
    private _isPlaying$: BehaviorSubject<boolean>;
    private subscriptions: Subscription[] = [];

    constructor() {
        this._isPlaying$ = new BehaviorSubject(this._isPlaying);
    }


    ngOnDestroy() {
        if (this._isPlaying) {
            this.pause();
        }
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    /**
     * @description initiatize audio player.
     */
    init(source: string) {
        this._audio = document.createElement('audio');
        this._audio.src = source;
        this.audioFinish$.subscribe(() => this.pause());
    }

    /**
     * @description API to play current player.
     */
    play() {
        if (!this._isPlaying) {
            from(this._audio.play()).subscribe(() => {
                this.toggleIsPlaying();
            });
        }
    }

    /**
     * @description API to pause player.
     */
    pause() {
        if (this._isPlaying) {
            this._audio.pause();
            this.toggleIsPlaying();
        }
    }

    /**
     * @description ask for specific pourcentage position.
     */
    readFromPercentage(percentage: number) {
        this._audio.currentTime = this._audio.duration * percentage / 100;
    }

    /**
     * @description switch isPlaying state.
     */
    private toggleIsPlaying() {
        this._isPlaying = !this._isPlaying;
        this._isPlaying$.next(this._isPlaying);
    }

    /**
     * @description observable of current percentage position in audio.
     */
    get percentageReaded$(): Observable<number> {
        return fromEvent(this._audio, 'timeupdate').pipe(map(() => {
            return (this._audio.currentTime / this._audio.duration) * 100;
        }));
    }

    /**
     * @description observable who notify when 'ended' audio event is fire.
     */
    get audioFinish$(): Observable<void> {
        return fromEvent(this._audio, 'ended').pipe(map(() => {
            return null;
        }));
    }

    /**
     * @description Observable to determine if current sound is playing or not.
     */
    get isPlaying$(): Observable<boolean> {
        return this._isPlaying$.asObservable();
    }
}
