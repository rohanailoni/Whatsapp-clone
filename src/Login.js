import React from "react";
import { auth , provider} from './firebase'
import './login.css';
import {Button} from '@material-ui/core'
import {actionTypes} from "./reducer";
import {useStateValue} from "./StateProvider";

function Login(){
    const[{},dispatch] = useStateValue()
    const signin=()=>{
        auth.signInWithPopup(provider).then((e)=>{
            dispatch(
                {
                    type:actionTypes.SET_USER,
                    user:e.user,
                }
            )

        }
        ).catch((error)=>{
            alert(error.message)
        })

    };

    return (
        <div className='Login'>

            <div className='login_container'>
                <div className='login_text'>
                    <h1>Sign in to this Chat  app Using google</h1>
                    <Button onClick={signin}>
                        Sign in with google
                    </Button>
                </div>
            </div>
        </div>
    );
}



export default Login
