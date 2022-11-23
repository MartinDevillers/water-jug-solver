import { makeStyles, createStyles, Button, ButtonGroup, InputProps, TextField, Theme } from "@material-ui/core"
import React from "react"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2),
    },
    input: {
      borderRadius: 0,
      backgroundColor: theme.palette.grey[200],
    },
  })
)

interface NumericInputProps {
  id: string
  label: string
  value: number
  onChange?: (value: number, name: string) => void
  disabled?: boolean
  errorText?: string
  helperText?: string
  autoFocus?: boolean
  min?: number
  max?: number
  step?: number
}

const NumericInput: React.FC<NumericInputProps> = ({
  id,
  label,
  value,
  onChange = null,
  disabled = false,
  errorText = null,
  helperText = null,
  autoFocus = false,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
}) => {
  const classes = useStyles()
  const inputProps: Partial<InputProps> = {
    // startAdornment: <InputAdornment position="start">{label}</InputAdornment>,
    inputProps: { min, max, step },
    classes: {
      root: classes.input,
    },
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.valueAsNumber
    if (Number.isNaN(newValue)) {
      newValue = null
    } else {
      const precision = 1 / step
      newValue = Math.round((newValue + Number.EPSILON) * precision) / precision
      newValue = Math.min(Math.max(newValue, min), max)
      if (newValue === 0) {
        newValue = null
      }
    }
    onChange(newValue, event.target.name)
  }

  return (
    <ButtonGroup className={classes.root}>
      <Button variant="contained" disableElevation onClick={() => onChange(Math.max(value - 10, min), id)}>
        - 10
      </Button>
      <Button variant="contained" disableElevation onClick={() => onChange(Math.max(value - 1, min), id)}>
        - 1
      </Button>
      <TextField
        id={id}
        name={id}
        variant="outlined"
        value={value || ""}
        onChange={handleChange}
        type="number"
        disabled={disabled || onChange === null}
        error={errorText !== null && errorText.length > 0}
        helperText={errorText || helperText}
        InputProps={inputProps}
        autoFocus={autoFocus}
      />
      <Button variant="contained" disableElevation onClick={() => onChange(Math.min(value + 1, max), id)}>
        + 1
      </Button>
      <Button variant="contained" disableElevation onClick={() => onChange(Math.min(value + 10, max), id)}>
        + 10
      </Button>
    </ButtonGroup>
  )
}

export default NumericInput
