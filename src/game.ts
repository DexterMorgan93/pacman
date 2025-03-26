import { Application, Container } from "pixi.js";
import { Boundary } from "./boundary";
import { model } from "./lib/model";
import { Player } from "./player";

export class Game extends Container {
  private app: Application;
  private boundaries: Boundary[] = [];
  private boundaryWidth = 40;
  private boundaryHeight = 40;

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

    const player = new Player({
      positionX: this.boundaryWidth + this.boundaryWidth / 2,
      positionY: this.boundaryHeight + this.boundaryHeight / 2,
      velocityX: 0,
      velocityY: 0,
    });
    this.addChild(player);
    player.setup();
  }

  handleUpdate() {}
}
