import React ,{useState,useEffect} from "react";
import Fire from './Fire';
import Login from './Login';
import Temp from './Temp' ;
import './App.css';

const App = ()=> {
  const [user,setUser] = useState('');
  const [email,setemail] = useState('');
  const [password,setPassword] = useState('');
  const [emailError,setemailError] = useState('');
  const [passwordError,setPasswordError] = useState('');
  const [hasAccount,setHasAccount] = useState(false);

  const clearinputs = () =>{
    setemail('');
    setPassword('');
}
const clearErrors = () =>{
    setemailError('');
    setPasswordError('');
  }
  
  const handleLogin = () =>{
    clearErrors();
    Fire
      .auth()
      .signInWithEmailAndPassword(email,password)
      .catch(err=>{
        switch(err.code){
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
           setemailError(err.message);
           break; 
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
          default:
            break;
           
        }
     });
 }

 const handleSignup = () =>{
   clearErrors();
  Fire
    .auth()
    .createUserWithEmailAndPassword(email,password)
    .catch(err=>{
      switch(err.code){
        case "auth/email-already-in-use":
        case "auth/invalid-email":
         setemailError(err.message);
         break; 
        case "auth/weak-password":
          setPasswordError(err.message);
          break;
        default:
          break;
      }
   });
}

  const handleLogout = () =>{
    Fire.auth().signOut();
  };
  

   useEffect(()=>{
    const authListener = () =>{
      Fire.auth().onAuthStateChanged(user =>{
        if (user){
          clearinputs();
          setUser(user);
        }
        else{
          setUser("");
        }
      });
    };
     authListener();
   },[]);

  return (
    <div className="App">
    {user ?(
        <Temp handleLogout={handleLogout}/>
    ) :( 
      <Login
      email ={email}
      setemail={setemail}
      password = {password}
      setPassword={setPassword}
      handleLogin={handleLogin}
      handleSignup={handleSignup}
      hasAccount={hasAccount}
      setHasAccount={setHasAccount}
      emailError={emailError}
      passwordError={passwordError}
     />    
    )}
    </div>
  )
}

export default App;
