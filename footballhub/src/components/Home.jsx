import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../supabaseClient';
import './Home.css';

const Home = () => {

    const [posts, setPosts] = useState([]);
    const [sortBy, setSortBy] = useState('newest');
    const [searchTerm, setSearchTerm] = useState('');


    async function fetchPosts() {
        let fetchedData;

        if (sortBy === 'newest') {
            const { data } = await supabase.from('Posts').select('*').order('created_at', { ascending: false });
            fetchedData = data;
        } else if (sortBy === 'oldest') {
            const { data } = await supabase.from('Posts').select('*').order('created_at', { ascending: true });
            fetchedData = data;
        } else if (sortBy === 'most-liked') {
            const { data } = await supabase.from('Posts').select('*').order('upvotes', { ascending: false });
            fetchedData = data;
        }

        setPosts(fetchedData);
        //console.log(data);
    }

    useEffect(() => {
        fetchPosts();
    }, [sortBy]);

    const upvotePost = async (postId) => {
        const { data: updatedData, error: fetchError } = await supabase
      .from('Posts')
      .select('*')
      .eq('id', postId)
      .single();
        const { data, error } = await supabase.from('Posts').update({ upvotes: updatedData.upvotes + 1 }).eq('id', postId);
    
        if (error) {
          console.error('Error upvoting post: ', error);
        } else {
          // Fetch the updated post data
          fetchPosts();
        }
      };
    
    
    return (
        <div className="home">
            <h2>See What Everyone Is Talking About In Football Today!</h2>

            <div className="sort">

                <label htmlFor="search">Search by title: </label>
                <input
                    className='search'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='Search by title'
                />
                <label htmlFor="sort">Sort Posts by: </label>
                <select
                    name="sort"
                    id="sort"
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="most-liked">Most Liked</option>
                </select>
            </div>

            

            <div className='posts'>
                
            {posts.filter((post) =>post.title.toLowerCase().includes(searchTerm.toLowerCase())).map((post) => (
                    <div className="post-preview" key={post.id}>
                        <Link to={`/view/${post.id}`}>
                            <h2>{post.title}</h2>
                        </Link>
                        {post.image_url && <img src={post.image_url} alt="" />}
                            <p>{post.content}</p>
                            <div className="post-details">
                                <p>
                                    Upvotes: {post.upvotes}{' '}
                                    <button onClick={() => upvotePost(post.id)}>Upvote</button>
                                </p>
                                <p>Posted On: {new Date(post.created_at).toLocaleString()}</p>
                            </div>
                       
                    </div>
                ))}

            </div>


        </div>
    );
    }

export default Home;