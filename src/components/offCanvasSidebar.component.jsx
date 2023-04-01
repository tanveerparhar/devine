import { Accordion,Offcanvas } from "react-bootstrap";
import { useState } from "react";
import { winesRef } from '../utils/firebase.utils';
import { query, where, getDocs } from "firebase/firestore";

const OffCanvasSidebar = ({showOffCanvas, handleClose, handleSortRating, handleFilterCategory}) => {
    
    //const [showOffCanvasSideBar, setShowOffCanvasSideBar] = useState(true);
    

    return(
        <Offcanvas show={showOffCanvas} onHide={handleClose} placement={'end'}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filter / Sort</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
            <Accordion  flush>
                <Accordion.Item eventKey="0">
                <Accordion.Header>FILTER BY</Accordion.Header>
                <Accordion.Body>
                    <Accordion>
                        <Accordion.Header>Category</Accordion.Header>
                        <Accordion.Body className="cursor-pointer">
                            <div role="button" onClick={()=>handleFilterCategory('sparkling')}>Sparkling</div>
                            <div role="button" onClick={()=>handleFilterCategory('white')}>Whites</div>
                            <div role="button" onClick={()=>handleFilterCategory('red')}>Reds</div>
                            <div role="button" onClick={()=>handleFilterCategory('port')}>Port</div>
                            <div role="button" onClick={()=>handleFilterCategory('dessert')}>Dessert</div>
                            <div role="button" onClick={()=>handleFilterCategory('rose')}>Rose</div>
                        </Accordion.Body>
                    </Accordion>
                    
                </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                <Accordion.Header>SORT BY</Accordion.Header>
                <Accordion.Body>
                    <span onClick={handleSortRating}>
                        Rating
                    </span>
                    
                </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default OffCanvasSidebar;