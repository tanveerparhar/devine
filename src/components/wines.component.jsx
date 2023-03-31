import { useState, useEffect} from 'react';
import { Button, Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import wineDefault from "../assets/wineDefault.png";
import { winesRef } from '../utils/firebase.utils';
import { query, where, getDocs } from "firebase/firestore";

const Wines = () => {
    const [wines, setWines] = useState([]);
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

    // Create a query against the collection.
    const onCategorySelect = async () =>{
        const newWines =[];
        try{
            const result = query(winesRef, where("wineCategory", "==", "asf"));
            //console.log(" wine category result=> ", result);
            const querySnapshot = await getDocs(result);
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

    return(
        <Container className='d-flex'>
        <div className='d-flex flex-column-reverse justify-content-end my-4'>
            {/* <div>Categories</div> */}
            <Card style={{ width: '7.96rem' }} className='my-3'>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                <Card.Text>
                <Button onClick={()=>loadWines("reds")}>REDS</Button>
                </Card.Text>
                </Card.Body>
            </Card>
            <Card style={{ width: '7.96rem' }} className='my-3'>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Text>
                    <Button onClick={()=>loadWines("whites")}>WHITES</Button>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card style={{ width: '7.96rem' }} className='my-3'>
            <Card.Header >Categories</Card.Header>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Text>
                        <Button onClick={onCategorySelect}>asf</Button>
                    </Card.Text>
                </Card.Body>
            </Card>
            
        </div>
        <Container>
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
        </Container>
    )
}

export default Wines;