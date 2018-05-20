import {Injectable, OnDestroy} from '@angular/core';

import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {Observable} from 'rxjs/internal/Observable';
import {Subscription} from 'rxjs/internal/Subscription';

import {fromEvent} from 'rxjs/internal/observable/fromEvent';
import {map} from 'rxjs/internal/operators';
import {fromPromise} from 'rxjs/internal/observable/fromPromise';

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

    init(source: string) {
        this._audio = document.createElement('audio');
        this._audio.src = source;
        this.audioFinish$.subscribe(() => this.pause());
    }

    play() {
        if (!this._isPlaying) {
            fromPromise(this._audio.play()).subscribe(() => {
                this.toggleIsPlaying();
            });
        }
    }

    pause() {
        if (this._isPlaying) {
            this._audio.pause();
            this.toggleIsPlaying();
        }
    }

    readFromPercentage(percentage: number) {
        this._audio.currentTime = this._audio.duration * percentage / 100;
    }

    private toggleIsPlaying() {
        this._isPlaying = !this._isPlaying;
        this._isPlaying$.next(this._isPlaying);
    }

    get percentageReaded$(): Observable<number> {
        return fromEvent(this._audio, 'timeupdate').pipe(map(() => {
            return (this._audio.currentTime / this._audio.duration) * 100;
        }));
    }

    /**
     * 
     * @return {Observable<void>}
     */
    get audioFinish$(): Observable<void> {
        return fromEvent(this._audio, 'ended').pipe(map(() => {
            return null;
        }));
    }

    /**
     * @description Observable to determine if current sound is playing or not.
     * @return {Observable<boolean>}
     */
    get isPlaying$(): Observable<boolean> {
        return this._isPlaying$.asObservable();
    }
}