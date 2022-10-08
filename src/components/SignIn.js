import styled from "styled-components"
import {useState, useEffect, useContext} from "react"
import axios from "axios"
import { ThreeDots } from "react-loader-spinner";
import {useNavigate, Link} from 'react-router-dom';
import Context from "../contexts/Context.js"


export default function SignIn(){

    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [disableButton,setDisableButton] = useState(false)
    const { setInfoLogin } = useContext(Context);

    async function SubmitLogin(event){
        setDisableButton(true);
        event.preventDefault();
        
        const sendLogin =
            {
                email:email,
                password:password
            }
        
        try{
            const response = await axios.post("http://localhost:4001/sign-in", sendLogin)
            setInfoLogin([response.data]);
            saveLoginInLocalStorage(response.data)
            navigate("/main");

        }catch(err){
            alert(`Error: ${err.response.data}`);
            setDisableButton(false)
        }
        }    

        function saveLoginInLocalStorage(body) {
            const bodySave = JSON.stringify(body);
            localStorage.setItem("autoLogin", bodySave);
        }

    return(
        <>
            <ContainerAuth>  
                <h1>myRead</h1>
                <Form onSubmit={SubmitLogin}>
                    <input type="email" disabled={disableButton} placeholder="email"  value={email} onChange={e => setEmail(e.target.value)} required/>
                    <input type="password" disabled={disableButton} placeholder="password" value={password} onChange={e => setPassword(e.target.value)} required/>
                    <Entrar type="submit" disabled={disableButton}>{disableButton ? <ThreeDots color="white"/> : "Entrar"}</Entrar>
                </Form >
                <Cadastrese>
                    <Link to="/sign-up" style={{textDecoration: 'none'}}>
                        <p>Não tem uma conta?Cadastre-se</p>
                    </Link>
                </Cadastrese>
            </ContainerAuth>
        </>
   )
}

const ContainerAuth = styled.div`
    width: 100vw;
    height: 100vh;   
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
    background-color: #F0AD35;

    h1{
    font-family: 'Shippori Antique';
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    line-height: 31px;

    color: #fff5e0;

    margin-bottom: 75px;
    margin-top:13px;

    }
`

const Form = styled.form`
    display:flex;
    flex-direction: column;
    width: 28%;
    background-color: #D37545;
    input{
        height:6vh;
        background: ${props => props.disabled ? "grey" : "#fff5e0" };
        color: ${props => props.disabled ? "#AFAFAF" : "grey" };
        font-family: 'Lexend Deca';
        font-style: italic; 
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        margin-bottom:8px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        ::placeholder{
            font-size: 22px;
            color: #C0C0C0;}
        }
    `
const Entrar = styled.button`
        border: none;     
        font-family: 'Shippori Antique';
        font-style: normal;
        font-weight: 700;
        font-size: 35px;
        line-height: 26px;
        text-align: center;
        color: #D37545;
        
        display: flex;        
        justify-content: center;
        align-items: center;
        padding: 18px 122px;
        gap: 10px;        
        width: 100%;
        height: 9vh;
        background: #fff5e0;
        
        border-radius: 8px;
        opacity: ${props => props.disabled ? 0.4 : 1 };

        &:hover{
            cursor:pointer;
        }
    `
const Cadastrese = styled.div`
    margin-top:35px;
    p{
        font-family: 'Shippori Antique';
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 18px;

        color: #fff5e0;
    }
`