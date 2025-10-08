import logo from './logo.svg';
import './App.css';
import { Login } from './Component/LoginForm/Login.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from './Component/LoginForm/Profile.js';
import { Layout } from './Component/LoginForm/Layout.js';

import TablePage from './Component/LoginForm/Table.js';
import Forms from './Component/LoginForm/Forms.js';
import SignUp from './Component/LoginForm/SignUp.js';
import Dashboard from './Component/LoginForm/Dashboard.js';
import OTPform from './Component/LoginForm/OTPverify.js';
import FileUpload from './Component/LoginForm/FileUpload.js';
import VideoUpload from './Component/LoginForm/VideoUpload.js';








function App() {
  return (

    

   <Router>
    <Routes>
      
      <Route path="/" element={<Login/>}>
    </Route>
    
   <Route path='/SignUp' element={<SignUp/>}/>
    <Route path="/Profile" element={<Layout><Profile /></Layout>} />
        <Route path="/Dashboard" element={<Layout><Dashboard/></Layout>} />
        
        <Route path="/Forms" element={<Layout><Forms/></Layout>} />
        <Route path="/Table" element={<Layout><TablePage/></Layout>} />
        <Route path="/FileUpload" element={<Layout><FileUpload/></Layout>}></Route>
        <Route path='/OTPverify' element={<OTPform/>}></Route>
        <Route path='/VideoUpload' element={<Layout><VideoUpload/></Layout>}></Route>
        
       
    


    </Routes>
    
   </Router>
  );
}

export default App;
