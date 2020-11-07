import React, {useState, useEffect} from 'react'; 
import {Container, Row, Col} from 'reactstrap';
import WorkoutCreate from './WorkoutCreate';
import WorkoutTable from './WorkoutTable';
import WorkoutEdit from './WorkoutEdit';

const WorkoutIndex = (props) => {
    const [workouts, setWorkouts] = useState([]); // state variable is an Array that we'll fill with the workout objects return from our workoutlog server. 
    const [updateActive, setUpdateActive] = useState('false');
    const [workoutToUpdate, setWorkoutToUpdate] = useState({});

    
    const fetchWorkouts = () => {
        fetch('http://localhost:8000/log', {
            method: 'GET', 
            headers: new Headers({
                'Content-Type': 'application/json', 
                'Authorization': props.token
            })
        }) .then(res => res.json())
        .then(logData => setWorkouts(logData)) // if you console.log(logData) you will see an empty array in the console. This means that the server is reflecting that the current user logged in does not have any workouts created yet.  
    }

    useEffect(() => {
        fetchWorkouts();
    }, []) // empty array will allow us to call the fetchWorkouts function only once which is what we want since we want to load our workouts from the function, automatically, one time to the DOM 

    return (
        <div>
            <Container>
                <Row>
                    <Col md="3">
                       <WorkoutCreate fetchWorkouts={fetchWorkouts} token={props.token}/>
                    </Col>
                    <Col md="9">
                        <WorkoutTable workouts={workouts} fetchWorkouts={fetchWorkouts} token={props.token} />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default WorkoutIndex; 