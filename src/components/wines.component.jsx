import { useState, useEffect} from 'react';
import { Button, Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import wineDefault from "../assets/wineDefault.png";
import { winesRef } from '../utils/firebase.utils';
import { query, where, getDocs, orderBy } from "firebase/firestore";
import OffCanvasSidebar from './offCanvasSidebar.component';

const Wines = () => {
    const [wines, setWines] = useState([]);
    const [showOffCanvas, setShowOffCanvas] = useState(false);
    const handleClose = () => setShowOffCanvas(false);
    const handleShow = () => setShowOffCanvas(true);

    useEffect(() => {
        loadWines("rose");
    }, []);

    const loadWines = async(type) => {
        const winesData = await fetch(`https://api.sampleapis.com/wines/${type}`);
        const resp = await winesData.json();
        setWines(resp);
    }

    //if theres no image, sets a default one
    const onImageError = ({currentTarget}) =>{
        console.log(currentTarget)
        currentTarget.onerror = null;
        currentTarget.src = wineDefault;
    }

    //reusable snapshot code
    const handleSnapshot = async(qry) => {
        const newWines =[];
        try{
        const res = query(winesRef, qry);
        const querySnapshot = await getDocs(res);
            // console.log("snapshot => ", querySnapshot);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                const updatedNames = {
                    id : doc.id,
                    image : doc.data().wineImage,
                    wine : doc.data().wineName,
                    winery : doc.data().winery,
                    rating : doc.data().wineRating,
                    location : doc.data().wineLocation,
                };
                newWines.push(updatedNames);
                console.log(doc.id, " => ", doc.data());
            });
        } catch(error) {
            console.error("Someting went wrong in running query ", error)
        }
        //console.log(newWines)
        setWines(newWines);
    }
    // Create a query against the collection.
    const onCategorySelect = async (category) =>{
       
    }

    const handleFilterCategory = async (category) =>{
        handleSnapshot(where("wineCategory", "==", `${category}`))
     }

    const handleSortRating = () => {
       handleSnapshot(orderBy("wineRating"))
    }

    return(
        <Container className=''>
            <div className='display-6'><i>CATEGORIES</i></div>
            <div className='d-flex my-4'>
                <Card style={{ width: '7.96rem' }} className='mr-3'>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                    <Card.Text>
                    <Button onClick={()=>loadWines("reds")}>REDS</Button>
                    </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{ width: '7.96rem' }} className='mx-3'>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Text>
                        <Button onClick={()=>loadWines("whites")}>WHITES</Button>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{ width: '7.96rem' }} className='mx-3'>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Text>
                            <Button onClick={()=>loadWines("rose")}>ROSE</Button>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            {showOffCanvas && <OffCanvasSidebar showOffCanvas handleClose={handleClose} handleSortRating={handleSortRating} handleFilterCategory={handleFilterCategory}/>}
            <div className='d-flex justify-content-end my-2'>
                <Button variant="outline-dark" onClick={handleShow} className="me-2">
                    Filter & Sort
                </Button>
            </div>
            <div className='d-flex flex-wrap justify-content-between'>
                {wines.map((data) =>{
                    return(
                        <Card key={data.id} className='my-3' style={{  width: '200px', border:0 }}>
                            {/* <Card.Img variant="top" src={data.image}/> */}
                            <img src={data.image} className="rounded mx-auto d-bock" onError={onImageError} width="90px" height="280px"/>
                            <Card.Body>
                                <Card.Title>{data.wine}</Card.Title>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>winery: {data.winery}</ListGroup.Item>
                                    <ListGroup.Item>rating: {data.rating.average || data.rating}</ListGroup.Item>
                                    <ListGroup.Item>location: {data.location}</ListGroup.Item>
                                </ListGroup>
                                {/* <Button variant="primary">Go somewhere</Button> */}
                            </Card.Body>
                        </Card>  
                    )
                }         
                )}
            </div>
        </Container>
    )
}

export default Wines;