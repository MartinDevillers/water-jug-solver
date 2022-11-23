/* eslint-disable class-methods-use-this */
import { Arg, Query, Resolver } from "type-graphql"
import Container from "../entities/Container"
import ProblemInput from "../entities/ProblemInput"
import Solution from "../entities/Solution"

@Resolver(Solution)
export class SolutionResolver {
  @Query(() => Solution, { description: "Attempts to solve the provided water jug problem" })
  async solution(@Arg("problem", (type) => ProblemInput) problem: ProblemInput): Promise<Solution> {
    const containers = problem.containers.map<Container>((c) => new Container(c.name, c.size))
    const solution = this.solve(containers, problem.target)
    return solution
  }

  solve(containers: Container[], target: number) {
    if (containers.length < 2) {
      return Solution.unsolved("At least two containers must be provided")
    }
    if (containers.length > 2) {
      return Solution.unsolved("Problems with more than two containers are not supported (yet)")
    }
    const firstContainer = containers[0]
    const secondContainer = containers[1]
    if (target > Math.max(firstContainer.size, secondContainer.size)) {
      return Solution.unsolved("Target cannot be larger than both jugs")
    }
    if (target % 2 === 1 && firstContainer.size % 2 === 0 && secondContainer.size % 2 === 0) {
      return Solution.unsolved("Two even jugs cannot result in an odd number")
    }
    const gcd = (a: number, b: number): number => (!b ? a : gcd(b, a % b))
    if (target % gcd(firstContainer.size, secondContainer.size) !== 0) {
      return Solution.unsolved("There is no solution for these parameters")
    }
    const firstSolution = this.solveForTwoContainers(firstContainer.clone(), secondContainer.clone(), target)
    const secondSolution = this.solveForTwoContainers(secondContainer.clone(), firstContainer.clone(), target)
    return firstSolution.isMoreEfficientThan(secondSolution) ? firstSolution : secondSolution
  }

  solveForTwoContainers(first: Container, second: Container, target: number) {
    const solution = Solution.solved([first, second])
    while (first.amount !== target && second.amount !== target) {
      if (first.isEmpty()) {
        solution.addFillStep(first)
      } else if (second.isFull()) {
        solution.addDumpStep(second)
      } else {
        solution.addTransferStep(first, second)
      }
    }
    return solution
  }
}
