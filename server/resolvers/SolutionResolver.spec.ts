import "reflect-metadata"
import Container from "../entities/Container"
import ProblemInput from "../entities/ProblemInput"
import Solution from "../entities/Solution"
import { SolutionResolver } from "./SolutionResolver"

describe("SolutionResolver", () => {
  const sut = new SolutionResolver()

  const createProblemInput = (a: number, b: number, c: number): ProblemInput => ({
    containers: [
      {
        name: "A",
        size: a,
      },
      {
        name: "B",
        size: b,
      },
    ],
    target: c,
  })

  test("Use Case: A=3, B=5, target=5", async () => {
    const problemInput = createProblemInput(3, 5, 4)

    const actual = await sut.solution(problemInput)

    const firstContainer = new Container("A", 3)
    const secondContainer = new Container("B", 5)
    const expected = Solution.solved([secondContainer, firstContainer])
    expected.addFillStep(secondContainer)
    expected.addTransferStep(secondContainer, firstContainer)
    expected.addDumpStep(firstContainer)
    expected.addTransferStep(secondContainer, firstContainer)
    expected.addFillStep(secondContainer)
    expected.addTransferStep(secondContainer, firstContainer)
    expect(actual).toStrictEqual(expected)
  })

  test("Use Case: A=1, B=10, target=2", async () => {
    const problemInput = createProblemInput(1, 10, 2)

    const actual = await sut.solution(problemInput)

    const firstContainer = new Container("A", 1)
    const secondContainer = new Container("B", 10)
    const expected = Solution.solved([firstContainer, secondContainer])
    expected.addFillStep(firstContainer)
    expected.addTransferStep(firstContainer, secondContainer)
    expected.addFillStep(firstContainer)
    expected.addTransferStep(firstContainer, secondContainer)
    expect(actual).toStrictEqual(expected)
  })

  test("Use Case: A=1, B=10, target=8", async () => {
    const problemInput = createProblemInput(1, 10, 8)

    const actual = await sut.solution(problemInput)

    const firstContainer = new Container("A", 1)
    const secondContainer = new Container("B", 10)
    const expected = Solution.solved([secondContainer, firstContainer])
    expected.addFillStep(secondContainer)
    expected.addTransferStep(secondContainer, firstContainer)
    expected.addDumpStep(firstContainer)
    expected.addTransferStep(secondContainer, firstContainer)
    expect(actual).toStrictEqual(expected)
  })

  test("Use Case: A=1, B=10, target=20", async () => {
    const problemInput = createProblemInput(1, 10, 20)

    const actual = await sut.solution(problemInput)

    const expected = Solution.unsolved("Target cannot be larger than both jugs")
    expect(actual).toStrictEqual(expected)
  })

  test("Use Case: A=2, B=10, target=3", async () => {
    const problemInput = createProblemInput(2, 10, 3)

    const actual = await sut.solution(problemInput)

    const expected = Solution.unsolved("Two even jugs cannot result in an odd number")
    expect(actual).toStrictEqual(expected)
  })

  test("Use Case: A=3, B=6, target=2", async () => {
    const problemInput = createProblemInput(3, 6, 2)

    const actual = await sut.solution(problemInput)

    const expected = Solution.unsolved("There is no solution for these parameters")
    expect(actual).toStrictEqual(expected)
  })
})
