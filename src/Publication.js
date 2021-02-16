import React, {useState, useEffect} from "react";
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import {Link} from "react-router-dom";
import SuccessModal from "./Modal";
import {getAllDataFromStorage, getDataFromStorage} from "./functions";

const Publication = () => {
    const [modal, setModal] = useState(false);
    const [food, setFood] = useState(false);
    const [program, setProgram] = useState(false);
    const [taxi, setTaxi] = useState(false);
    const [restRoom, setRestRoom] = useState(false);
    const [beverages, setBeverages] = useState(false);

    useEffect(() => {
        const data = getDataFromStorage('services');
        if (data) {
            setFood(data.food);
            setProgram(data.program);
            setTaxi(data.taxi);
            setRestRoom(data.restRoom);
            setBeverages(data.beverages);
        }
    }, []);

    const foodChange = (e) => setFood(e.target.checked)
    const programChange = (e) => setProgram(e.target.checked)
    const taxiChange = (e) => setTaxi(e.target.checked)
    const restRoomChange = (e) => setRestRoom(e.target.checked)
    const beveragesChange = (e) => setBeverages(e.target.checked)

    const handleSubmit = (e) => {
        setModal(true)
        e.preventDefault();
        const el = { food, program, taxi, restRoom, beverages}
        let item = JSON.stringify(el);
        localStorage.setItem('services', item);
        let data = getAllDataFromStorage();
        localStorage.setItem('formData', data);
    };

    const toggle = () => setModal(!modal);

    return (
        <>
            <SuccessModal toggle={toggle} modal={modal}/>
            <Form onSubmit={handleSubmit}
            >
                <Col sm={3}>
                    <FormGroup check>
                        <Input type="checkbox" label="food" checked={food} name="food" onChange={foodChange}/>{' '}
                        <Label for="status">food</Label>
                    </FormGroup>
                </Col>
                <Col sm={3}>
                    <FormGroup check>
                        <Input type="checkbox" label="culture program" checked={program} name="status" onChange={programChange}/>{' '}
                        <Label for="status">culture program</Label>
                    </FormGroup>
                </Col>
                <Col sm={3}>
                    <FormGroup check>
                        <Input type="checkbox" label="taxi" checked={taxi} name="status" onChange={taxiChange}/>{' '}
                        <Label for="status">taxi</Label>
                    </FormGroup>
                </Col>
                <Col sm={3}>
                    <FormGroup check>
                        <Input type="checkbox" label="rest room" checked={restRoom} name="status" onChange={restRoomChange}/>{' '}
                        <Label for="status">rest room</Label>
                    </FormGroup>
                </Col>
                <Col sm={3}>
                    <FormGroup check>
                        <Input type="checkbox" label="beverages" checked={beverages} name="status" onChange={beveragesChange}/>{' '}
                        <Label for="status">beverages</Label>
                    </FormGroup>
                </Col>
                <FormGroup check row>
                    <Col sm={{ size: 8, offset: 0 }}>
                        <Link to={'/photos'}>
                            <Button size="sm" outline color="primary">Prev</Button>{' '}
                        </Link>
                        <Button size="sm" type="submit" outline color="primary">Save</Button>
                    </Col>
                </FormGroup>
            </Form>
        </>
    )
};

export default Publication;
