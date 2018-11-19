import React, { Component } from 'react';
import image1 from '../Assets/firs.jpg'
import { Button } from 'semantic-ui-react';
import {BrowserRouter,Switch, Route, Link} from 'react-router-dom';
import About from './About';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default class HomePage extends React.Component {
    render(): React.ReactNode {
        return (
        
            <BrowserRouter>
            <Switch>
                <Route exact path="/" render={(props) => {
                    console.log(props)
                    return (
        
        
    <div style ={{  display: "flex", flexDirection: "row", alignContent: 'left', width: '100%'}}>

            <div style ={{  display: "flex", flexDirection: "column",width: '30%'}}>
                 <img src = {image1} style ={{width: '100%', height: '50%',padding: '25px' }}/>
                 <div style={{border: '1px solid #AEAEAE', margin: '25px', height: '100%'}}>
                         <h1 stlye ={{textAlign: 'center',}}>AMA</h1>
                        <h3 style = {{fontFamily: "Segoe UI", fontWeight: 'normal'}}>New and Improved Automated Essay Marker</h3>
                         <ul><li>Detail one</li>
                         <li>Detail two</li>
                         <li>Detail three</li>
                         <li>Detail four</li>
                        <li>Detail five</li></ul>

         
                </div>
            </div>


            <div style ={{  display: "flex",  flexDirection: "column", width: '70%'}}>
                <div style ={{  display: "flex", flexDirection: "row", height: '20%'}}>
                    <input type = 'text' placeholder = 'Title..' style ={{ marginTop: '75px', marginLeft:'2%', width: '100%'}}></input>

                    <Button style ={{ weight: '40%',color: 'white', background: '#FE26F4',marginTop: '75px', borderRadius: '1px', marginLeft: '5px', fontWeight: 'normal',}}>Here</Button>
                 </div> 

                <div style={{marginTop: '55px', }}>


                    <CKEditor style ={{border: '1px solid #AEAEAE',}}
                         editor = {ClassicEditor}
                         data = "<p> Content</p>"
                         onInit ={editor=>{
                         //You can store the "editor and use it when it is needed."
                         console.log('Editor is ready to use', editor);
    
                             }}
                         onChange ={(event, editor)=> {
                         const data = editor.getData();
                         console.log({event, editor, data});

                             }}
                          />

                          
                <Button style ={{color: ' white', background: '#173994', borderRadius: '1px', align: 'right', marginTop: '10px', height: '35px', weight: '10%',}} onClick={() => {
                            props.history.push('/about')
                        }}> Click to Proceed</Button>
                </div>

            </div>
</div>
         

         
            

)} } />

<Route exact path="/about" component={About} />
</Switch>
</BrowserRouter>

        );
    }
}


