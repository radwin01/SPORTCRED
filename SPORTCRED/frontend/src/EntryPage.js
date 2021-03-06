import React, { useState, useEffect } from 'react';
import axios from "axios";
import './EntryPage.css';
import App from './App';
import Logo from './SPORTCRED_Logo.png';
import { NavLink, Route, withRouter } from "react-router-dom";
import ForgotPassword from './ForgotPassword'

const EntryPage = () => {
  const [vfavSport, setFavSport] = useState('')
  const [vsportLvl, setSportLvl] = useState('')
  const [vage, setAge] = useState('')
  const [vfavTeam, setFavTeam] = useState('')
  const [vlearnSport, setLearnSport] = useState('')

  const [vloginUsername, setVloginUsername] = useState('')
  const [vloginPassword, setVloginPassword] = useState('')
  const [clicked2, setClicked2] = useState(0)

  const [vregUsername, setVregUsername] = useState('')
  const [vregEmail, setVregEmail] = useState('')
  const [vregPassword, setVregPassword] = useState('')
  const [clicked, setClicked] = useState(0)

  const [success, setSucess] = useState(false)
  const [recover, setRecover] = useState(false)

  useEffect(() => {
    //This is when a user registers
    if (clicked === 1) {

      const headers = {
        'Content-Type': 'text/plain'
      }
      const url = 'http://localhost:8080/api/v1/registerUser'
      console.log('post is running')
      console.log(vregUsername, vregEmail, vregPassword)
      axios.post(url, { 'username': btoa(vregUsername), 'email': btoa(vregEmail), 'password': btoa(vregPassword), 'answeredQuestions': [vfavSport, vsportLvl, vage, vfavTeam, vlearnSport] }, { headers })
        .then(res => {
          console.log(res.status);
          if (res.status === 412) {
            alert('Duplicate email')
          } else if (res.status === 409) {
            alert('Duplicate username')
          } else if (res.status === 201) { //This is when a user sucessfully registers
            sessionStorage.setItem('needToLogin', true)
            sessionStorage.setItem('username', vregUsername);
            setSucess(true)
            //console.log(sessionStorage.setItem('needToLogin'))
            // console.log(sessionStorage.getItem('needToLogin'))
            //setSuccess(true)
          }
        })
        .catch(error => {
          console.log(error.response)
        });
      setClicked(0)
    }

    //This is when a user logs in
    if (clicked2 === 1) {
      const headers = {
        'Content-Type': 'text/plain'
      }
      const url = 'http://localhost:8080/api/v1/userLogin'
      axios.post(url, { 'username': btoa(vloginUsername), 'password': btoa(vloginPassword) }, { headers })
        .then(res => {
          console.log(res.status);
          if (res.status === 404) {
            alert('Incorrect username/passoword')
          } else if (res.status === 200) { //This is when a user sucessfully logins
            sessionStorage.setItem('needToLogin', true)
            sessionStorage.setItem('username', vloginUsername);
            setSucess(true)
            //setSuccess(true)
          }
        })
        .catch(error => {
          console.log(error.response)
        });
      setClicked2(0)
    }
  }, [clicked, clicked2])


  const loginSlide = () => {
    var v = document.getElementById("logInSlider");
    var w = document.getElementById("registerSlider");
    var x = document.getElementById("login");
    var y = document.getElementById("register");
    var z = document.getElementById("btn");
    var p = document.getElementById("profile");

    w.style.fontSize = "13px";
    w.style.color = "#FFFFFF";

    v.style.fontSize = "17px";
    v.style.color = "#000000";

    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0";

    p.style.left = "450px";
  }

  const registerSlide = () => {
    var v = document.getElementById("logInSlider");
    var w = document.getElementById("registerSlider");
    var x = document.getElementById("login");
    var y = document.getElementById("register");
    var z = document.getElementById("btn");
    var p = document.getElementById("profile");

    v.style.fontSize = "13px";
    v.style.color = "#FFFFFF";

    w.style.fontSize = "17px";
    w.style.color = "#000000";

    x.style.left = "-400px";
    y.style.left = "50px";
    z.style.left = "110px";

    p.style.left = "50px";
  }

  const nextButton = () => {
    var x = document.getElementById("login");
    var y = document.getElementById("register");
    var z = document.getElementById("profile");

    y.style.top = "-600px";
    z.style.top = "105px";
  }

  const backButton = () => {
    var x = document.getElementById("login");
    var y = document.getElementById("register");
    var z = document.getElementById("profile");

    y.style.top = "130px";
    z.style.top = "600px";
  }

  if (recover) {
    return (<>
      <Route exact path="/recoverPassword" component={withRouter(ForgotPassword)} />
      <div className="forgot-back">
        <NavLink exact activeClassName="current" to="/"><button class="back-fgt-btn" onClick={() => { setRecover(false) }}>Back</button></NavLink>
      </div>

    </>);
  }
  return (
    <div className="LandingPage">
      { sessionStorage.getItem('needToLogin') ? (
        <App />
      ) : (
          <div className="EntryPage">
            <header className="EntryPage-header">
              <title>Login Page</title>
            </header>
            <body>
              <div class="hero">
                <img src={Logo} className="spclogo" alt="SPORTCRED Logo"></img>
                <div class="form-box">
                  <div class="button-box">
                    <div id="btn"></div>
                    <button id="logInSlider" type="button" class="toggle-btn" onClick={loginSlide}>Log in</button>
                    <button id="registerSlider" type="button" class="toggle-btn" onClick={registerSlide}>Register</button>
                  </div>
                  <div id="login" class="input-group">
                    <input id="loginUsername" type="text" class="input-field" placeholder="Username" required onChange={event => setVloginUsername(event.target.value)}></input>
                    <input id="loginPassword" type="password" autoComplete="off" class="input-field" placeholder="Password" required onChange={event => setVloginPassword(event.target.value)}></input>
                    <button type="submit" class="submit-btn" onClick={() => setClicked2(1)}>Log in</button>
                    <NavLink exact activeClassName="current" to="/recoverPassword"><button class="forgot-btn" onClick={() => { setRecover(true) }}>Forgot Password</button></NavLink>
                  </div>
                  <div id="register" class="input-group">
                    <input id="regUsername" type="text" class="input-field" placeholder="Username" required onChange={event => setVregUsername(event.target.value)}></input>
                    <input id="regEmail" type="email" class="input-field" placeholder="Email" required onChange={event => setVregEmail(event.target.value)}></input>
                    <input id="regPassword" type="password" autoComplete="off" class="input-field" placeholder="Password" required onChange={event => setVregPassword(event.target.value)}></input>
                    <button type="next" class="next-btn" onClick={nextButton}>Next</button>
                  </div>
                  <div id="profile" class="input-group">
                    <input id="favSport" type="text" class="input-field" placeholder="Enter your favourite sport" required onChange={event => setFavSport(event.target.value)}></input>
                    <input id="sportLvl" list="levels" type="text" class="input-field" placeholder="Enter your highest played level team" required onChange={event => setSportLvl(event.target.value)}></input>
                    <datalist id="levels">
                      <option value="None" />
                      <option value="Casual" />
                      <option value="Amatuer" />
                      <option value="Highschool" />
                      <option value="College" />
                      <option value="Professional" />
                    </datalist>
                    <input id="age" type="number" class="input-field" placeholder="Enter your age" required onChange={event => setAge(event.target.value)}></input>
                    <select id="favTeam" size="1" className="input-field" required onChange={event => setFavTeam(event.target.value)}>
                        <option disabled selected value>Select your favourite NBA team</option>
                        <option value='Atlanta Hawks'>Atlanta Hawks</option>
                        <option value='Boston Celtics'>Boston Celtics</option>
                        <option value='Brooklyn Nets'>Brooklyn Nets</option>
                        <option value='Charlotte Hornets'>Charlotte Hornets</option>
                        <option value='Chicago Bulls'>Chicago Bulls</option>
                        <option value='Cleveland Cavaliers'>Cleveland Cavaliers</option>
                        <option value='Dallas Mavericks'>Dallas Mavericks</option>
                        <option value='Denver Nuggets'>Denver Nuggets</option>
                        <option value='Detroit Pistons'>Detroit Pistons</option>
                        <option value='Golden State Warriors'>Golden State Warriors</option>
                        <option value='Houston Rockets'>Houston Rockets</option>
                        <option value='Indiana Pacers'>Indiana Pacers</option>
                        <option value='LA Clippers'>Los Angeles Clippers</option>
                        <option value='Los Angeles Lakers'>Los Angeles Lakers</option>
                        <option value='Memphis Grizzlies'>Memphis Grizzlies</option>
                        <option value='Miami Heat'>Miami Heat</option>
                        <option value='Milwaukee Bucks'>Milwaukee Bucks</option>
                        <option value='Minnesota Timberwolves'>Minnesota Timberwolves</option>
                        <option value='New Orleans Pelicans'>New Orleans Pelicans</option>
                        <option value='New York Knicks'>New York Knicks</option>
                        <option value='Oklahoma City Thunder'>Oklahoma City Thunder</option>
                        <option value='Orlando Magic'>Orlando Magic</option>
                        <option value='Philadelphia 76ers'>Philadelphia 76ers</option>
                        <option value='Phoenix Suns'>Phoenix Suns</option>
                        <option value='Portland Trail Blazers'>Portland Trail Blazers</option>
                        <option value='Sacramento Kings'>Sacramento Kings</option>
                        <option value='San Antonio Spurs'>San Antonio Spurs</option>
                        <option value='Toronto Raptors'>Toronto Raptors</option>
                        <option value='Utah Jazz'>Utah Jazz</option>
                        <option value='Washington Wizards'>Washington Wizards</option>
                    </select>
                    <input id="learnSport" type="text" class="input-field" placeholder="Enter the sport you want to learn" required onChange={event => setLearnSport(event.target.value)}></input>
                    <button type="back" class="back-btn" onClick={backButton}>back</button>
                    <button type="submit" class="submit-btn" onClick={() => setClicked(1)}>Register</button>

                  </div>
                </div>

              </div>

            </body>

          </div>
        )}

    </div>
  );

}

export default EntryPage;
