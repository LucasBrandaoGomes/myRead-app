import  {  BrowserRouter ,  Routes ,  Route  }  from  'react-router-dom' ;
import  {  useState  }  from  'react' ;
import SignUp from './SignUp.js'
import Context from "../contexts/Context.js";


export default function App(){
    
    const [infoLogin, setInfoLogin] = useState();
    
    return(
        <Context.Provider value = {{infoLogin , setInfoLogin }}>
            <BrowserRouter>
              <Routes>
                  <Route path="/sign-up" element={<SignUp />}/> 
              </Routes>    
            </BrowserRouter>
        </Context.Provider>
    )
}
