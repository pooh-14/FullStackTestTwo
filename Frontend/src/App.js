import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Home from './Components/Home';
import Register from './Components/Register';
import Navbar from './Components/Navbar';
import { Routes, Route } from 'react-router-dom'
import AddQuestion from './Components/AddQuestion';
import AllQuestions from './Components/AllQuestions';
import YourQuestions from './Components/YourQuestions';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/addquestion" element={<AddQuestion/>}/>
        <Route exact path="/allquestions" element={<AllQuestions/>}/>
        <Route exact path="/yourquestions" element={<YourQuestions/>}/>

      </Routes>
    </div>
  );
}

export default App;
