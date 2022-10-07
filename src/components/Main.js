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
    const [renderOneBook, setRenderOneBook] = useState(false)
    const [oneBook, setOneBook] = useState([])
    const [disableButton,setDisableButton] = useState(false)


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

    function RenderBooks({title, author, id}){
        return (
            <>
                <Books>
                    <img onClick={() => RenderBookInfo(id)} src="public/img"></img>
                    <BookInfo>
                        <div>
                            <h1 onClick={() => RenderBookInfo(id)}>{title}</h1>
                            <h2>{author}</h2>
                        </div>
                        <button disabled={disableButton} onClick={() => AddNewRead(id)}>+</button>
                    </BookInfo>
                </Books>
            </>
        )
    }
    function RenderBookInfo(id){
        const book = books.filter(item => item.id === id)
        setRenderOneBook(true)
        setOneBook(book)
    }

    async function AddNewRead(id){
        setDisableButton(true);
        
        try {
            const response = await axios.post(
              `http://localhost:4001/books/reads/${id}`, {}, config
            );
          } catch (err) {
            console.log(`Error: ${err.response.data}`);
            setDisableButton(false);
          }
    }

    return(
        <>    
            <Header books={books} setBooks={setBooks} setRenderOneBook={setRenderOneBook} renderOneBook={renderOneBook }/>
            <Content>
                {renderOneBook?
                <OneBookContainer>
                    {oneBook.map(book => <><RenderBooks title={book.title} author={book.author} id={book.id} setRenderOneBook={setRenderOneBook} />
                    <span>{book.synopsis}</span></>)}
                </OneBookContainer>
                :
                <BooksContainer>
                    {books.map(book => <RenderBooks title={book.title} author={book.author} id={book.id}/>)}
                </BooksContainer>
                }
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
    border-radius: 8px;
    align-items: center;
    justify-content: space-around;

    img{
        width:45%;
        height:80%;
        object-fit:cover;

        :hover{
            cursor:pointer;
        }
    }
        
`
const BookInfo = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    width:45%;
    height:80%;
    background-color:#ffffff;

    div:nth-child(1){
        width:100%;
        display:flex;
        flex-direction:column;
        h1{ 
            word-wrap: break-word;
            color:red;
            font-size:18px;
            :hover{
                cursor: pointer;
            }
            margin-bottom:10px;
        }
        h2{
            color: gray;
            font-size:16px;
        }
    }
    button{
        width:35%;
        display:flex;
        justify-content: center;
        align-items:center;
        border: none;
        border-radius: 35px;
        padding-bottom:5px;
        font-size:30px;
        color: ${props => props.disabled ? "red" : "green" };
        :hover{
            cursor:pointer;
        }
        
    }
`

const OneBookContainer = styled.div` 
    width: 70vw;
    height:80vh;
    background-color: #F0AD35;
    margin-top:5vh;
    display:flex;
    padding-bottom:2%;
    span{
        width:70%;
        padding-top:4%;
        color: #ffffff;
    }
`