import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './Components/style.css'
import Home from './Components/Home';
import NavigationMenu from './Components/NavigationMenu';
import StudentsInfo from './Components/StudentsInfo';
import TeacherInfo from './Components/TeacherInfo';
import Gallery from './Components/Gallery';
// import Footer from './Components/Footer';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
// import Documents from './Components/Documents';
import videoBG from './Components/Images/WhatsApp Video 2025-02-07 at 18.05.45.mp4'
import Documentation from './Components/Documentation';

function App() {

  const [IsLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true)
    }
    else {
      setIsLoggedIn(false)
    }
  }, [])

  const checkTokenExpiration = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
      }
    }
  };

  checkTokenExpiration();

  return (
    <div className="App">
      <video className="video-background" autoPlay loop muted>
        <source src={videoBG} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Router>
        <NavigationMenu />
        <Routes>
          <Route path='/' exact element={<Home />} />
          {
            IsLoggedIn ? (
              <>
                <Route path='/StudentsInfo' exact element={<StudentsInfo />} />
                <Route path='/TeacherInfo' exact element={<TeacherInfo />} />
              </>
            ) :
              null
          }
          <Route path='/Gallery' exact element={<Gallery />} />
          {/* <Route path='/Documents' exact element={<Documents />} /> */}
          <Route path='/Documentation' exact element={<Documentation />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
