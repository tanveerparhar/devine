import { Container,Row,Col } from "react-bootstrap";
import {cartRef} from '../utils/firebase.utils';
import { getDocs } from "firebase/firestore";
import { useState, useEffect} from 'react';
import redWineCard from "../assets/redWineCard.webp";
import whiteWineCard from "../assets/whiteWineCard.webp";

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
        //cartData.map(doc => {
            <>
            <Container className='my-3 d-flex' style={{  width: '600px', border:0 }}>
                <div className="mx-5">
                <Row>
                    <img src={redWineCard} className="mx-4 rounded mx-auto d-block" width="90px" height="100px"/>
                </Row>
                </div>
                
                <div>
                <Row>
                    REdWine
                </Row>
                <Row>
                   Montreal
                </Row>
                <Row>
                    price: $50
                </Row>
                <Row>
                    Quantity: 5
                </Row>
                </div>
                
            </Container>
            <Container className='my-4 d-flex' style={{  width: '600px', border:0 }}>
            <div className="mx-5">
            <Row>
                <img src={whiteWineCard} className="rounded mx-auto d-block" width="90px" height="100px"/>
            </Row>
            </div>
            
            <div>
            <Row>
                Rose Wine
            </Row>
            <Row>
               China
            </Row>
            <Row>
                price: $70
            </Row>
            <Row>
                Quantity: 2
            </Row>
            
            <div className="my-5 mr-1">
                    <h4>Total : $390</h4>
                </div>
            </div>
            
        </Container>
       
        </>
        //})  
    )
}

export default Cart;