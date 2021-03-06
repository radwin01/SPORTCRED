import React, { useEffect, useState } from "react";
import "./EditProfile.css";
import "./RadarModal.css"
import Popup from "reactjs-popup";
import Radar from './components/Radar';

const EditProfile = () => {
  const [bio, setBio] = useState("");
  const [finalBio, setFinalBio] = useState("");
  const [favSport, setFavSport] = useState("");
  const [sportLevel, setSportLevel] = useState("");
  const [age, setAge] = useState("");
  const [favSportTeam, setFavSportTeam] = useState("");
  const [learnSport, setLearnSport] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/api/v1/getUserInfo");
    xhr.responseType = "json";
    xhr.onload = () => {
      if (xhr.status < 400) {
        console.log(xhr.response);
        setFavSport(xhr.response.Q1);
        setSportLevel(xhr.response.Q2);
        setAge(xhr.response.Q3);
        setFavSportTeam(xhr.response.Q4);
        setLearnSport(xhr.response.Q5);
        setFinalBio(xhr.response.biography);
      } else {
        alert("400 Error Status");
      }
    };
    xhr.onerror = () => {
      alert("Can't connect to server! Something went wrong!");
    };

    xhr.send(
      JSON.stringify({ username: btoa(sessionStorage.getItem("username")) })
    );
  }, []);

  function handlePassword(event) {
    event.preventDefault();
    // check that all fields were filled
    var fill = (currentPassword !== "") &&
      (newPassword !== "") &&
      (confirmPassword !== "")
    // check password validity
    var valid = (newPassword === confirmPassword) &&
      (newPassword !== currentPassword)

    if (fill) {
      if (valid) {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
          if (xhr.responseText.length > 0) {
            alert('Current password is invalid')
          } else {
            alert('Password changed')
          }
        })
        xhr.open("POST", "http://localhost:8080/api/v1/updateUserData", true);

        xhr.send(JSON.stringify({ username: btoa(sessionStorage.getItem('username')), password: btoa(newPassword), oldPassword: btoa(currentPassword) }));

      } else {
        alert('Check that:\n1. Your current password does not match your new password\n2. Both fields for your new password match')
      }
    } else {
      alert('Please fill out all the fields.')
    }
  }


  const updateBio = () => {
    // instance.post("/updateUserProfile", { biography: bio });
    // setBio("");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/api/v1/updateUserData", true);
    xhr.send(
      JSON.stringify({
        username: btoa(sessionStorage.getItem("username")),
        biography: bio,
      })
    );
    setFinalBio(bio);
    setBio("");
  };

  function setProfilePicture(path) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/api/v1/updateUserData", true);

    xhr.send(JSON.stringify({ username: btoa(sessionStorage.getItem('username')), picture: path }));

  }

  const submitAnswers = (e) => {
    e.preventDefault();
    if (favSport && sportLevel && age && favSportTeam && learnSport) {
      if (isNaN(age)) {
        alert("Age has to be valid number!");
        return;
      }
      const data = {
        username: btoa(sessionStorage.getItem("username")),
        Q1: favSport,
        Q2: sportLevel,
        Q3: age,
        Q4: favSportTeam,
        Q5: learnSport,
      };
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:8080/api/v1/updateUserData", true);
      xhr.send(JSON.stringify(data));
      alert("Answers updated");
    } else {
      alert("Please finish the whole survey again!");
    }
  };
  return (
    <div className="centContainer">
      <h5>MY SPORTCRED ACCOUNT</h5>

      <div className="radar">
        <Popup modal trigger={<button>Radar</button>}>
          {close => <Radar close={close} />}
        </Popup>
      </div>

      {finalBio && <h3>My Biography</h3>}
      {finalBio && <h3 className="user-bio">{finalBio}</h3>}
      <h3>Update Biography</h3>
      <textarea
        placeholder=" Enter something about you..."
        name="bio"
        id="bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <button className="button1" onClick={updateBio}>
        Update
      </button>
      <br />
      <h3>update profile picture</h3>
      <button className="button1" onClick={() => setProfilePicture("./lebron.jpg")}>
        <img src={require('./lebron.jpg')} className="avatarPic" alt="avatar" />
      </button>
      <button className="button1" onClick={() => setProfilePicture("./michaeljordan.jpg")}>
        <img src={require('./michaeljordan.jpg')} className="avatarPic" alt="avatar" />
      </button>
      <button className="button1" onClick={() => setProfilePicture("./kobe.jpg")}>
        <img src={require('./kobe.jpg')} className="avatarPic" alt="avatar" />
      </button>
      <br />
      <h3>update questionnaire answers</h3>
      <form onSubmit={submitAnswers}>

        <label htmlFor="favSport">Favourite sport?</label>
        <input
          className="survey-input"
          type="text"
          name="favSport"
          placeholder="Enter sport"
          value={favSport}
          onChange={(e) => {
            setFavSport(e.target.value);
          }}
        />
        <label htmlFor="sportLevel">Highest level of sport played?</label>
        <input
          className="survey-input"
          type="text"
          name="sportLevel"
          placeholder="Enter highest level of sport played"
          value={sportLevel}
          onChange={(e) => {
            setSportLevel(e.target.value);
          }}

        />
        <label htmlFor="age">Age?</label>
        <input
          className="survey-input"
          type="text"
          name="age"
          placeholder="Enter age"
          value={age}
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <label htmlFor="favSportTeam">Team you are rooting for?</label>

        <select size="1" className="survey-input" value={favSportTeam} required onChange={e => setFavSportTeam(e.target.value)}>
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

        <label htmlFor="learnSport">Sport you want to learn?</label>
        <input
          className="survey-input"
          type="text"
          name="learnSport"
          placeholder="Enter sport you want to learn about"
          value={learnSport}
          onChange={(e) => {
            setLearnSport(e.target.value);
          }}
        />
        <button type="submit" className="button1">
          Update
        </button>
      </form>
      <br />
      <h3>Update password</h3>
      <form>
        <label htmlFor="oldPassword"></label>
        <input className="survey-input" type="password" name="oldPassword" placeholder="Enter current password" onChange={event => setCurrentPassword(event.target.value)} />
        <label htmlFor="newPassword"></label>
        <input className="survey-input" type="password" name="newPassword" placeholder="Enter new password" onChange={event => setNewPassword(event.target.value)} />
        <label htmlFor="confirmedPassword"></label>
        <input className="survey-input" type="password" name="confirmedPassword" placeholder="Confirm new password" onChange={event => setConfirmPassword(event.target.value)} />
        <button type="submit" className="button1" onClick={event => handlePassword(event)}>Update</button>
      </form>
      <br />
      <br />
    </div>
  );
};

export default EditProfile;
