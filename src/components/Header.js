import { useContext, useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/Context";

export default function Header({books, setBooks}) {
    const navigate = useNavigate()
    const [search, setSearch] = useState ('')
    const { infoLogin } = useContext(UserContext);

    async function searchBook(str) {
        setSearch(str);
        
        const config ={
            headers:{Authorization: `Bearer ${infoLogin[0]}`}
        }
            
        try {
          const response = await axios.get(
            `http://localhost:4001/books?search=${search}`, config
          );
          setBooks(response.data);
        } catch (err) {
          console.log(`Error: ${err.response.data}`);
        }
      }


    return(
        <HeaderContainer>
                <Title onClick={() => navigate("/main")}>myRead</Title>

                <Search>
                    <ion-icon  name="search-outline" ></ion-icon>
                    <input type="text" placeholder="Pesquisar..." value={search} onChange={(e) => searchBook(e.target.value)}/>           
                </Search>

                <RightOptions>
                    <ion-icon onClick={() => navigate("/books/reads")} name="book-outline"></ion-icon>
                    <ion-icon onClick={() => navigate("/sign-in")} name="log-out-outline"></ion-icon>
                </RightOptions>  
        </HeaderContainer>
    )
    }

const HeaderContainer = styled.div`
  width: 100vw;
  height: 10vh;
  background: #A5A1CE;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  width: 15%;
  font-family: "Passion One";
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

        background-color:#fff5e0;
        border:solid 1px #fff5e0;
        border-radius:8px;
        display: flex;
        align-items: center;
        input{
            float:left;
            background-color:transparent;
            padding-left:5px;
            font-family: 'Shippori Antique';
            font-style: italic;
            font-size:18px;
            border:none;
            height:32px;
            width:80%;
        }      
        ion-icon{
            color: #696969;
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
