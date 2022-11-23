import { Field, InputType } from "type-graphql"
import { IsPositive, Max, ValidateNested } from "class-validator"
import ContainerInput from "./ContainerInput"

@InputType({ description: "Input for the water jug problem" })
export default class ProblemInput {
  @Field(() => [ContainerInput], {
    description: "List of empty containers",
  })
  @ValidateNested()
  containers: ContainerInput[]

  @Field({ description: "Maximum units of water that fit in the container" })
  @IsPositive()
  @Max(99)
  target: number
}
