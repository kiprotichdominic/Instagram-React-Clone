import React, { useState,useEffect } from 'react';
import { Post }  from './components';
import { db } from './firebase';
import './App.css';


const App = () => {
  
  const [posts, setPosts] = useState([])

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot=>{
      // everytime posts are added to firebase this code is fired
      setPosts(snapshot.docs.map(
        doc=>doc.data()))
    })
  }, [])
  

  return (
    <div className='app'>
        {/* Header */}
        <div className="app__header">
            <img src="https://bit.ly/3JULpAn" alt="instagram" className="app__headerImage" />
        </div>
        {/* Posts */}
        {
          posts.map(post=>(
            <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
          ))
        }
    </div>
  )
}

export default App