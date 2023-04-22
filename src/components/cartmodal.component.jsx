import { Modal, Button } from "react-bootstrap";
import { addToCartCollec } from "../utils/firebase.utils";
import { useState } from "react";
import { Navigate, } from 'react-router-dom';

const CartModal = (props) => {
    //const {...props} = props
    //console.log(props)
    const[quantity,setQuantity] = useState(0);
    const[navigateToCart,setNavigateToCart] = useState(false);
    const {singlewinedata } = props;
    const{wine,location,winery,image} = singlewinedata;
    const handleAddToCart = () => {
        
        const addedToCart = addToCartCollec(wine,location,winery,image,quantity)
        setNavigateToCart(addedToCart)
        props.onHide()
        
    }

    return<>
    {navigateToCart && <Navigate to="/cart" replace={true} />} 
    <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Enter quantity to add to cart
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h4></h4>
        <img src ={image} width="90px" height="280px"/>
        <p>
            {wine}
        </p>
        <p>
            {winery}
        </p>
        <p>
            $51
        </p>
        <div>Quantity
        <input className='my-1' style={{width: '40.5%'}} type="number" min="0" max="20" step ="1" placeholder="Enter quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
        </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="dark" onClick={handleAddToCart}>Submit</Button>
        </Modal.Footer>
    </Modal>
    </>
}

export default CartModal;