import styled from "styled-components"
import {useState, useEffect, useContext} from "react"
import { ThreeDots } from "react-loader-spinner";
import {useNavigate, Link} from 'react-router-dom';
import Context from "../contexts/Context.js"
import { alert } from "../utilities/alerts.js";
import { SignInApi } from "../services/myReadServices.js";

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
            const response = await SignInApi(sendLogin)
            setInfoLogin([response.data]);
            saveLoginInLocalStorage(response.data)
            alert({text: "read it all", type: "success"}) 
            navigate("/main");

        }catch(err){
            if(err.response.data === "Incorrect email or password"){
                alert({text: "Email ou senha invalidos", type: "error"})
            }else{
                alert({text: "Erro ao efetuar login", type: "error"})
            }
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
    background-color: #ffde65;

    h1{
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 700;
    font-size: 60px;
    line-height: 31px;

    color: #5271ff;

    margin-bottom: 5%;
    margin-top: 5%;

    @media (max-width: 580px) {
    flex-direction: column;
    padding: 0;
    }

    }
`
const Form = styled.form`
    display:flex;
    flex-direction: column;
    width: 100%;
    background-color: #ffde59;
    display:flex;
    justify-content:center;
    align-items: center;
    input{
        height:8vh;
        width:60%;
        background: ${props => props.disabled ? "grey" : "#fff5e0" };
        color: ${props => props.disabled ? "#AFAFAF" : "grey" };
        font-family: 'Oswald';
        font-style: italic; 
        font-weight: 300;
        font-size: 22px;
        line-height: 20px;
        margin-bottom:8px;
        border: 1px solid #5271ff;
        border-radius: 5px;
        ::placeholder{
            font-size: 23px;
            color: #C0C0C0;}
        }


    @media (max-width: 580px) {
        margin-top:10%;
        width: 120%;
    }    

`
const Entrar = styled.button`
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 35px;
        line-height: 26px;
        text-align: center;
        color: #5271ff;
        
        display: flex;        
        justify-content: center;
        align-items: center;
        padding: 18px 122px;
        margin-top: 5vh;
        width: 30%;
        height: 9vh;
        background: #fff5e0;
        border: 4px solid #5271ff;

        border-radius: 8px;
        opacity: ${props => props.disabled ? 0.4 : 1 };

        &:hover{
            cursor:pointer;
        }
    `
const Cadastrese = styled.div`
    margin-top:30px;
    p{
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 18px;

        color: #5271ff;
    }
`