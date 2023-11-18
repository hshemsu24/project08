import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import './ViewPost.css';

const ViewPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const [comment, setComment] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [updatedPost, setUpdatedPost] = useState({
        title: '',
        content: '',
        image_url: '',
        comments: '',
    });
    
    useEffect(() => {
        const fetchPost = async () => {
          const { data, error } = await supabase
            .from('Posts')
            .select('*')
            .eq('id', id)
            .single();
          if (error) {
            console.error('Error fetching post: ', error);
          } else {
            setPost({ ...data, comments: data.comments || [] }); // Ensure comments is an array
            setUpdatedPost({
              title: data.title,
              content: data.content,
              image_url: data.image_url,
            });
          }
        };
      
        fetchPost();
      }, [id]);

      const upvotePost = async () => {
        if (!post) return;
            const { data, error } = await supabase.from('Posts').update({ upvotes: post.upvotes + 1 }).eq('id', id);
        if (error) {
          console.error('Error upvoting post: ', error);
        } else {
          setPost({ ...post, upvotes: post.upvotes + 1 });
        }
      };
    
      const deletePost = async () => {
        
        const { data, error } = await supabase.from('Posts').delete().eq('id', id);
        
        if (error) {
          console.error('Error deleting post:', error);
        } else {
          navigate('/');
        }
      };
    
      const addComment = async () => {
        if (!post || !comment) return;
    
        const updatedComments = [...post.comments, comment];
        const { data, error } = await supabase.from('Posts').update({ comments: updatedComments }).eq('id', id);
       
        if (error) {
          console.error('Error adding comment:', error);
        } else {
          setPost({ ...post, comments: updatedComments });
          setComment('');
        }
      };
    
      const toggleEditMode = () => {
        setIsEditing(!isEditing);
      };
    
      const updatePost = async () => {
        if (!post) return;
        
        const { data, error } = await supabase.from('Posts').update(updatedPost).eq('id', id);
        
        if (error) {
          console.error('Error updating post:', error);
        } else {

            const { data: updatedData, error: fetchError } = await supabase
      .from('Posts')
      .select('*')
      .eq('id', id)
      .single();

          setPost(updatedData);
          setIsEditing(false);
        }
      };


    return (
        <div>
             {post && (
        <div className='card'>
          {isEditing ? (
            <div className='edit-form'>
              <input
                value={updatedPost.title}
                onChange={(e) =>
                  setUpdatedPost({ ...updatedPost, title: e.target.value })
                }
                placeholder='Title'
              />
              <input
                value={updatedPost.content}
                onChange={(e) =>
                  setUpdatedPost({ ...updatedPost, content: e.target.value })
                }
                placeholder='Content'
              />
              <input
                value={updatedPost.image_url}
                onChange={(e) =>
                  setUpdatedPost({ ...updatedPost, image_url: e.target.value })
                }
                placeholder='Image URL'
              />
              <button onClick={updatePost}>Save</button>
            </div>
          ) : (
            <>
              <h2>{post.title}</h2>
              <div>{post.content}</div>
              {post.image_url && <img src={post.image_url} alt="" />}
            </>
          )}
          <div>Upvotes: {post.upvotes}</div>
          <button className='upvote' onClick={upvotePost}>Upvote</button>
          <button onClick={deletePost}>Delete</button>
          <button onClick={toggleEditMode}>Edit</button>
          <br></br>
          <input
            className='comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='Add a comment'
          />
          <button onClick={addComment}>Add Comment</button>

          <h3>Comments</h3>
          {post.comments && Array.isArray(post.comments) && post.comments.map((comment, index) => (
  <div className='comment' key={index}>{comment}</div>
))}
        </div>
      )}
        </div>
    );
};

export default ViewPost;
