import React, { useState,useEffect } from 'react';
import { Post }  from './components';
import { auth, db } from './firebase';
import './App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};


const App = () => {
  
  const [posts, setPosts] = useState([])
  const [openSignIn, setOpenSignIn] = useState(false)
  const [open, setOpen] = useState(false);

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if (authUser){
        // User has logged in
        console.log(authUser)
        setUser(authUser)

        if(authUser.displayName){
          // Don't update username
        } else{
          // If we just created a User`
          return authUser.updateProfile({
            displayName: username,
          })
        }
      } else{
        // User Logged Out
        setUser(null);
      }
    })
    return () =>{
      // perfotm come cleanup actions
      unsubscribe();
    }
  }, [user,username])
  

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot=>{
      // everytime posts are added to firebase this code is fired
      setPosts(snapshot.docs.map(
        doc=>({
          id: doc.id,
          post: doc.data()
        })))
    })
  }, [])
  const signUp = (e)=>{
    e.preventDefault();

    auth
    .createUserWithEmailAndPassword(email,password)
    .then((authUser)=>{
      authUser.user.updateProfile({
        displayName: username,
      })
    })
    .catch((error)=> alert(error.message))

  }

  const signIn = (e)=>{
    e.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
      .catch((error)=>{
        alert(error.message)
      })
    setOpenSignIn(false)

  }
  

  return (
    <div className='app'>      
<div>
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <center>
              <img src="https://bit.ly/3JULpAn" alt="instagram" className="app__headerImage" />
            </center>
          </Typography>
          <center>
            <form className="app__signup">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Input 
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                    />
                    <Input 
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    />
                  <Input 
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    />
                    <br/>
                    <Button type="submit" onClick={signUp}>Sign Up</Button>
                  </Typography>
            </form>
          </center>
        </Box>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={()=>setOpenSignIn(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <center>
              <img src="https://bit.ly/3JULpAn" alt="instagram" className="app__headerImage" />
            </center>
          </Typography>
          <center>
            <form className="app__signup">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Input 
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    />
                  <Input 
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    />
                    <br/>
                    <Button type="submit" onClick={signIn}>Sign In</Button>
                  </Typography>
            </form>
          </center>
        </Box>
      </Modal>
    </div>
        {/* Header */}
        <div className="app__header">
            <img src="https://bit.ly/3JULpAn" alt="instagram" className="app__headerImage" />
        </div>
        { user ? (
        <Button onClick={()=>auth.signOut()}>Logout</Button>
        ): (
          <div className="app__loginContainer">
                <Button onClick={()=>setOpenSignIn(true)}>Sign In</Button>
                <Button onClick={()=>setOpen(true)}>Sign Up</Button>
          </div>
        )}
        {/* Posts */}
        {
          posts.map(({id,post})=>(
            <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
          ))
        }
    </div>
  )
}

export default App