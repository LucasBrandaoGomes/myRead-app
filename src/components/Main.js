import styled from "styled-components";
import {useState, useEffect} from "react";
import Header from "./Header";
import { addReadApi, getBooksApi, getToken, updateReadApi } from "../services/myReadServices";
import { useNavigate } from "react-router-dom";
import logoImg from '../img/myRead.png'
import { alert } from "../utilities/alerts";

export default function Main(){

    const [books, setBooks] = useState([])
    const [renderOneBook, setRenderOneBook] = useState(false)
    const [oneBook, setOneBook] = useState([])
    const [disableButton,setDisableButton] = useState(false)
    const [renderReads, setRenderReads] = useState(false)
    const [reload, setReload] = useState(false)
    const navigate = useNavigate()

    const result = getToken()
    if(!result){
            alert('Efetue login')
            navigate('/sign-in')
    }

    useEffect(() => {

        const promise = getBooksApi()

        promise.then(res => {
            setBooks([...res.data]);
            });
        }, [reload]);

    function RenderBooks({title, author, id, disabled}){
        return (
            <>
                <Books >
                    <img onClick={() => {RenderBookInfo(id)}} src={logoImg} alt="book image"></img>
                    <BookInfo>
                        <div>
                            <h2 onClick={() => RenderBookInfo(id)}>{title}</h2>
                            <h3>{author}</h3>
                        </div>
                        <button disabled={disabled} onClick={() => AddNewRead(id)}>+</button>
                    </BookInfo>
                </Books>
            </>
        )
    }

    function RenderBookInfo(id){
        setDisableButton(false)
        const book = books.filter(item => item.id === id)
        setRenderReads(false)
        setRenderOneBook(true)
        setOneBook(book)

    }

    async function AddNewRead(id){
        
        try {
            const response = await addReadApi(id)
            alert({text: "Read it all", type: "success"})

          } catch (err) {
            if(err.response.data === "User already reading this book"){
                alert({text: "You are already reading this book", type: "error"})
            }
            setDisableButton(false);
          }
    }


    async function updatePage(id){
        const data = prompt("Digite sua págia atual:")
        const value = {readPages: data}
        try {
            const response = await updateReadApi(id, value)
          } catch (err) {
            if(err.response.data === "Invalid page value"){
                alert("Invalid page value")
            }
          }
    }

    function RenderReads({title, author, id, totalPages, readPages}){
        return(
            <Reads>
                <img src={logoImg} alt="book image"></img>
                    <ReadBookInfo>
                        <div>
                            <h2>{title}</h2>
                            <h3>{author}</h3>
                        </div>
                        <NewValue>
                            <p onClick={() => updatePage(id)}>{readPages}/{totalPages}</p>                            
                        </NewValue>
                        
                    </ReadBookInfo>
            </Reads>
        )
    }

    return(
        <>    
            <Header books={books} setBooks={setBooks} setRenderOneBook={setRenderOneBook} setRenderReads={setRenderReads} setReload={setReload} reload={reload} setDisableButton={setDisableButton}/>
            <Content>
                {renderOneBook?
                    <OneBookContainer>
                        {oneBook.map(book => <><RenderBooks key={book.id} title={book.title} author={book.author} id={book.id} disabled={disableButton}/>
                        <span>{book.synopsis}</span></>)}
                    </OneBookContainer>
                :
                <>
                    {renderReads?
                        <>
                           
                            <ReadsContainer>
                                <span>Your reads</span>
                                <>
                                {(books.length===0)?<h1>Você ainda não adicinou leituras</h1>
                                :
                                books.map(book => <RenderReads key={book.id} title={book.book.title} author={book.book.author} id={book.bookId} readPages={book.readPages} totalPages={book.book.totalPages}/>)}
                                </>
                            </ReadsContainer>
                        </>
                        :
                            <BooksContainer>
                                <>
                                {(books.length===0)?<h1>Não há livros com esse título ou autor</h1>
                                :
                                books.map(book => <RenderBooks key={book.id} title={book.title} author={book.author} id={book.id} disabled={disableButton}/>)}
                                </>
                            </BooksContainer>}
                        </>
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
    width: 80vw;
    height:80vh;
    background-color: #ffde65;
    margin-top:5vh;
    display:flex;
    flex-wrap:wrap;
    overflow: hidden;
    overflow-y: scroll;
    padding-bottom:2%;
    border-radius:10px;
    h1{ 
        margin-left:32%;
        margin-top:25%;
        color: #ffffff;
        font-family:'Oswald';
        font-size:25px;
        font-weight:400;
    }

    @media(max-width:540px){
        width:95%;
        h1{ 
        margin-left:20%;
        margin-top:20%;
        color: #ffffff;
        font-family:'Oswald';
        font-size:25px;
        font-weight:400;
    }

    }

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
    box-shadow: 8px 10px 20px 0px #00000040;

    img{
        width:45%;
        height:80%;
        object-fit:cover;
        box-shadow: 4px 5px 10px 0px #00000020;
        :hover{
            cursor:pointer;
        }
    }
    @media(max-width:540px){
        width:95%;
        padding-top:2%;
        height:35%;
        img{
            width:30%;
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
        h2{ 
            word-wrap: break-word;
            color:#D35029;
            font-size:18px;
            :hover{
                cursor: pointer;
            }
            margin-bottom:10px;
        }
        h3{
            color: gray;
            font-size:16px;
        }
    }
    button{
        width:35%;
        display: flex;
        justify-content: center;
        align-items:center;
        border: none;
        border-radius: 35px;
        padding-bottom:5px;
        font-size:30px;
        color: #D35029;
        :hover{
            cursor:pointer;
        }
        
    }
`
const OneBookContainer = styled.div` 
    width: 100vw;
    height:80vh;
    background-color: #ffffff;
    margin-top:5vh;
    display:flex;
    justify-content:center;
    align-items:center;
    span{
        font-family:'Oswald';
        font-size:25px;
        font-weight:300;
        width:50%;
        color: #D35029;
    }
    @media(max-width: 540px){
        flex-direction:column;
        span{
            width:60%;
            margin-top: 10%;
        }
    }
`
const ReadsContainer = styled.div`
    width: 100vw;
    height:100vh;
    background-color: #ffffff;
    margin-top:5vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    overflow: hidden;
    overflow-y: scroll;
    padding-bottom:2%;
    margin-bottom:10px;

    h1{
        margin-top:30%;
        color: #ffffff;
        font-family: "Passion One";
        font-weight: 400;
        font-size: 20px;
        line-height: 54px;
        letter-spacing: 0.02em;
    }
    span{
        width:80%;
        font-family: "Oswald";
        font-weight: 400;
        font-size:45px;
        color:#D35029;
        margin-bottom:5px;
    }
    p{
        font-family: "Oswald";
        font-weight: 400;
        font-size:20px;
        color:#D35029;
        margin-bottom:5px;
        :hover{
            cursor: pointer;
        }
    }
`
const Reads = styled.div`
    width:90%;
    height:25%;
    background-color: #ffffff;
    display: flex;
    margin: 2%;
    border-radius: 8px;
    align-items: center;
    justify-content: space-around;
    box-shadow: 4px 5px 10px 0px #00000020;


    img{
        width:10%;
        height:100%;
        object-fit:cover;
        box-shadow: 4px 5px 10px 0px #00000020;

    }
    @media(max-width:540px){
        img{
            width:30%;
        }
    }
        
`
const ReadBookInfo = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    width:65%;
    height:80%;
    background-color:#ffffff;

    div:nth-child(1){
        width:100%;
        display:flex;
        flex-direction:column;
        h2{ 
            word-wrap: break-word;
            color:#D35029;
            font-size:18px;
            margin-bottom:10px;
        }
        h3{
            color: gray;
            font-size:16px;
        }
    }
   
`
const NewValue = styled.div`
    display:flex;
    width:100%;
    justify-content: space-around;
    align-items:center;
    span{
        :hover{
            cursor: pointer;
        }
    }
`

