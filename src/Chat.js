import React, {useEffect, useState} from "react";
import './chat.css'
import {Avatar, IconButton} from "@material-ui/core";
import {AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined} from "@material-ui/icons";
import { useParams } from 'react-router-dom'
import db from "./firebase";
import {useStateValue} from "./StateProvider";
import firebase from "firebase";
function Chat(){
    const[seed,setSeed]=useState('');
    const [Input,setInput]=useState('');
    const {roomid} =useParams();
    const [roomname,setroomname]=useState("");
    const [messages,setmessage]=useState([]);
    const [{user},dispatch] = useStateValue();
    useEffect(()=>{
        if(roomid){
            db.collection('rooms').doc(roomid).
                onSnapshot(snapshot => {
                    setroomname(snapshot.data().name)
            });

            db.collection('rooms').doc(roomid).collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot => {
                setmessage(snapshot.docs.map((doc)=>{
                    return doc.data()

                }))
            });
        }
    },[roomid])
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000))
    },[roomid]);
    const sendmessage=(e)=>{
        e.preventDefault();
        console.log('you type the input ',Input);
        db.collection('rooms').doc(roomid).collection('messages').add({
            message:Input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })
        Array.from(document.querySelectorAll("input")).forEach(
        input => (input.value = "")
        );
        setInput('')
    }
    return(
        <div className='chat'>
            <div className='chat__header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerinfo">
                    <h3>{roomname}</h3>
                    <p>Last seen ......</p>
                </div>
                <div className='chat__headerright'>
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>

                </div>
            </div>
            <div className='chat__body'>
                {messages.map((e) =>
                     (

                        <p className={`chat_message ${ e.name===user.displayName &&'chat_reciever'}` }>
                    <span className='chat_name'>{e?.name}</span>
                            {e?.message}


                    </p>
                    )
                  )
                }


                {/*<p className={`chat_message ${ true &&'chat_reciever'}`}>*/}
                {/*    <span className='chat_name'>rohan aileni</span>*/}
                {/*    hey guys*/}
                {/*    <span className='chat_timestamp'>3:25pm</span>*/}

                {/*</p>*/}
            </div>
            <div className='chat__footer'>
                <InsertEmoticon/>
                <form>
                    <input type="text" placeholder='Type a message' onChange={e => {
                        setInput(e.target.value);

                    }} name='input'/>
                    <button type='submit' onClick={sendmessage} >Send a message</button>
                </form>
                <Mic/>
            </div>
        </div>
    );
}

export default Chat;