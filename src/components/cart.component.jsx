import { Container,Row } from "react-bootstrap";
import {cartRef} from '../utils/firebase.utils';
import { getDocs } from "firebase/firestore";
import { useState, useEffect} from 'react';

const Cart = () => {
    const [cartData,setCartData] = useState([]);
    useEffect(() => {
        //loadWines("rose");
        let cartArray = [];
        async function retrieveCartDetails(){
            try {
                const docsSnap = await getDocs(cartRef);
                if(docsSnap.docs.length > 0) {
                    docsSnap.forEach(doc => {
                        cartArray.push(doc.data())
                     })
                     setCartData(cartArray)
                     console.log(cartArray)
                }
            } catch (error) {
                console.log(error);
            }
            
            
        }
        retrieveCartDetails()
        
    }, []);
   
    return(
        cartData.map(doc => {
            <Container className="">
                <Row>
                <img src={doc.image} className="rounded mx-auto d-bock" width="90px" height="280px"/>
                </Row>
                <Row>
                    {doc.wine}
                </Row>
                <Row>
                    {doc.location}
                </Row>
                <Row>
                    price: $50
                </Row>
                <Row>
                    {doc.quantity}
                </Row>
                <Row>
                    Total {50*doc.quantity}
                </Row>
            </Container>
        })  
    )
}

export default Cart;