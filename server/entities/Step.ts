import { Field, ObjectType } from "type-graphql"
import { Action } from "./Action"
import Container from "./Container"

@ObjectType({ description: "Single action performed on a specific container, or between two containers" })
export default class Step {
  @Field({ description: "Maximum units of water that fit in the container" })
  action: Action

  @Field({ description: "Name of the container on which the action is performed" })
  target: string

  @Field({ description: "Name of the second container. Only applicable for transfers", nullable: true })
  source?: string

  @Field(() => [Container], {
    description: "State of the containers after this step",
  })
  containers: Container[]
}
