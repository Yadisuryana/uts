import { useState } from 'react';
import supabase from '@/lib/supabaseClient';

export default function Contact() {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('ratings').insert([
      { name, rating, comment }
    ]);

    if (error) {
      setMessage('Error submitting feedback.');
    } else {
      setMessage('Thank you for your feedback!');
      setName('');
      setRating(0);
      setComment('');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Rate and Comment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          placeholder="Your Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input 
          type="number" 
          placeholder="Rating (1-5)" 
          min="1" max="5" 
          value={rating} 
          onChange={(e) => setRating(parseInt(e.target.value))}
          className="w-full p-2 border rounded"
          required
        />
        <textarea 
          placeholder="Leave a comment (optional)" 
          value={comment} 
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded"
        ></textarea>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
}
