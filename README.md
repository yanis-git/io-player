# IoPlayer - Audio Player web component

[![Netlify Status](https://api.netlify.com/api/v1/badges/2fc24c79-e90b-4d1e-aec5-cd59e144921d/deploy-status)](https://app.netlify.com/sites/io-player/deploys)

[You can see it in action](https://unpkg.com/io-player@1.0.2/index.html)
[or even here](https://io-player.netlify.app/)

## Requirement

* Angular 13.x.x
* RxJS 7.x.x


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

Use [CDN](https://unpkg.com/io-player@1.0.2/io-player.pkg.jshttps://unpkg.com/io-player@1.0.2/io-player.pkg.js) or `io-player` package then simply consume this component as any Native DOM element

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
document.querySelector('io-player').addEventListener('progression', $event => {
  console.log($event);
}, true);
```


## properties : 
 
 * **src :** Link to mp3 file.
 * **cover :** Link to cover image file.
 * **song :** Name of the song
 * **author :** Name of author.

## Event : 

 * **progression:** Pourcentage of current playing sound.
 
 
## Credit :

Special thanks to :
* [nitayneeman](https://github.com/nitayneeman/made-with-love) for inspiring me about how to build WebComponent.
* [Valery Alikin](https://codepen.io/AlikinVV/pen/ZxgyoE) who inspire me original design.
