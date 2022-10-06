import styled from "styled-components";
import {useState} from "react";
import axios from "axios";
import {useEffect} from 'react';
import { useContext } from "react";
import {useNavigate} from 'react-router-dom';
import UserContext from "../contexts/Context";
import Header from "./Header";

export default function Main(){

    const navigate = useNavigate();
    const { infoLogin } = useContext(UserContext);
    const [books, setBooks] = useState([])

    const config = 
    {
        headers:{Authorization: `Bearer ${infoLogin[0]}`}
    }

    useEffect(() => {

        const promise = axios.get("http://localhost:4001/books", config)
        
        promise.then(res => {
            setBooks([...res.data]);
            });
        }, []);

    function RenderBooks({title, author}){
        return (
            <>
                <Books>
                    <img src="public/img"></img>
                    <BookInfo>
                        <span>{title}</span>
                        <span>{author}</span>
                        <ion-icon name="bookmarks"></ion-icon>
                    </BookInfo>
                </Books>
            </>
        )
    }

    return(
        <>  
            
            <Header books={books} setBooks={setBooks}/>
            <Content>
                <BooksContainer>
                    {books.map(book => <RenderBooks title={book.title} author={book.author}/>)}
                </BooksContainer>
            </Content>
            
        </>
    )
}

const Content = styled.div`
    display:flex;
    width:100vw;
    justify-content:center;
`

const BooksContainer = styled.div`
    width: 70vw;
    height:80vh;
    background-color: #A5A1CE;
    margin-top:5vh;
    display:flex;
    flex-wrap:wrap;
    overflow: hidden;
    overflow-y: scroll;
    padding-bottom:2%;


`
const Books = styled.div`
    width:29%;
    height:45%;
    background-color: #ffffff;
    display: flex;
    margin: 2%;
    align-items: center;
    justify-content: space-around;

    img{
        width:45%;
        height:80%;
        object-fit:cover;
    }
        
`
const BookInfo = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    width:45%;
    height:80%;
`