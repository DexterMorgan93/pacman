import { Container, Graphics } from "pixi.js";

interface IBoundary {
  positionX: number;
  positionY: number;
}

export class Boundary extends Container {
  private positionX: number;
  private positionY: number;

  constructor({ positionX, positionY }: IBoundary) {
    super();

    this.positionX = positionX;
    this.positionY = positionY;

    const view = new Graphics();
    view.rect(0, 0, 40, 40);
    view.fill({ color: "blue" });
    view.position.set(this.positionX, this.positionY);
    this.addChild(view);
  }
}
