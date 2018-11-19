import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {BrowserRouter,Switch, Route, Link} from 'react-router-dom';
import About from './About';
import backgroundImg from '../Assets/firs.jpg';
import HomePage from './HomePage';


export default class App extends Component<{}> {
    render(): React.ReactNode {
        return (
            <BrowserRouter>
           <Switch>
               <Route exact path="/" render={(props) => {
                   console.log(props)
                   return (
       

             <div style={ { backgroundImage: `url(${backgroundImg})`, backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                minHeight: "100vh",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center" } }>
                     <h1 style={{color:'white', fontFamily: 'Lucida Calligraphy', fontSize:50}}> Welcome</h1>
                         <p style={{fontFamily: "Lucida", fontSize: 25, color:'white',textAlign: 'center'}}>Welcome to the new and improved Essay Grading System. An innovative 
                             solution to grading essays</p>


                <Button style ={{background: '#173994', borderRadius: '30px', backgroundColor:'transparent', borderWidth: '10%', borderColor: 'blue',}} onClick={() => {
                            props.history.push('/homePage')
                        }}> Click to Proceed</Button>
                    </div>
               )} } />
               <Route exact path="/homePage" component={HomePage} />
            </Switch>
            </BrowserRouter>
        );
    }
}
