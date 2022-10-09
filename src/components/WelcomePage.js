
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import logoImg from '../img/myRead.png'

export default function WelcomePage(){
    
    const navigate = useNavigate();

    function SignUp(){
        navigate("/sign-up")
    }

    function SignIn(){
        navigate("/sign-in")
    }

    return(
        <>
            <Init>
                <img src={logoImg} alt="logo"/>
                <Welcome>
                    <Entrar data-test-id="signin" onClick={SignIn}>Sign in</Entrar>
                    <Entrar data-test-id="signup" onClick={SignUp}>Sign up</Entrar>
                </Welcome>
            </Init>
        </>
    )
}

const Init = styled.div`
    width:100vw;
    height:90vh;
    display:flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    img{
        width:35%;
        object-fit:cover;
    }
    @media(max-width: 540px){

        img{
        width:55%;
        object-fit:cover;
    }
    }
`

const Welcome = styled.div`
    display: flex;
    justify-content: space-between;
    width:20%;
    margin-top:5vh;
    @media(max-width: 540px){
        width: 50%;
    }
`
const Entrar = styled.button`
    width: 45%;
    height: 140%;
    background: #5271ff;
    border: none;
    border-radius: 4.63636px;
    text-decoration: none; 
    display:flex;
    align-items:center;
    justify-content:center;
    
    font-family: 'Oswald';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    color: #FFFFFF;
    opacity: ${props => props.disabled ? 0.4 : 1 };
    :hover{
        cursor:pointer;
    }
    @media(max-width:540px){

    }
`