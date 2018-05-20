# IoPlayer - Audio Player web component

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) 6.0.3.


## Usage Example 


Simply consume this component as any Native DOM element

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