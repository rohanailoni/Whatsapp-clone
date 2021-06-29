
import './App.css';
import Sidebar from "./Sidebar";
import Chat from './Chat'

import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {useState} from "react";
import Login from "./Login";
import {BrowserView, MobileView} from 'react-device-detect';
import {useStateValue} from "./StateProvider";
import Mobile from './mobile'
function App() {
    const [{user},dispatch]=useStateValue();

  return (
    <div>
        <BrowserView>
            <div className="App">
                <div className='app__body'>

                            {!user ? (
                            <Login/>
                        ):

                        <Router>

                                <Sidebar/>
                            <Switch>
                                <Route path='/rooms/:roomid/'>
                                    <Chat/>
                                </Route>
                                <Route path="/">
                                    {/*<Chat/>*/}
                                </Route>


                            </Switch>
                        </Router>}


              </div>
            </div>
        </BrowserView>
        <MobileView>

            <Mobile/>
        </MobileView>

    </div>
  );
}

export default App;
