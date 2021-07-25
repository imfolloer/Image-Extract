import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function App() {
  const classes = useStyles();
  const [myQuery, setMyQuery] = useState("");
  const [imgData, setImgData] = useState([]);
  const [pageNum, setPageNum] = useState([]);
  const items = [];

  let config = {
    params: {
      q: myQuery,
      pageNumber: "1",
      pageSize: "10",
      autoCorrect: "true"
    },
    headers: {
      "x-rapidapi-key": "YOUR API KEY",
      "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
    }
  };
  const initializeSearch = async () => {
    setPageNum();
    // GET request using axios inside useEffect React hook
    await axios
      .get(
        "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI",
        config
      )
      .then((response) => {
        imgExtractor(response.data.value); // Your function call
      });
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  };

  const handleClick = () => {
    initializeSearch();
  };

  function imgExtractor(data) {
    if (data) {
      for (var i = 0; i < 10; i++) {
        items.push(
          <div style={{ width: 500, height: 450 }}>
            <img style={{ height: 450 }} src={data[i].url} alt={myQuery} />
          </div>
        );
      }
      setPageNum(items);
    }
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <SearchIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Web Search
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Search Query"
                  autoFocus
                  onChange={(e) => setMyQuery(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              //type="submit"
              // fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              // onClick={handleClick}
              onClick={handleClick}
            >
              Search <SearchIcon />
            </Button>
          </form>
        </div>
        <Box mt={5}>
          <h1>Results:</h1>
          {myQuery}
          {pageNum}
        </Box>
      </Container>
    </>
  );
}
