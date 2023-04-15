import React, { useEffect, useState } from 'react'
import { LoginInput } from '../Login/style'
import { FeedAppBar, FeedFundo, FeedMensagens, FeedSendButton } from './style'

import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// Material ui
import { Button, Typography } from '@mui/material';
import { getPosts, storePost } from '../../firebaseConfig';
import { handleLogout } from '../../services/actions/logout';
import { useNavigate } from 'react-router-dom';

const Feed = () => {

    let navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [mensagem, setMensagem] = useState("");

    const deslogue = () => {
        handleLogout();
        navigate('/')
    }

    useEffect(() => {
        const receberPosts = () => {
            getPosts().then((strings: any) => {
                console.log("As strings foram: " + JSON.stringify(strings))
                setPosts(strings)
            })
        }
        receberPosts();
    }, [])

    return (
        <FeedFundo>
            <FeedAppBar>
                <h2>Bem vindo ao Feed</h2>
                <button onClick={deslogue}>Sair</button>
            </FeedAppBar>
            <LoginInput
                onChange={(e) => setMensagem(e.target.value)}
                placeholder='Envie uma mensagem...'
            />
            <FeedSendButton
                onClick={() => {
                    storePost(mensagem);
                }}
            >Enviar</FeedSendButton>
            <FeedMensagens>
                {posts.map((string: any, index) => (
                    <div key={index}>
                        <li>{string.autor}</li>
                        <li>{string.post}</li>
                    </div>
                ))}
            </FeedMensagens>
        </FeedFundo>
    )
}

export default Feed