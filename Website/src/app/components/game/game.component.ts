import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { faExpand } from '@fortawesome/free-solid-svg-icons';

import Phaser from 'phaser';
import { io, Socket } from 'socket.io-client';
declare var Game: any;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
  @ViewChild('display') display: ElementRef<HTMLCanvasElement>;
  faExpand = faExpand;

  socket: Socket;
  phaserGame: Phaser.Game;
  phaserConfig: Phaser.Types.Core.GameConfig;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.socket = io(window.location.origin, {
      query: {
          authorization: window.localStorage.getItem('token'),
      }
    });

    this.phaserConfig = {
      type: Phaser.CANVAS,
      width: 800,
      height: 600,
      canvas: this.display.nativeElement,
      title: "2DFMP",
      version: "0.0.1",
      physics: {
          default: 'arcade',
          arcade: {
              gravity: { y: 300 },
              debug: false
          }
      },
      scene: [ Game ]
    };

    this.phaserGame = new Phaser.Game(this.phaserConfig);
  }

  ngOnDestroy(): void {
    this.socket.disconnect();
    this.phaserGame.destroy(false);
  }

  onClickFullscreen() {
    this.display.nativeElement.requestFullscreen();
  }

}