# IoPlayer - Audio Player web component

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) 6.0.3.

##Requirement

* Angular 6.x.x
* RxJS 6.x.x


## installation

```
yarn add io-player
npm i --save io-player
```

add to your `polyfill.ts`

```
import '@webcomponents/custom-elements/src/native-shim';
import '@webcomponents/custom-elements/custom-elements.min';
```

## Usage Example as Angular Module

On your `app.module.ts` add your import :

```
  import { IoPlayerModule } from 'io-player';
  // [...]
  imports: [
    IoPlayerModule
  ]
```

## Usage Example as WebComponent

Use CDN or `io-player` package then simply consume this component as any Native DOM element

```
<io-player
	src="https://cchound.ams3.digitaloceanspaces.com/Kontekst%20-%20Destiny.mp3"
	cover="https://78.media.tumblr.com/_1524644366_cover.png"
	song="Destiny"
	author="Kontekst"
  ></io-player>  
```

If you need to be award of progression :

```
document.getElementsByTagName('io-player')[0].addEventListener('progression', function($event) {
      console.log($event);
  },true);
```


## properties : 
 
 * **src :** Link to mp3 file.
 * **cover :** Link to cover image file.
 * **song :** Name of the song
 * **author :** Name of author.

## Event : 

 * **progression:** Pourcentage of current playing sound.