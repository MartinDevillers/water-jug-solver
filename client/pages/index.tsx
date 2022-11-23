import React from "react"
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core"
import { gql, useLazyQuery } from "@apollo/client"
import ExtensionIcon from "@material-ui/icons/Extension"
import RotateLeftIcon from "@material-ui/icons/RotateLeft"
import NumericInput from "../components/NumericInput"
import Bucket from "../components/Bucket"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    "@global": {
      body: {
        // backgroundImage: "url(background4.jpg)",
        // backgroundSize: "cover",
        // backgroundAttachment: "fixed",
        backgroundColor: "#8BC6EC",
        backgroundImage: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
        backgroundAttachment: "fixed",
      },
    },
    root: {
      display: "flex",
      flexDirection: "column",
    },
    paper: {
      padding: theme.spacing(3),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      textAlign: "center",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      backdropFilter: "saturate(180%)",
    },
  })
)

interface WaterContainer {
  readonly name: string
  readonly size: number
  readonly amount: number
}

interface Step {
  readonly action: number
  readonly source?: string
  readonly target: string
  readonly containers: WaterContainer[]
}

interface Solution {
  readonly steps: Step[]
  readonly isSolved: boolean
  readonly unsolvableMessage: string
}

interface SolutionData {
  readonly solution: Solution
}

const GET_SOLUTION = gql`
  query GetSolution($problem: ProblemInput!) {
    solution(problem: $problem) {
      steps {
        action
        source
        target
        containers {
          name
          size
          amount
        }
      }
      isSolved
      unsolvableMessage
    }
  }
`

const defaultProblemForm = { firstContainer: 3, secondContainer: 5, target: 4 }

const IndexPage: React.FC = () => {
  const classes = useStyles()
  const [problemForm, setProblemForm] = React.useState(defaultProblemForm)
  const [getSolution, { data, loading }] = useLazyQuery<SolutionData>(GET_SOLUTION)

  const handleShowSolution = async () => {
    const variables = {
      problem: {
        containers: [
          {
            name: "A",
            size: problemForm.firstContainer,
          },
          {
            name: "B",
            size: problemForm.secondContainer,
          },
        ],
        target: problemForm.target,
      },
    }
    await getSolution({ variables })
  }

  const handleResetParameters = () => {
    setProblemForm(defaultProblemForm)
  }

  const formatStepMessage = (step: Step): string => {
    switch (step.action) {
      case 0:
        return `Fill jug ${step.target}`
      case 1:
        return `Transfer jug ${step.source} to ${step.target}`
      case 2:
        return `Dump jug ${step.target}`
      default:
        return "Unknown action"
    }
  }

  return (
    <Container maxWidth="xs" className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h4" component="h1" color="secondary" paragraph>
          Water Jug Solver
        </Typography>
        <Typography paragraph>
          You want to give 4 gallons of water to your friend. The problem is, you only have a 3 gallon jug and a 5
          gallon jug on hand. How do you fill the 5 gallon jug with exactly 4 gallons of water, using only these two
          jugs?
        </Typography>
      </Paper>
      <Paper className={classes.paper}>
        <Typography variant="h4" component="h2" color="secondary" paragraph>
          Parameters
        </Typography>
        <Typography variant="h6">Jug A</Typography>
        <Typography>
          How many units of water fit in <strong>jug A</strong>?
        </Typography>
        <NumericInput
          id="firstContainer"
          label="A"
          value={problemForm.firstContainer}
          onChange={(firstContainer) => setProblemForm({ ...problemForm, firstContainer })}
          max={99}
          min={1}
          step={1}
          disabled={loading}
        />

        <Typography variant="h6">Jug B</Typography>
        <Typography>
          How many units of water fit in <strong>jug B</strong>?
        </Typography>
        <NumericInput
          id="secondContainer"
          label="A"
          value={problemForm.secondContainer}
          onChange={(secondContainer) => setProblemForm({ ...problemForm, secondContainer })}
          max={99}
          min={1}
          step={1}
          disabled={loading}
        />

        <Typography variant="h6">Target</Typography>
        <Typography>
          How many units of water is our <strong>target</strong>?
        </Typography>
        <NumericInput
          id="target"
          label="A"
          value={problemForm.target}
          onChange={(target) => setProblemForm({ ...problemForm, target })}
          max={99}
          min={1}
          step={1}
          disabled={loading}
        />

        <Box mt={2}>
          <ButtonGroup>
            <Button
              startIcon={<ExtensionIcon />}
              color="primary"
              variant="contained"
              size="large"
              disabled={loading}
              onClick={handleShowSolution}
            >
              Get Solution
            </Button>
            <Button
              startIcon={<RotateLeftIcon />}
              variant="contained"
              size="large"
              disabled={loading}
              onClick={handleResetParameters}
            >
              Reset
            </Button>
          </ButtonGroup>
        </Box>
      </Paper>
      {data?.solution && (
        <Paper className={classes.paper}>
          <Typography variant="h4" component="h2" color="secondary" paragraph>
            Solution
          </Typography>
          {!data.solution.isSolved && (
            <>
              <Typography variant="h6">Woops!</Typography>
              <Typography>{data.solution.unsolvableMessage}.</Typography>
              <Typography>Please change the parameters and try again.</Typography>
            </>
          )}
          {data.solution.isSolved && (
            <>
              <Typography paragraph>
                <strong>{data.solution.steps.length}</strong> steps are needed to reach the target.
              </Typography>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Box
                    p={2}
                    display="flex"
                    justifyContent="space-between"
                    border={1}
                    borderColor="grey.200"
                    borderRadius="borderRadius"
                  >
                    <Box>
                      <Typography variant="body2" color="secondary">
                        Start
                      </Typography>
                      <Typography variant="body1">All jugs are empty</Typography>
                      {data.solution.steps[0].containers.map((container) => (
                        <Typography variant="body2">
                          Jug {container.name} has {container.size} capacity
                        </Typography>
                      ))}
                    </Box>
                    <Box width={150}>
                      {data.solution.steps[0].containers.map((container) => (
                        <Bucket label={container.name} fill={0} />
                      ))}
                    </Box>
                  </Box>
                </Grid>
                {data.solution.steps.map((step, i) => (
                  <Grid item>
                    <Box
                      p={2}
                      display="flex"
                      justifyContent="space-between"
                      border={1}
                      borderColor="grey.200"
                      borderRadius="borderRadius"
                    >
                      <Box>
                        <Typography variant="body2" color="secondary">
                          Step {i + 1}
                        </Typography>
                        <Typography variant="body1">{formatStepMessage(step)}</Typography>
                        {step.containers.map((container) => (
                          <Typography variant="body2">
                            Jug {container.name} has {container.amount} units
                          </Typography>
                        ))}
                      </Box>
                      <Box width={150}>
                        {step.containers.map((container) => (
                          <Bucket label={container.name} fill={container.amount / container.size} />
                        ))}
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Paper>
      )}
      <br />
    </Container>
  )
}

export default IndexPage
