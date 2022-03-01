import React from 'react'
import Avatar from '@mui/material/Avatar'
import './Post.css'

const Post = ({username,caption,imageUrl}) => {
  return (
    <div className='post'>
      <div className="post__header">
        <Avatar alt="avatar" className="post__avatar" src='' />
        <h3>{username}</h3>   
      </div>    
      <img className='post__image' src={imageUrl} alt="" /> 
      <p className="post__text"><strong>{username}</strong>{caption}</p>
    </div>
  )
}

export default Post