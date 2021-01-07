import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { faExpand } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @ViewChild('display') display: ElementRef<HTMLInputElement>;
  faExpand = faExpand;

  constructor() {}

  ngOnInit(): void {
    this.loadScript('//cdn.jsdelivr.net/npm/phaser@3.51.0/dist/phaser.min.js', false);
    this.loadScript('/socket.io/socket.io.js', false);
    this.loadScript('/assets/configure.js', true, 'module');
  }

  private loadScript(url: string, defer: boolean = true, type: string = 'application/javascript') {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');

    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = defer;
    script.type = type;

    body.appendChild(script);
  }

  onClickFullscreen() {
    this.display.nativeElement.requestFullscreen();
  }

}
