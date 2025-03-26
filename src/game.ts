import { Application, Container } from "pixi.js";
import { Boundary } from "./boundary";
import { model } from "./lib/model";
import { Player } from "./player";
import { Input } from "./lib/inputs";

export class Game extends Container {
  private app: Application;
  private boundaries: Boundary[] = [];
  private boundaryWidth = 40;
  private boundaryHeight = 40;
  private player: Player;

  private keydownHandler = this.onKeyDown.bind(this);
  private keyupHandler = this.onKeyUp.bind(this);

  constructor(app: Application) {
    super();
    this.app = app;

    model.forEach((row, modelIndex) => {
      row.forEach((value, valueIndex) => {
        if (value > 0) {
          const boundary = new Boundary({
            positionX: this.boundaryWidth * valueIndex,
            positionY: this.boundaryHeight * modelIndex,
          });
          this.addChild(boundary);
          this.boundaries.push(boundary);
        }
      });
    });

    this.player = new Player({
      positionX: this.boundaryWidth + this.boundaryWidth / 2,
      positionY: this.boundaryHeight + this.boundaryHeight / 2,
      velocityX: 0,
      velocityY: 0,
    });
    this.addChild(this.player);
    this.player.setup();

    this.setInputs();
  }

  handleUpdate() {
    this.player.handleUpdate();

    this.player.velocityX = 0;
    this.player.velocityY = 0;

    if (Input.keys.w.pressed) this.player.velocityY -= 5;
    if (Input.keys.s.pressed) this.player.velocityY += 5;
    if (Input.keys.a.pressed) this.player.velocityX -= 5;
    if (Input.keys.d.pressed) this.player.velocityX += 5;
  }

  private setInputs() {
    document.addEventListener("keydown", this.keydownHandler);
    document.addEventListener("keyup", this.keyupHandler);
  }

  private onKeyDown(e: KeyboardEvent) {
    switch (e.code) {
      case "KeyW":
        Input.keys.w.pressed = true;
        break;
      case "KeyS":
        Input.keys.s.pressed = true;
        break;
      case "KeyA":
        Input.keys.a.pressed = true;
        break;
      case "KeyD":
        Input.keys.d.pressed = true;
        break;
    }
  }

  private onKeyUp(e: KeyboardEvent) {
    switch (e.code) {
      case "KeyW":
        Input.keys.w.pressed = false;
        break;
      case "KeyS":
        Input.keys.s.pressed = false;
        break;
      case "KeyA":
        Input.keys.a.pressed = false;
        break;
      case "KeyD":
        Input.keys.d.pressed = false;
        break;
    }
  }
}
