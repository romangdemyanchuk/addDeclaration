import React, {useState, useEffect} from "react";
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import {Link, useHistory} from "react-router-dom";
import {getDataFromStorage} from "./functions";
import {AvField, AvForm} from "availity-reactstrap-validation";

const Photos = () => {
    let previousTab = 'contact'
    const [images, setImages] = useState([]);
    const history=useHistory()

    useEffect(() => {
        if (getDataFromStorage(previousTab)?.isTabValid) {
            const data = getDataFromStorage('images');
            if (!data) {
                history.push('/contact')
            }
        }
    }, []);

    const handleSubmit = () => {
        history.push('/public');
    };

    const handleFileChange = (e) => {
        localStorage.setItem('images', []);
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const promises = files.map(file => {
                return (new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.addEventListener('load', (ev) => {
                        resolve(ev.target.result);
                    });
                    reader.addEventListener('error', reject);
                    reader.readAsDataURL(file);
                }))
            });
            Promise.all(promises).then(image => {
                // if (image.length < 5) {
                    setImages(image);
                    const el = image
                    let item = JSON.stringify(el);
                    localStorage.setItem('images', item);

                // }
                // else {
                //     console.log(789)
                //     localStorage.setItem('images', []);
                // }

            }, error => { console.error(error); });
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Col sm={3}>
                <FormGroup>
                    <Label for="exampleFile">File</Label>
                    <Input type="file" name="file" id="exampleFile"  onChange={handleFileChange} multiple/>
                </FormGroup>
            </Col>

            <FormGroup check row>
                {images.length >= 5 && <p>Maximum 5 photos. Upload again!</p>}
                {images.length >= 5 && localStorage.removeItem('images')}
                    <Col sm={{ size: 8, offset: 0 }}>
                        <Link to={'/contact'}>
                            <Button size="sm" outline color="primary">Prev</Button>{' '}
                        </Link>
                        <Button size="sm" type="submit" outline color="primary">Next</Button>{' '}
                    </Col>
            </FormGroup>
        </Form>
    )
};

export default Photos;
