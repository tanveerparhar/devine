import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import fb from "../assets/fb.png";
import insta from "../assets/insta.png";
import twitter from "../assets/twitter.png";
import logo from "../assets/wine.png";

const Footer = () => {
return (
	<>
        <div className='p-5 text-light' style={{backgroundColor:'#0e1b30'}}>
            <Row>
                <Col md={6}>
                    <Row>
                        <Col className="px-0" sm={2}>
                            <img alt=""
                                src={logo} //user
                                width="80"
                                height="100"
                                style={{filter: 'invert(90%)'}}
                            />
                        </Col>
                        <Col sm={10} className="px-0 ">
                            <b className='text-muted'>Devine wines, put some stuff here........</b>
                        </Col>
                    </Row>                
                </Col>
                <Col className="" md={3}>
                    <b className='p-5 '>Information</b>
                    <Nav.Link href="#" className='px-5 py-3'>Basic info</Nav.Link>  
                </Col>
                <Col md={3}>
                    <b className='p-5 '>Get In Touch</b>
                    <Nav.Link href="#" className='px-5 my-3 font-italic'>Email</Nav.Link>
                    <Nav.Link href="#" className='px-5 mb-5'>Address</Nav.Link>
                    <div className='d-flex  px-5'>
                        <Nav.Link href="#">
                            <img alt=""
                                src={fb} //user
                                width="28"
                                height="28"
                                className="me-3"
                            />
                        </Nav.Link>
                        <Nav.Link href="#">
                            <img alt=""
                                src={insta} //user
                                width="30"
                                height="30"
                                className="me-3"
                            />
                        </Nav.Link>
                        <Nav.Link href="#">
                            <img alt=""
                                src={twitter} //user
                                width="30"
                                height="30"
                                className=""
                            />
                        </Nav.Link>
                    </div>
                </Col>
                {/* <Col>
                    <b>Social Media</b>
                    
                    <i className="fab fa-youtube">
                        <span style={{ marginLeft: "10px" }}>
                        Youtube
                        </span>
                    </i>
                    
                </Col> */}
            </Row>
            <Row xs="auto" className='mt-5'>
                <Col className='text-muted'>copy</Col>
                <Col className='text-muted'>Terms</Col>
                <Col className='text-muted'>Policy</Col>
            </Row>
        </div>
    </>
);
};
export default Footer;
