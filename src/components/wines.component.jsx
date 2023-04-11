import { useState, useEffect} from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import wineDefault from "../assets/wineDefault.png";
import { winesRef,storage } from '../utils/firebase.utils';
import { ref, getDownloadURL } from "firebase/storage";
import { query, where, getDocs, orderBy } from "firebase/firestore";
import OffCanvasSidebar from './offCanvasSidebar.component';

const Wines = () => {
    const [wines, setWines] = useState([]);
    const [imageArray, setImageArray] = useState([]);
    const [showOffCanvas, setShowOffCanvas] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false)
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

    // image async await handle
    const handleImage = async(doc,urlArray) => {
        const imgURL = await getDownloadURL(ref(storage, `${doc.data().wineImage}`))
        urlArray.push(imgURL)
    }

    //reusable snapshot code
    const handleSnapshot = async(qry) => {
        const newWines = [];
        let imgURL;
        let urlArray=[];
        setShowSpinner(true);
        try{
            const res = query(winesRef, qry);
            const querySnapshot = await getDocs(res);
            console.log(querySnapshot)
            querySnapshot.forEach(async(doc) => {
                handleImage(doc, urlArray)

                // doc.data() should be  never undefined for query doc snapshots
                const updatedNames = {
                    id : doc.id,
                    //image : await getDownloadURL(ref(storage, `${doc.data().wineImage}`)),
                    wine : doc.data().wineName,
                    winery : doc.data().winery,
                    rating : doc.data().wineRating,
                    location : doc.data().wineLocation,
                };
                newWines.push(updatedNames);
                //console.log(doc.id, " => ", doc.data().wineRating);
                
        });
        } catch(error) {
            console.error("Someting went wrong in running query ", error)
        }
        setShowSpinner(false)
        Promise.all(urlArray).then(value => setImageArray(urlArray))
        setWines(newWines);
    }

    const handleFilterCategory = (category) =>{
        handleSnapshot(where("wineCategory", "==", `${category}`))
     }

    const handleSortRating = () => {
       handleSnapshot(orderBy("wineRating", "desc"))
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

            {
            showSpinner ? <Spinner animation="border" />
            :
            <div className='d-flex flex-wrap justify-content-between'>
                {wines.map((data, i) =>{
                    return(
                        <Card key={data.id} className='my-3' style={{  width: '200px', border:0 }}>
                            {/* <Card.Img variant="top" src={data.image}/> */}
                            <img src={data.image || imageArray[i]} className="rounded mx-auto d-bock" onError={onImageError} width="90px" height="280px"/>
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
            }
        </Container>
    )
}

export default Wines;