import {
  Button,
  Container,
  Typography,
  makeStyles,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
} from "@material-ui/core";
import { KeyboardArrowRight } from "@material-ui/icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Create() {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);

  const [category, setCategory] = useState("money");

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (title == "") {
      setTitleError(true);
    }
    if (details == "") {
      setDetailsError(true);
    }

    if (title && details) {
      fetch("http://localhost:8000/notes", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, details, category }),
      }).then(() => history.push("/"));
    }
  };

  return (
    <Container>
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        color="textSecondary"
        className={classes.title}
      >
        Create a new Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
          className={classes.field}
        />
        <TextField
          onChange={(e) => setDetails(e.target.value)}
          label="Details"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          multiline
          rows={4}
          error={detailsError}
          className={classes.field}
        />
        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel control={<Radio />} value="money" label="Money" />
            <FormControlLabel control={<Radio />} value="todos" label="Todos" />
            <FormControlLabel
              control={<Radio />}
              value="reminders"
              label="Reminders"
            />
            <FormControlLabel control={<Radio />} value="works" label="Works" />
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRight />}
          className={classes.btn}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}

const useStyles = makeStyles({
  btn: {
    fontSize: 20,
    "&:hover": {
      backgroundColor: "black",
    },
  },
  title: {
    marginBottom: 20,
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});
