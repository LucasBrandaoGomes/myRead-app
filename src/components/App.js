import  {  BrowserRouter ,  Routes ,  Route  }  from  'react-router-dom' ;
import  {  useState  }  from  'react' ;
import SignUp from './SignUp.js'
import Context from "../contexts/Context.js";
import SignIn from './SignIn.js';
import Main from './Main.js';
import ProtectedRoute from '../utilities/ProtectedRoute.js';
import Welcome from './WelcomePage.js';

export default function App(){
    
    const [infoLogin, setInfoLogin] = useState();
    
    return(
        <Context.Provider value = {{infoLogin , setInfoLogin }}>
            <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Welcome />}/>
                  <Route path="/sign-up" element={<SignUp />}/>
                  <Route path="/sign-in" element={<SignIn />}/>
                  <Route element={<ProtectedRoute />}>
                    <Route path="/main" element={<Main />}/>
                  </Route>
 
              </Routes>    
            </BrowserRouter>
        </Context.Provider>
    )
}
