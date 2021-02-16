import React, {useState, useEffect} from "react";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import {useHistory} from "react-router-dom";
import {getDataFromStorage} from "./functions";

const Main = () => {
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(false);
    const [isTabValid, setIsTabValid] = useState(false);

    const history = useHistory();

    useEffect(() => {
        const data = getDataFromStorage('main');
        if (data) {
            setHeading(data.heading);
            setDescription(data.description);
            setStatus(data.status);
        }
    }, []);

    const headingChange = (e) => setHeading(e.target.value)
    const descriptionChange = (e) => setDescription(e.target.value)
    const statusChange = (e) => setStatus(e.target.checked)
    const handleSubmit = () => {
        localStorage.setItem("main", JSON.stringify({ heading, description, status, isTabValid: true }))
        history.push('/contact')
    };
    return (
        <Form
            onSubmit={handleSubmit}
        >
            <Col sm={3}>
                <FormGroup >
                    <AvForm>
                        <AvField
                            name="heading"
                            label="heading"
                            type="text"
                            value={heading}
                            required
                            onChange={headingChange}
                        />
                    </AvForm>
                </FormGroup>
            </Col>
            <Col sm={3}>
                <FormGroup >
                    <AvForm>
                        <AvField type="textarea" name="description" value={description} label="description"  onChange={descriptionChange}/>
                    </AvForm>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup check>
                    <AvForm check>
                        <AvField type="checkbox" label="status" name="status" checked={status} onChange={statusChange}/>{' '}
                    </AvForm>
                </FormGroup>
            </Col>
            <FormGroup to={'/contact'}  check row>
                <Col sm={{ size: 10, offset: 0 }}>
                    <Button size="sm" disabled={heading === ''} type="submit" outline color="primary">Next</Button>{' '}
                </Col>
            </FormGroup>
        </Form>
    )
};

export default Main;
