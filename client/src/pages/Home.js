//dashboard displaying possible workouts to browze  
//option to select only if logged in
<<<<<<< HEAD
import React from "react";
import Auth from '../utils/auth';
import { useMutation } from '@apollo/react-hooks';
import {  Container, Card, CardColumns } from 'react-bootstrap';


const Home = () => {
    //create state to hold exercise api data
    //create state to hold saved exercises

=======
import React, { useEffect } from "react";
import {  Container, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
import { useMutation } from '@apollo/react-hooks';
import { GET_ME } from '../utils/mutations';
import { SAVE_CIRCUIT } from "../utils/mutations";
import { saveCircuitId, getSavedCircuitId } from "../utils/localStorage";

const Home = () => {
//create state to hold circuits from api data
    const [displayCircuits, setDisplayCircuits] =  useState([]);

    const [savedCircuitIds, setSavedCircuitIds] = useState(getSavedCircuitId());
    const [saveCircuit] = useMutation(SAVE_CIRCUIT);
>>>>>>> develop
    // set up useEffect hook to save `savedExercises` 
    //list to localStorage on component unmount too keep pwa functionality
//possible to set unmount to after 2 weeks of no use?
    //method to display api data 
<<<<<<< HEAD
    const exerciseList = exercises.data.map((exercise) => (
        <div className="col-xs-12 col-md-4 col" key={exercise.id}>
          <div className="box">
            <PetSection exercise={exercise} />
          </div>
        </div>
      ));

            //should this take acircuitId from a curcuit thats been selected?
      const handleSaveExercise = async(exerciseId )
=======

    useEffect(() => {
        return () => saveCircuitId(savedCircuitIds);
    });
    setDisplayCircuits(circuitData);
    
//circuitData to display on homepage
    // const circuitData = items.map((circuit) => ({
    //     circuitId: circuit.circuitId,
    //     name: circuit.name,
    //     exercises: exercises.map((exercise)=> ({
    //         name: exercise.name,
    //         rep: exercise.rep,
    //     }));
    //   
    //   })

      const handleSaveCircuit= async(circuitId) => {
          const circuitToSave = displayCircuits.find((circuit) => circuit.circuitId === circuitId);
          const token = Auth.loggedIn() ? Auth.getToken() : null;
          if(!token){
              return false;
          }

          try {
              await saveCircuit({
                  variables: {circuit: circuitToSave},
                  /**ref booksearch fot  this cache part */
                  update: cache => {
                    const {me} = cache.readQuery({ query: GET_ME });
                   // cache.writeQuery({data: { me: { ...me, savedBooks: [...me.savedBooks, bookToSave]});
                  }
              }),
              setSavedCircuitIds([ ...savedCircuitIds, circuitToSave.circuitId]);
          } catch(err){
              console.log(err);
          }
      };

>>>>>>> develop
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
<<<<<<< HEAD
                            <p className="small">Reps: {circuit.reps}</p>
=======
>>>>>>> develop
                        </Card.Body>
                        <Card.Text>
                            {circuit.exercises.map((exercise) => {
                                return(
<<<<<<< HEAD
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
=======
                                    <p>{exercise.name} x {exercise.reps}</p>
                                );
                               
>>>>>>> develop
                            })}
                        </Card.Text>
                    </Card>
                )
            })}
        </CardColumns>
        </>
      )
<<<<<<< HEAD
};
=======
};

export default Home;

/** 
 * use with auth to only show save button when logged in
 * <Button
                                disabled={savedCircuitIds?.some((savedCircuitId) => savedCircuitId === circuit.circuitId)}
                                className='btn-block btn-info'
                                onClick={() => handleSaveCircuit(circuit.circuitId)}>
                                {savedCircuitIds?.some((savedCircuitId) => savedBookId === book.bookId)
                                  ? 'This book has already been saved!'
                                  : 'Save this Book!'}
                              </Button> */
>>>>>>> develop
