import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getReadsApi, searchBookApi } from "../services/myReadServices";

export default function Header({setBooks, setRenderOneBook, setRenderReads, reload, setReload, setDisableButton}) {
    const navigate = useNavigate()
    const [search, setSearch] = useState ('')

    async function searchBook(str) {
        setSearch(str);

        try {
          const response = await searchBookApi(search)
          setRenderReads(false)
          setRenderOneBook(false)
          setBooks(response.data);
        } catch (err) {
          console.log(`Error: ${err}`);
        }
    }

    async function myReads() {
      try {
        const response = await getReadsApi()
        setRenderOneBook(false)
        setBooks(response.data);
        setRenderReads(true)
      } catch (err) {
        console.log(`Error: ${err.response.data}`);
      }
    }

    function refresh(){
      setReload(!reload)
      setRenderReads(false)
      setRenderOneBook(false)
    }
    return(
        <HeaderContainer>
                <Title onClick={() => refresh()}>myRead</Title>

                <Search>
                    <ion-icon  name="search-outline" ></ion-icon>
                    <input type="text" placeholder="Pesquisar..." value={search} onChange={(e) => 
                    searchBook(e.target.value)
                    }/>           
                </Search>

                <RightOptions>
                    <ion-icon onClick={() => myReads()} name="book-outline"></ion-icon>
                    <ion-icon onClick={() => navigate("/sign-in")} name="log-out-outline"></ion-icon>
                </RightOptions>  
        </HeaderContainer>
    )
    }

const HeaderContainer = styled.div`
  width: 100vw;
  height: 10vh;
  background: #5271ff;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  width: 15%;
  font-family: "Oswald";
  font-weight: 700;
  font-size: 30px;
  line-height: 54px;
  letter-spacing: 0.05em;
  padding-left: 30px;
  color: #ffffff;
  cursor: pointer;
  @media (max-width: 560px) {
    padding-left: 17px;
  }
`;

const Search = styled.div`
        width: 25%;

        background-color:#ffde65;
        border:solid 1px #fff5e0;
        border-radius:8px;
        display: flex;
        align-items: center;
        input{
            float:left;
            background-color:transparent;
            padding-left:5px;
            font-family: 'Oswald';
            font-style: italic;
            font-size:18px;
            font-weight:700;
            border:none;
            height:32px;
            width:80%;
            color:#ffffff;
        }      
        ion-icon{
            color: #5271ff;
            margin-left: 2px;
        }  

`
const RightOptions = styled.div`
    display:flex;
    justify-content:space-evenly;
    width: 15%;
    ion-icon{
        font-size:24px;
        color:#ffffff;
        :hover{
            cursor:pointer;
        }
    }

`
