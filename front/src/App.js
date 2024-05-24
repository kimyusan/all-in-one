import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostList from './board/PostList';
import PostForm from './board/PostForm';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const addPost = async (title, content) => {
    try {
      const response = await axios.post('http://localhost:8080/api/posts', { title, content });
      setPosts([...posts, response.data]);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <div className="App">
      <h1>Bulletin Board</h1>
      <PostForm addPost={addPost} />
      <PostList posts={posts} />
    </div>
  );
}

export default App;
