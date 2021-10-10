import './App.css';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from "firebase/auth";
import initializeAuth from './Firebase/firebase.initialize';
import { useState } from 'react';


//./Firebase/firebase.initialize
initializeAuth();

const providerGoogle = new GoogleAuthProvider();
const providerGitHub = new GithubAuthProvider();

function App() {

  const [user, setUser] = useState({})
  const auth = getAuth();
  // sign in with google
  const handleGoogle = () => {
    signInWithPopup(auth, providerGoogle)

      .then((result) => {
        const { displayName, email, photoURL } = result.user;

        const loginUser = {
          img: photoURL,
          name: displayName,
          email: email,
        };

        console.log(loginUser)
        setUser(loginUser);
      }).catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(errorMessage);
      });

  }
  const handleGit = () => {
    signInWithPopup(auth, providerGitHub)

      .then((result) => {
        const { displayName, email, photoURL } = result.user;

        const loginUser = {
          img: photoURL,
          name: displayName,
          email: email,
        };

        console.log(loginUser)
        setUser(loginUser);
      }).catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(errorMessage);
      });

  }
  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser({});
    }).catch((error) => {
      // An error happened.
    });
  }


  return (
    <div className="App">

      {!user.name ? <div>
        <button className="btn btn-primary mt-5" onClick={handleGoogle}>Sign in with Google</button>

        <button className="btn btn-dark mt-5 ms-5" onClick={handleGit}>Sign in with Github</button>
      </div>
        :
        <div>
          <button className="btn btn-danger mt-5" onClick={handleSignOut}>Sign Out</button>
        </div>
      }
      {
        user.name &&
        <div className="container w-100">
          <div className="card mt-5">
            <img src={user.img} className="card-img-top w-25 mx-auto mt-5" alt={user.img} />
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text">{user.email}</p>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
