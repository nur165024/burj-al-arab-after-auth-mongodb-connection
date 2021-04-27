import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import { UserContext } from '../../App';
import Booking from '../Booking/Booking';

const Book = () => {
    const {bedType} = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [selectedDate, setSelectedDate] = useState({
        InDate : new Date(),
        OutDate : new Date()
    });
    
    const handleInDate = (date) => {
        const newDate = {...selectedDate};
        newDate.InDate = date;
        setSelectedDate(newDate);
    };

    const handleOutDate = (date) => {
        const newDate = {...selectedDate};
        newDate.OutDate = date;
        setSelectedDate(newDate);
    };

    const handleBooking = () => {
        const newBooking = {...selectedDate, ...loggedInUser};
        fetch('http://localhost:4000/book/store',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newBooking)
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }

    return (
        <div style={{textAlign: 'center'}}>
            <h1>Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date picker inline"
                        value={selectedDate.InDate}
                        onChange={handleInDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Date picker dialog"
                        format="dd/MM/yyyy"
                        value={selectedDate.OutDate}
                        onChange={handleOutDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
                <Button variant="contained" onClick={handleBooking} color="primary">Book</Button>
            </MuiPickersUtilsProvider>
            <Booking></Booking>
        </div>
    );
};

export default Book;