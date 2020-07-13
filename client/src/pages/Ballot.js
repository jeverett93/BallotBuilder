import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";
import API from '../utils/API';
import Card from '../components/Card';
import GridList from '@material-ui/core/GridList';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: "20px",
  },
  header: {
    padding: "25px",
    margin: "20px",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  gridList: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});

const Ballot = () => {
  const classes = useStyles();
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = () => {
    API.getSaved()
      .then(res => {
        console.log(res.data)
        setCandidates(res.data)
      })
      .catch(err => console.log(err))
  }

  const deleteCandidate = (id) => {
    API.deleteCandidate(id)
      .then(res => loadCandidates())
    .catch(err => console.log(err))
  }
  
  
    return (
      <Container className={classes.root}>
        <Box border={2} borderColor="secondary.main" className={classes.header}>
          <Typography variant="h1">My Ballot</Typography>
        </Box>
        <GridList className={classes.gridList} cols={3}>
          {candidates.map((candidate, i) => (
            <Card
              key={i}
              id={candidate._id}
              candidateId={candidate.candidateId}
              candidateName={candidate.candidateName}
              candidatePhoto={candidate.candidatePhoto}
              candidateParty={candidate.candidateParty}
              action={() => {
                deleteCandidate(candidate._id);
              }}
              btncontent="Remove from My Ballot"
            />
          ))}
        </GridList>
      </Container>
    );
}
 
export default Ballot;