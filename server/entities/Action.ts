import { registerEnumType } from "type-graphql"

export enum Action {
  FILL,
  TRANSFER,
  DUMP,
}

registerEnumType(Action, {
  name: "Action",
  description: "Act performed on one or more containers",
  valuesConfig: {
    FILL: { description: "Fills an empty container to its maximum size" },
    TRANSFER: { description: "Tranfers the contents of a container to another container" },
    DUMP: { description: "Empties a container" },
  },
})
