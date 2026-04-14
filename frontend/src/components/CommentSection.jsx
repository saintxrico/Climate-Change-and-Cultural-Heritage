import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentSection = ({ reportId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    axios.get(`/api/comments/${reportId}`).then(res => setComments(res.data));
  }, [reportId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('/api/comments', { content: newComment, reportId }, { headers: { Authorization: `Bearer ${token}` } });
    setNewComment('');
    // Refresh comments
    axios.get(`/api/comments/${reportId}`).then(res => setComments(res.data));
  };

  return (
    <div className="mt-4">
      <h4 className="text-lg font-bold">Comments</h4>
      {comments.map(comment => (
        <div key={comment.id} className="bg-gray-100 p-2 rounded mb-2">
          <p>{comment.content}</p>
          <small>By {comment.user.name}</small>
        </div>
      ))}
      <form onSubmit={handleSubmit} className="mt-4">
        <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} className="w-full p-2 border" placeholder="Add a comment" />
        <button type="submit" className="bg-blue-600 text-white p-2 mt-2">Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;