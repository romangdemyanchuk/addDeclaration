import React, {useState, useEffect} from "react";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import {useHistory} from "react-router-dom";

const Main = () => {
    const [storrageData, setStorrageData] = useState(null);
    useEffect(() => {
        setStorrageData(JSON.parse(localStorage.getItem('main')));
    }, [])
    const history = useHistory();
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');

    const headingChange = (e) => setHeading(e.target.value)
    const descriptionChange = (e) => setDescription(e.target.value)
    const statusChange = (e) => setStatus(e.target.value)

    const handleSubmit = (e) => {
        let existingEntries = JSON.parse(localStorage.getItem("main"));
        history.push('/')
        if(existingEntries == null)
            localStorage.setItem("main", JSON.stringify([]))
        else {
            const el = { heading, description, status}
            console.log(1,existingEntries, el);
            // let a = {
            //     ...existingEntries, ...el, heading: heading !== '' ? heading :, description: description, status: status
            // }
            // localStorage.setItem('main', JSON.stringify(a));
            history.push('/')
        }
        // const el = { heading, description, status}
        // let item = JSON.stringify(el);
        // localStorage.setItem('main', item);
        history.push({
            pathname: '/contact',
            state: { isButtonClick: true }
        })
    };
    return (
        <Form
            onSubmit={handleSubmit}
        >

                <Col sm={10}>
                    <FormGroup >
                        <AvForm>
                            <AvField name="heading" label="heading" type="text" value={storrageData ? storrageData.heading : ''} required onChange={headingChange} />
                        </AvForm>
                    </FormGroup>
                </Col>
            <Col sm={10}>
                <FormGroup >
                    <AvForm>
                        <AvField type="textarea" name="description" value={storrageData ? storrageData.description : ''} label="description"  onChange={descriptionChange}/>
                    </AvForm>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup check>
                    <AvForm>
                        <AvField type="checkbox" label="status" name="status" value={storrageData ? storrageData.status : ''}  onChange={statusChange}/>{' '}
                    </AvForm>
                </FormGroup>
            </Col>
            <FormGroup to={'/contact'}  check row>
                <Col sm={{ size: 10, offset: 2 }}>
                    <Button type="submit" outline color="primary">Next</Button>{' '}
                </Col>
            </FormGroup>
        </Form>
    )
};

export default Main;
