import React, {useState, useEffect} from "react";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import {Link} from "react-router-dom";
import Modal from "./Modal";
import {useHistory} from "react-router-dom";
import SuccessModal from "./Modal";

const Publication = (props) => {
    let isButtonClick = props.history.location.state ?
        props.history.location.state.isButtonClick : false
    const [storageData, setStorageData] = useState(null);
    const history = useHistory();
    const [modal, setModal] = useState(false);
    const [food, setFood] = useState('');
    const [program, setProgram] = useState('');
    const [taxi, setTaxi] = useState('');
    const [restRoom, setRestRoom] = useState('');
    const [beverages, setBeverages] = useState('');

    const foodChange = (e) => setFood(e.target.value)
    const programChange = (e) => setProgram(e.target.value)
    const taxiChange = (e) => setTaxi(e.target.value)
    const restRoomChange = (e) => setRestRoom(e.target.value)
    const beveragesChange = (e) => setBeverages(e.target.value)
    // useEffect(() => {
    //     setStorageData(JSON.parse(localStorage.getItem('images')));
    //     console.log(45, storageData, isButtonClick)
    //     if(!isButtonClick && !storageData) {
    //         history.push('/photos')
    //     }
    // }, []);
    const handleSubmit = (e) => {
        setModal(true)
        e.preventDefault();
        const el = { food, program, taxi, restRoom, beverages}
        let item = JSON.stringify(el);
        localStorage.setItem('services', item);
        let contact = JSON.parse(localStorage.getItem('contact'));
        let main = JSON.parse(localStorage.getItem('main'));
        let images = JSON.parse(localStorage.getItem('images'));
        let services = JSON.parse(localStorage.getItem('services'));
        const all = { contact, main, services, images}
        let elem = JSON.stringify(all);
        localStorage.setItem('formData', elem);
        // history.push('/public')
    };
    const toggle = () => setModal(!modal);
    return (
        <>
            <SuccessModal toggle={toggle} modal={modal}/>

            <Form onSubmit={handleSubmit}
            >
                <Col>
                    <FormGroup check>
                        <Input type="checkbox" label="food" name="status" onChange={foodChange}/>{' '}
                        <Label for="status">food</Label>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup check>
                        <Input type="checkbox" label="culture program" name="status" onChange={programChange}/>{' '}
                        <Label for="status">culture program</Label>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup check>
                        <Input type="checkbox" label="taxi" name="status" onChange={taxiChange}/>{' '}
                        <Label for="status">taxi</Label>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup check>
                        <Input type="checkbox" label="rest room" name="status" onChange={restRoomChange}/>{' '}
                        <Label for="status">rest room</Label>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup check>
                        <Input type="checkbox" label="beverages" name="status" onChange={beveragesChange}/>{' '}
                        <Label for="status">beverages</Label>
                    </FormGroup>
                </Col>



                <FormGroup check row>
                    <Col sm={{ size: 8, offset: 4 }}>
                        <Link to={'/photos'}>
                            <Button outline color="primary">Prev</Button>{' '}
                        </Link>
                        {/*<Link to={'/public'}>*/}
                            <Button type="submit" outline color="primary">Save</Button>
                        {/*</Link>*/}

                    </Col>
                </FormGroup>
            </Form>
        </>
    )
};

export default Publication;
