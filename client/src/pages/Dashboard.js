//auth user dashboard with saved workouts
import React from 'react';
import { Container, CardColumns, Card, Button } from 'react-bootstrap';

//import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { REMOVE_CIRCUIT } from '../utils/mutations';
import { GET_ME } from '../utils/queries';

const Dashboard = () => {
    const { loading, data } = useQuery(GET_ME);
    const [removeCircuit] = useMutation(REMOVE_CIRCUIT);

    //empty set if none saved
    const userData = data?.me || [];

    //handler for marking circuit as complete
    const handleCompleteCircuit = async (circuitId) => {

    };
    //handler for removing circuit from dashboard still incomplete
    const handleDeleteCircuit = async (circuitId) => {

    }

    if (loading) {
        return <h2>LOADING...</h2>;
    }

    return (
        <>
          <Jumbotron fluid className='text-light bg-dark'>
            <Container>
              <h1>Your Saved Circuits</h1>
            </Container>
          </Jumbotron>
          <Container>
            <h2>
              {userData.savedCircuits.length
                ? `You have ${userData.savedCircuits.length} saved ${userData.savedCircuitss.length === 1 ? 'circuits' : 'circuit'}: left to complete!`
                : 'You have no saved circuits yet'}
            </h2>
            <CardColumns>
              {userData.savedCircuits.map((circuit) => {
                return (
                    <Card key = {circuit.curcuitId}>
                    <Card.Body>
                        <Card.Title>{circuit.name}</Card.Title>
                    </Card.Body>
                    <Card.Text>
                        {circuit.exercises.map((exercise) => {
                            return(
                                <p>{exercise.name} x {exercise.reps}</p>
                            );
                           
                        })}
                    </Card.Text>
                </Card>
                );
              })}
            </CardColumns>
          </Container>
        </>
      );
};

export const Dashboard;
