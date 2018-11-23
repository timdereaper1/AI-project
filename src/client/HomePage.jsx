import React, { Component } from 'react';
import { Button, Header, Image, Modal, Input, Reveal } from 'semantic-ui-react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css"
import About from './About';
import image1 from '../Assets/11.jpg'

export default class HomePage extends React.Component {
    render(): React.ReactNode {
        return (

            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={(props) => {
                        console.log(props)
                        return (


                            <div style={{ display: "flex", flexDirection: "row", alignContent: 'left', width: '100%' }}>

                                <div style={{ display: "flex", flexDirection: "column", width: '30%', height: '100%' }}>
                                    <img src={image1} style={{ width: '100%', height: '50%', padding: '25px' }} />
                                    <div style={{ border: '1px solid #AEAEAE', margin: '25px', height: '100%' }}>
                                        <h1 stlye={{ textAlign: 'center', }}>AMA</h1>
                                        <h3 style={{ fontFamily: "Segoe UI", fontWeight: 'normal' }}>New and Improved Automated Essay Marker</h3>
                                        <ul><li>Detail one</li>
                                            <li>Detail two</li>
                                            <li>Detail three</li>
                                            <li>Detail four</li>
                                            <li>Detail five</li></ul>


                                    </div>
                                </div>


                                <div style={{ display: "flex", flexDirection: "column", width: '70%', padding: 10 }}>
                                    <div style={{ display: "flex", marginTop: '65px', flexDirection: "row", }}>
                                        <Input placeholder='Title...' style={{ width: '100%', }} />
                                        <Button style={{ weight: '40%', color: 'white', backgroundColor: '#FE26F4', marginLeft: '5px', fontWeight: 'normal', }}>Here</Button>
                                    </div>

                                    <div style={{ marginTop: '55px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>


                                        <CKEditor style={{ height: '100vh' }}
                                            editor={ClassicEditor}
                                            data={"<p> Content...<br/><br/><br/><br/><br/><br/><br/></p>"}
                                            onInit={editor => {
                                                //You can store the "editor and use it when it is needed."
                                                console.log('Editor is ready to use', editor);

                                            }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                console.log({ event, editor, data });

                                            }}
                                        />

                                        <Modal trigger={<Button style={{ color: ' white', backgroundColor: '#458cd0', alignSelf: 'flex-end', marginTop: '10px', height: '35px', width: '150px', }}> Click to Proceed</Button>}>
                                            <Modal.Header>The Essay Scored</Modal.Header>
                                            <Modal.Content>
                                                <Modal.Description>
                                                    
                                                    <div style={{display: 'flex', padding: 20, flexDirection: 'row'}}>
                                                    
                                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'left', alignItems: 'left' }}>
                                                        <Progress
                                                            type="circle"
                                                            percent={30}
                                                        />
                                                        <Button basic style={{ marginTop: 20 }} color={'blue'}>
                                                            Click to View Details
                                                        </Button>

                                                        <div>

                                                        </div>

                                                    </div>
                                                    
                                                    </div>
                                                   

                                                </Modal.Description>
                                            </Modal.Content>
                                        </Modal>


                                    </div>

                                </div>
                            </div>





                        )
                    }} />

                    <Route exact path="/about" component={About} />
                </Switch>
            </BrowserRouter>

        );
    }
}


