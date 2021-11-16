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

};
export const Dashboard;