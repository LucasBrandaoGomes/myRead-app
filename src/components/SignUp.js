import styled from "styled-components"
import { Link } from "react-router-dom"
import {useNavigate} from 'react-router-dom';
import  { useState } from  "react"
import { ThreeDots } from "react-loader-spinner";
import { alert } from "../utilities/alerts";
import { SignUpApi } from "../services/myReadServices";

export default function SignUp(){
    
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [disableButton,setDisableButton] = useState(false)


    function SubmitSignUp(event){
        event.preventDefault();
        
        setDisableButton(true);
        
        const infoSignUp =
            {
                email,
                password,
                passwordConfirmation,
            
            }

        const promise =  SignUpApi(infoSignUp)
        
        promise
        .then(res =>{
            alert({text: "Seja bem vindo ao myRead", type: "success"}) 
            navigate("/sign-in");
        })
        .catch(err=> {
            if(err.response.status === 422){
                alert({text: "Preencha os dados corretamente", type: "error"})
            }else if (err.response.status === 409){
                alert({text: `Email já cadastrado`, type: "error"})
            }else{
                alert({text: "Erro ao efetuar cadastro", type: "error"})
            }
        setDisableButton(false);});

    }

    return(
        
        <ContainerAuth >
            <h1>myRead</h1>
            <Form onSubmit={SubmitSignUp} >
                <input type="email" disabled={disableButton} placeholder="email"  value={email} onChange={e => setEmail(e.target.value)} required/>
                <input type="password" disabled={disableButton} placeholder="senha" value={password} onChange={e => setPassword(e.target.value)} required/>
                <input type="password" disabled={disableButton} placeholder="confirmação de senha" value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} required/>
                <Cadastrar type="submit" disabled={disableButton}>{disableButton ? <ThreeDots color="white"/> : "Cadastrar"}</Cadastrar>
            </Form >
            <Loguese>
                <Link to="/sign-in" style={{textDecoration: 'none'}}>
                    <p>Já tem uma conta?Faça login</p>
                </Link>
            </Loguese>
        </ContainerAuth>
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
const Cadastrar = styled.button`
        border: none;     
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
const Loguese = styled.div`
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
