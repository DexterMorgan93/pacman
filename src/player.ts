import { Container, Graphics } from "pixi.js";

interface IPlayer {
  positionX: number;
  positionY: number;
  velocityX: number;
  velocityY: number;
}

export class Player extends Container {
  positionX: number;
  positionY: number;
  public velocityX: number;
  public velocityY: number;
  private radius = 15;

  constructor({ positionX, positionY, velocityX, velocityY }: IPlayer) {
    super();

    this.positionX = positionX;
    this.positionY = positionY;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
  }

  setup() {
    const view = new Graphics();
    view.arc(0, 0, this.radius, 0, Math.PI * 2);
    view.fill({ color: "yellow" });
    view.position.set(this.positionX, this.positionY);
    this.addChild(view);
  }

  handleUpdate() {
    this.position.x += this.velocityX;
    this.position.y += this.velocityY;
  }
}
