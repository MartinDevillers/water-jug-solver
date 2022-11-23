import { Field, ObjectType } from "type-graphql"

@ObjectType({ description: "Object that holds a finite amount of water" })
export default class Container {
  @Field({ description: "Name of the container" })
  name: string

  @Field({ description: "Maximum units of water that fit in the container" })
  size: number

  @Field({ description: "Current units of water in the container" })
  amount: number

  constructor(name: string, size: number, amount = 0) {
    this.name = name
    this.size = size
    this.amount = amount
  }

  isEmpty(): boolean {
    return this.amount === 0
  }

  isFull(): boolean {
    return this.amount === this.size
  }

  remaining(): number {
    return this.size - this.amount
  }

  fill(): void {
    this.amount = this.size
  }

  dump(): void {
    this.amount = 0
  }

  transfer(target: Container) {
    if (target.remaining() >= this.amount) {
      target.amount += this.amount
      this.dump()
    } else {
      this.amount -= target.remaining()
      target.fill()
    }
  }

  clone(): Container {
    return new Container(this.name, this.size, this.amount)
  }
}
