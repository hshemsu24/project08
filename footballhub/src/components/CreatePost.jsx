import supabase from '../supabaseClient';
import React, { useState } from 'react';
import './CreatePost.css';


const CreatePost = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [image_url, setImage_url] = useState('');


  async function handleSubmit(e) {

    if (!title || !content){
      alert('Please fill out required fields!');
      return;
    };
    
    const newPost = {
      title,
      content,
      image_url,
    };


    const { data, error } = await supabase.from('Posts').insert(newPost);

    console.log(data, error);

    setTitle('');
    setContent('');
    setImage_url('');
  }


  

  return (
    <div className='create-post-container'>
      <h2>Create a New Post!</h2>
      <h3>What's on Your Mind?</h3>

      <form className='newPostC' onSubmit={handleSubmit}>
        <label htmlFor="title">*Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="content">*Content:</label>
        <textarea
          name="content"
          id="content"
          cols="30"
          rows="10"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <label htmlFor="image_url">Image URL:</label>
        <input
          type="text"
          id="image_url"
          value={image_url}
          onChange={(e) => setImage_url(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreatePost;
