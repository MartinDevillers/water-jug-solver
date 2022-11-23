import { Field, ObjectType } from "type-graphql"
import { Action } from "./Action"
import Container from "./Container"
import Step from "./Step"

@ObjectType({ description: "Series of steps that lead a set of empty containers to a desired target state" })
export default class Solution {
  @Field(() => [Step], { description: "List of steps" })
  steps: Step[]

  @Field({ description: "Whether the problem was solved successfully" })
  isSolved: boolean

  @Field({ description: "Reason why there is no solution", nullable: true })
  unsolvableMessage?: string

  containers: Container[]

  static solved(containers: Container[]): Solution {
    const solution = new Solution()
    solution.steps = []
    solution.isSolved = true
    solution.unsolvableMessage = null
    solution.containers = containers
    return solution
  }

  static unsolved(message: string): Solution {
    const solution = new Solution()
    solution.steps = []
    solution.isSolved = false
    solution.unsolvableMessage = message
    return solution
  }

  addFillStep(target: Container) {
    target.fill()
    this.steps.push({
      action: Action.FILL,
      target: target.name,
      containers: this.containers.map((c) => c.clone()),
    })
  }

  addDumpStep(target: Container) {
    target.dump()
    this.steps.push({
      action: Action.DUMP,
      target: target.name,
      containers: this.containers.map((c) => c.clone()),
    })
  }

  addTransferStep(source: Container, target: Container) {
    source.transfer(target)
    this.steps.push({
      action: Action.TRANSFER,
      target: target.name,
      source: source.name,
      containers: this.containers.map((c) => c.clone()),
    })
  }

  isMoreEfficientThan(other: Solution) {
    return this.steps.length < other.steps.length
  }
}
