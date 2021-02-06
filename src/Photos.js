import React, {useState, useEffect} from "react";
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import {Link, useHistory} from "react-router-dom";

const Photos = (props) => {
    let isButtonClick = props.history.location.state ?
        props.history.location.state.isButtonClick : false
    const [images, setImages] = useState([]);
    const [storageData, setStorageData] = useState(null);
    const history=useHistory()
    useEffect(() => {
        setStorageData(JSON.parse(localStorage.getItem('images')));
        console.log(45, storageData, isButtonClick)
        if(!isButtonClick && (!storageData || storageData === [])) {
            history.push('/contact')
        }
    }, []);

    const handleSubmit = (e) => {
        history.push({
            pathname: '/public',
            state: { isButtonClick: true }
        })
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
            <FormGroup>
                <Label for="exampleFile">File</Label>
                <Input type="file" name="file" id="exampleFile"  onChange={handleFileChange} multiple/>
            </FormGroup>
            <FormGroup check row>
                {images.length >= 5 && <p>Maximum 5 photos. Upload again!</p>}
                {images.length >= 5 && localStorage.removeItem('images')}
                {/*<AvForm>*/}
                    <Col sm={{ size: 8, offset: 4 }}>
                        <Link to={'/contact'}>
                            <Button outline color="primary">Prev</Button>{' '}
                        </Link>
                        {/*<Link to={'/public'}>*/}
                            <Button type="submit" outline color="primary">Next</Button>{' '}
                        {/*</Link>*/}
                    </Col>
                {/*</AvForm>*/}
            </FormGroup>

        </Form>
    )
};

export default Photos;
