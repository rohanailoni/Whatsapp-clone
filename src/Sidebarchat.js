import React, {useEffect, useState} from "react";
import './Sidebarchat.css'
import {Avatar} from "@material-ui/core";
import db from "./firebase";
import { Link } from 'react-router-dom'
function Sidebarchat({id,name,addnewchat}){
    const [seed,setSeed]=useState('')
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000))
    },[]);
    const createchat=()=>{
        const roomname=prompt("please enter the name for the chat room");
        if(roomname){
            db.collection('rooms').add({
                name:roomname,
            })
        }
    };
    return !addnewchat ? (
        <Link to={`/rooms/${id}`}>
                  <div className='sidebarchat'>
                        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                      <div className='sidebarchat__info'>
                          <h2>{name}</h2>
                          <p>Last message.....</p>
                      </div>
                  </ div>
            </Link>
    ):(
         <div onClick={createchat} className='sidebarchat'>
            <h2> Add new chat</h2>
        </div>
    );
}

export default Sidebarchat