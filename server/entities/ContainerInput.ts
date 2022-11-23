import { Field, InputType } from "type-graphql"
import { IsPositive, Max } from "class-validator"

@InputType({ description: "Object that holds a finite amount of water" })
export default class ContainerInput {
  @Field({ description: "Name of the container" })
  name: string

  @Field({ description: "Maximum units of water that fit in the container" })
  @IsPositive()
  @Max(99)
  size: number
}
