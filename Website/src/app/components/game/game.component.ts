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
    this.loadScript('../assets/game.js');
  }

  private loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');

    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;

    body.appendChild(script);
  }

  onClickFullscreen() {
    this.display.nativeElement.requestFullscreen();
  }

}
