import Button from 'react-bootstrap/Button';
import React, { useState,} from "react";
import { createUser,createWineCollec,signInUser } from '../utils/firebase.utils';
import { Toast,ToastContainer,Form} from 'react-bootstrap';

// style={{ width: '50rem' }}

const AddWine = () => {
    const [email, setEmail] = useState("");
    //const [password, setPassword] = useState("");
    //const [user, setUser] = useState("");
    const [wineName, setWineName] = useState("");
    const [wineCategory, setWineCategory] = useState("Select Wine");
    const [wineLocation, setWineLocation] = useState("");
    const [wineRating, setWineRating] = useState("");
    const [winery, setWinery] = useState("");
    const [wineImage, setWineImage] = useState("");
    const [wineAdded, setWineAdded] = useState("");
    const [type, setType] = useState(false);
    const [showA, setShowA] = useState(true);

    const onHandleSubmit = async () => {
        console.log("wines", wineName,wineCategory,wineLocation,wineRating,winery,wineImage)
        const wineAdded = await createWineCollec({wineName,wineCategory,wineLocation,wineRating,winery,wineImage});
        setWineAdded(wineAdded);
        setShowA(true);

        console.log("wineadded",wineAdded)
    }

    const toggleShowA = () => setShowA(!showA);
    const resultToast = (res) =><ToastContainer className="p-3" position={`top-end`}>
                                    <Toast show={showA} onClose={toggleShowA} bg={res ? `success` : `danger`}>
                                        <Toast.Header>
                                        {/* <img
                                            src=""
                                            className="rounded me-2"
                                            alt=""
                                        /> */}
                                        <strong className="me-auto">Notification</strong>
                                        </Toast.Header>
                                        <Toast.Body className="text-white">{res ? `wine details successfully added` : `something went wrong, check console`}</Toast.Body>
                                    </Toast>
                                </ToastContainer>

    return(
        <>
            {/* {user && <Navigate to="/" replace={true} />} */}
            {wineAdded === '' ? true : (wineAdded ? resultToast(wineAdded) : resultToast(wineAdded))}
            <div className='d-flex flex-column align-items-center border border-dark' style={{margin:'10rem'}}>
                <h1 className='py-3'>Add Wine Details</h1>
                <div className='py-1'>
                    <input type="text" placeholder="Enter wine name"  value={wineName} onChange={(e) => setWineName(e.target.value)}/>
                </div>
                {/* <Form.Select className='border border-dark rounded-0' style={{width: '40.5%'}} //value={type}
                onChange={e => {
                    console.log("e.target.value", e.target.value);
                    //setType(e.target.value);
                }}> */}
                
                <Form.Control
                    as="select"
                    className='border border-dark rounded-0 py-1' style={{width: '40.5%'}}
                    value={wineCategory}
                    onChange={(e) => setWineCategory(e.target.value)}>
                    <option value="Sparkling">Sparkling</option>
                    <option value="Rose">Rose</option>
                    <option value="White">White</option>
                </Form.Control>
                <div className='py-1'>
                    <input type="text" placeholder="Enter wine location" value={wineLocation} onChange={(e) => setWineLocation(e.target.value)}/>
                </div>
                <div className='py-1'>
                    <input type="text" placeholder="Enter wine rating" value={wineRating} onChange={(e) => setWineRating(e.target.value)}/>
                </div>
                <div className='py-1'>
                    <input type="text" placeholder="Enter winery" value={winery} onChange={(e) => setWinery(e.target.value)}/>
                </div>
                <Form.Group controlId="formFile" className="py-1" style={{width: '41%' }}>
                    <Form.Control type="file" name="wineImage" 
                        onChange={(event) => {
                        console.log(event.target.files[0],"name of wine image");
                        setWineImage(event.target.files[0]);
                        }}/>
                </Form.Group>
                {/* <div className='py-1'>
                    <input
                        type="file"
                        name="wineImage"
                        onChange={(event) => {
                        console.log(event.target.files[0]);
                        setWineImage(event.target.files[0]);
                        }}
                    /> */}
                    {/* <input type="text" placeholder="Enter wine picture" value={wineImage} onChange={(e) => setWinery(e.target.value)}/> */}
                {/* </div> */}
                <Button  className='my-3' variant="primary" type="submit" onClick={onHandleSubmit}>
                    Add Category
                </Button>
            </div>
        </>
    )
}

export default AddWine;
