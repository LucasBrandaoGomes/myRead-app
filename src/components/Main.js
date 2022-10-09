import styled from "styled-components";
import {useState, useEffect, useContext} from "react";
import Header from "./Header";
import { addReadApi, getBooksApi, getToken, updateReadApi } from "../services/myReadServices";
import { useNavigate } from "react-router-dom";

export default function Main(){

    const [books, setBooks] = useState([])
    const [renderOneBook, setRenderOneBook] = useState(false)
    const [oneBook, setOneBook] = useState([])
    const [disableButton,setDisableButton] = useState(true)
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
                    <img onClick={() => {RenderBookInfo(id)}} src="public/img"></img>
                    <BookInfo disabled={disabled}>
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
            setDisableButton(true);

          } catch (err) {
            console.log(`Error: ${err.response.data}`);
            setDisableButton(false);
          }
    }


    async function updatePage(id){
        const data = prompt("Digite sua págia atual:")
        const value = {readPages: data}
        try {
            const response = await updateReadApi(id)
          } catch (err) {
            if(err.response.data === "Invalid page value"){
                alert("Invalid page value")
            }
          }
    }

    function RenderReads({title, author, id, totalPages, readPages}){
        return(
            <Reads>
                <img src="public/img"></img>
                    <ReadBookInfo>
                        <div>
                            <h2>{title}</h2>
                            <h3>{author}</h3>
                        </div>
                        <NewValue>
                            <span onClick={() => updatePage(id)}>{readPages}/{totalPages}</span>                            
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
                    {oneBook.map(book => <><RenderBooks title={book.title} author={book.author} id={book.id} disabled={disableButton} />
                    <span>{book.synopsis}</span></>)}
                </OneBookContainer>
                :
                <>
                    {renderReads?
                        <ReadsContainer>
                            <>
                            {(books.length===0)?<h1>Você ainda não adicinou leituras</h1>
                            :
                            books.map(book => <RenderReads key={book.id} title={book.book.title} author={book.book.author} id={book.bookId} readPages={book.readPages} totalPages={book.book.totalPages}/>)}
                            </>
                        </ReadsContainer>
                        :
                        <BooksContainer>
                            <>
                            {(books.length===0)?<h1></h1>
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
    width: 70vw;
    height:80vh;
    background-color: #A5A1CE;
    margin-top:5vh;
    display:flex;
    flex-wrap:wrap;
    overflow: hidden;
    overflow-y: scroll;
    padding-bottom:2%;
    border-radius:10px;
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
        h2{ 
            word-wrap: break-word;
            color:red;
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
        color: ${(props) => (props.disabled ? "green" : "red")};
        :hover{
            cursor:pointer;
        }
        
    }
`

const OneBookContainer = styled.div` 
    width: 60vw;
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
const ReadsContainer = styled.div`
    width: 60vw;
    height:80vh;
    background-color: #A5A1CE;
    margin-top:5vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    overflow: hidden;
    overflow-y: scroll;
    padding-bottom:2%;

    h1{
        margin-top:30%;
        color: #ffffff;
        font-family: "Passion One";
        font-weight: 400;
        font-size: 20px;
        line-height: 54px;
        letter-spacing: 0.02em;
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

    img{
        width:15%;
        height:90%;
        object-fit:cover;

        :hover{
            cursor:pointer;
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
            color:red;
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

