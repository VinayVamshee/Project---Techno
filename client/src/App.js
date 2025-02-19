import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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

import Documentation from './Components/Documentation';
import axios from 'axios';
import Footer from './Components/Footer';
import ReactGA from 'react-ga4';

const TRACKING_ID = 'G-YJTBTHK92Z';
ReactGA.initialize(TRACKING_ID);

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return null;
}


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

  const [backgroundImage, setBackgroundImage] = useState(null);
  useEffect(() => {
    axios.get('https://project-techno.vercel.app/getBackgroundImage')
      .then(response => setBackgroundImage(response.data.data.imageUrl))
      .catch(error => console.error('Error fetching background image:', error));
  }, []);


  return (
    <div className="App" style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none' }}>
      <Router>
        <AnalyticsTracker />
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
        <Footer />
      </Router>
    </div>
  );
}

export default App;
