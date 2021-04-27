import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Booking = () => {
    const [book,setBook] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    console.log(loggedInUser.email);
    useEffect(() => {
        fetch(`http://localhost:4000/booking?email=${loggedInUser.email}`,{
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => setBook(data))
    },[])

    return (
        <div style={{ marginTop:'50px' }}>
            <ul>
                {
                    book.map(bk => 
                        <li><b>Name :</b> {bk.name}, <b>E-mail :</b> {bk.email}, <b>InDate :</b> {(new Date(bk.InDate).toDateString('dd/MM/yyyy'))}, <b>EndDate :</b> { (new Date(bk.OutDate).toDateString('dd/MM/yyyy')) }</li>
                    )   
                }
            </ul>
        </div>
    );
};

export default Booking;