import React, {useState, useEffect} from "react";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import {useHistory, Link} from "react-router-dom";
import {getDataFromStorage} from "./functions";

const ContactInfo = () => {
    let previousTab = 'main'
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');

    const history = useHistory();
    useEffect(() => {
        if (getDataFromStorage(previousTab)?.isTabValid) {
            const data = getDataFromStorage('contact');
            if (data) {
                setNumber(data.number);
                setEmail(data.email);
            }
        } else { history.push('/') }
    }, []);
    const handleSubmit = () => {
        localStorage.setItem("contact", JSON.stringify({ number, email, isTabValid: true }))
        history.push('/photos');
    }

    const numberChange = (e) => setNumber(e.target.value)
    const emailChange = (e) => setEmail(e.target.value)
    return (
        <Form onSubmit={handleSubmit}>
            <Col sm={3}>
                <FormGroup >
                    <AvForm>
                        <AvField value={number} name="number" label="phone number" type="text" required onChange={numberChange} />
                    </AvForm>
                </FormGroup>
            </Col>
            <Col sm={3}>
                <FormGroup >
                    <AvForm>
                        <AvField type="email" name="email" value={email} label="email" onChange={emailChange} />
                    </AvForm>
                </FormGroup>
            </Col>
            <FormGroup check row>
                <Col sm={{ size: 2, offset: 0 }}>
                    <Link to={'/'}>
                        <Button size="sm" outline color="primary">Prev</Button>{' '}
                    </Link>
                    <Button size="sm" disabled={number === ''} outline color="primary">Next</Button>{' '}
                </Col>
            </FormGroup>

        </Form>
    )
};

export default ContactInfo;
