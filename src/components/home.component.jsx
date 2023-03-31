import Image from 'react-bootstrap/Image';
import backgroundImage from "../assets/backgroundImage.jpg";

const Home = () => {
    return(
        <>
            <div className='justify-content-space-around'>
                <Image src={backgroundImage} fluid={true} rounded={true}/>
            </div>
        </>
    )  
}

export default Home;