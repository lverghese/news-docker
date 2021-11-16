//dashboard displaying possible workouts to browze  
//option to select only if logged in
import React from "react";
import Auth from '../utils/auth';
import { useMutation } from '@apollo/react-hooks';
import {  Container, Card, CardColumns } from 'react-bootstrap';


const Home = () => {
    //create state to hold exercise api data
    //create state to hold saved exercises

    // set up useEffect hook to save `savedExercises` 
    //list to localStorage on component unmount too keep pwa functionality
//possible to set unmount to after 2 weeks of no use?
    //method to display api data 
    const exerciseList = exercises.data.map((exercise) => (
        <div className="col-xs-12 col-md-4 col" key={exercise.id}>
          <div className="box">
            <PetSection exercise={exercise} />
          </div>
        </div>
      ));

            //should this take acircuitId from a curcuit thats been selected?
      const handleSaveExercise = async(exerciseId )
      return (
          <>
        <Container>
            <h1>Choose from our circuits</h1>
        </Container>
        <CardColumns>
            {circuits.map((circuit) => {
                return(
                    <Card key = {circuit.curcuitId}>
                        <Card.Body>
                            <Card.Title>{circuit.name}</Card.Title>
                            <p className="small">Reps: {circuit.reps}</p>
                        </Card.Body>
                        <Card.Text>
                            {circuit.exercises.map((exercise) => {
                                return(
                                    <p>{exercise.name}</p>
                                );
                                <Button
                                disabled={savedCircuitIds?.some((savedCircuitId) => savedCircuitId === circuit.circuitId)}
                                className='btn-block btn-info'
                                onClick={() => handleSaveCircuit(circuit.circuitId)}>
                                {savedCircuitIds?.some((savedCircuitId) => savedBookId === book.bookId)
                                  ? 'This book has already been saved!'
                                  : 'Save this Book!'}
                              </Button>
                            })}
                        </Card.Text>
                    </Card>
                )
            })}
        </CardColumns>
        </>
      )
};