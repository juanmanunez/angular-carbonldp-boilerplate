import {Component, AfterView, HostListener, Input} from "@angular/core";

import YoutubePlayer from "youtube-player";

import template from "./background-video.component.html!text";
import style from "./background-video.component.css!text";

@Component( {
	selector: "background-video",
	template: template,
	styles: [ style ],
	directives: [],
} )
export class BackgroundVideoComponent {
	@Input( "videoID" ) videoID:string;
	@Input( "startTime" ) startTime:number;
	@Input( "endTime" ) endTime:number;

	screenElement:HTMLElement;

	private player:YoutubePlayer;
	private id:number = "player-" + BackgroundVideoComponent.generateUUID();

	constructor() {}

	ngAfterViewInit():void {
		if( ! this.videoID ) return;

		this.player = YoutubePlayer( this.id, {} );
		this.player.loadVideoById( this.videoID ).then( () => {
			this.screenElement = document.querySelector( "#" + this.id );

			this.resizeVideo();

			this.player.setOption( "autohide", 1 );
			this.player.setOption( "modestbranding", 0 );
			this.player.setOption( "rel", 0 );
			this.player.setOption( "showinfo", 0 );
			this.player.setOption( "controls", 0 );
			this.player.setOption( "disablekb", 1 );
			this.player.setOption( "enablejsapi", 0 );
			this.player.setOption( "iv_load_policy", 3 );

			this.player.hideVideoInfo();

			this.player.mute();
			this.player.playVideo();

			this.player.on( "stateChange", ( event ) => {
				if( event.data === 1 ) {
					if( this.screenElement.classList ) this.screenElement.classList.add( "active" );
					else this.screenElement.className += ' ' + "active";
				} else if( event.data === 0 ) {
					this.player.seekTo( this.startSeconds ? this.startSeconds : 0 )
				}
			} );
		} );

		console.log( this.player );
	}

	resizeVideo():void {
		let width = document.documentElement.clientWidth + 200;
		let height = document.documentElement.clientHeight + 200;

		console.log( width );
		console.log( height );

		if( width / height > 16 / 9 ) {
			this.player.setSize( width, width / 16 * 9 );
			this.screenElement.style.left = "0";
		} else {
			this.player.setSize( height / 9 * 16, height ).then( () => {
				this.screenElement.style.left = ( - ( this.screenElement.offsetWidth - width ) / 2 ) + "px";
			} );
		}
	}

	@HostListener( "window:resize", [ "$event" ] )
	onResize( event:any ):void {
		this.resizeVideo();
	}

	static generateUUID():string {
		function s4() {
			return Math.floor( (1 + Math.random()) * 0x10000 ).toString( 16 ).substring( 1 );
		}

		return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
	}
}

export default BackgroundVideoComponent;
