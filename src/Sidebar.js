import React, {useEffect, useState} from "react";
import './Sidebar.css';

import {Avatar,IconButton} from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLargeOutlined"
import {Chat} from "@material-ui/icons";
import {MoreVert} from "@material-ui/icons";
import {SearchOutlined} from "@material-ui/icons";
import "./Sidebar.css";
import Sidebarchat from "./Sidebarchat";
import db from "./firebase";
import {useStateValue} from "./StateProvider";
function Sidebar(){
    const [rooms,setrooms]=useState([]);
    const [{user},dispatch]=useStateValue();
    useEffect(()=>{
        db.collection('rooms').onSnapshot(snapshot => {

            setrooms(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )));

        });

    },[])

    return(
        <div className='sidebar'>
            <div className='sidebar_header'>
                <Avatar src={user?.photoURL}/>
                <div className='sidebar_headerright'>
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <Chat/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>



                </div>
            </div>
            <div className='sidebar_search'>
                <div className='sidebar_searchcontainer'>
                    <SearchOutlined/>
                    <input placeholder='Search or star new chat' type='text'/>

                </div>
            </div>
            <div className='sidebar_chat'>
                <Sidebarchat addnewchat/>
                {
                    rooms.map(room=>{
                    return <Sidebarchat key={room.id} id={room.id} name={room.data.name} />
                }
                )
                }



            </div>

        </div>
    );
}

export default Sidebar