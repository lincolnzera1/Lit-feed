import React, { useEffect, useState } from 'react'
import { LoginInput } from '../Login/style'
import { ButtonSair, FeedAppBar, FeedFundo, FeedMensagens, FeedSendButton } from './style'

import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// Material ui
import { Button, Typography } from '@mui/material';
import { database, db, getPosts, listenStrings, storage, storePost, writeUserData } from '../../firebaseConfig';
import { handleLogout } from '../../services/actions/logout';
import { useNavigate } from 'react-router-dom';
import { DataSnapshot, onValue } from 'firebase/database';
import ImageSlider from '../Carrossel/Home';

import { useRef } from "react";
import { ref, uploadBytes } from "firebase/storage";

interface Mensagem {
    id: string;
    value: string;
}

const Feed = () => {

    let navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [mensagem, setMensagem] = useState("");

    const deslogue = () => {
        handleLogout();
        navigate('/')
    }

    const [strings, setStrings] = useState<any>([]);
    const [unsubscribe, setUnsubscribe] = useState<() => void>(() => { });
    const [mensagens, setMensagens] = useState<Mensagem[]>([]);

    useEffect(() => {
        const unsubscribeFunc = listenStrings(setStrings);
        setUnsubscribe(() => unsubscribeFunc);
    }, []);

    function handleStopListening() {
        unsubscribe();
    }

    useEffect(() => {

        const receberPosts = () => {
            getPosts().then((strings: any) => {
                // console.log("As strings foram: " + JSON.stringify(strings))
                setPosts(strings)
            })
        }
        receberPosts();

    }, [])

    const fileInputRef = useRef<any>();

    const handleUpload = async () => {
        const file = fileInputRef.current.files[0];

        if (!file) {
            console.log("Nenhum arquivo selecionado.");
            return;
        }

        try {
            const storageRef = ref(storage, `images/${file.name}`);
            await uploadBytes(storageRef, file);
            console.log("Upload bem-sucedido!");
        } catch (error) {
            console.error("Erro ao fazer upload da imagem:", error);
        }
    };

    return (
        <FeedFundo>
            <FeedAppBar>
                <h2>Bem vindo ao Feed</h2>
                <ButtonSair onClick={deslogue}>Sair</ButtonSair>
            </FeedAppBar>
            <LoginInput
                onChange={(e) => setMensagem(e.target.value)}
                placeholder='Envie uma mensagem...'
            />
            <FeedSendButton
                onClick={() => {
                    storePost(mensagem);
                    // writeUserData(mensagem);
                }}
            >Enviar</FeedSendButton>
            <div>
                <input type="file" ref={fileInputRef} />
                <button onClick={handleUpload}>Fazer upload</button>
            </div>
            <FeedMensagens>


                <ImageSlider
                    slides={posts}
                />

                {/* {posts.map((string: any, index) => (
                    <div key={index}>
                        <li>{string.autor}</li>
                        <li>{string.post}</li>
                    </div>
                ))} */}
            </FeedMensagens>
        </FeedFundo>
    )
}

export default Feed