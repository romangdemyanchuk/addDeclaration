import React, {useState, useEffect} from "react";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import {useHistory, Link} from "react-router-dom";

const ContactInfo = (props) => {
    let isButtonClick = props.history.location.state ?
        props.history.location.state.isButtonClick : false
    const history = useHistory();
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');


    const [storageData, setStorageData] = useState(null);
    useEffect(() => {
        setStorageData(JSON.parse(localStorage.getItem('contact')));
        console.log(45, storageData, isButtonClick)
        if(!isButtonClick && !storageData) {
            history.push('/')
        }
    }, []);
    const handleSubmit = (e) => {

        const el = { number, email}
        let item = JSON.stringify(el);
        localStorage.setItem('contact', item);
        history.push({
            pathname: '/photos',
            state: { isButtonClick: true }
        })
    };

    const numberChange = (e) => setNumber(e.target.value)
    const emailChange = (e) => setEmail(e.target.value)
    return (
        <Form onSubmit={handleSubmit}>
            <Col sm={10}>
                <FormGroup >
                    <AvForm>
                        <AvField value={storageData ? storageData.number : ''} name="number" label="phone number" type="text" required onChange={numberChange} />
                    </AvForm>
                </FormGroup>
            </Col>
            <Col sm={10}>
                <FormGroup >
                    <AvForm>
                        <AvField type="email" name="email" value={storageData ? storageData.email : ''} label="email" onChange={emailChange} />
                    </AvForm>
                </FormGroup>
            </Col>
            <FormGroup check row>
                <Col sm={{ size: 8, offset: 4 }}>
                    <Link to={'/'}>
                        <Button outline color="primary">Prev</Button>{' '}
                    </Link>
                    <Button disabled={number === ''} outline color="primary">Next</Button>{' '}
                </Col>
            </FormGroup>

        </Form>
    )
};

export default ContactInfo;
