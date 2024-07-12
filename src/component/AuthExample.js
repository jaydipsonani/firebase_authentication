import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AuthExample = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate()

  const handleSignUp = () => {
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    setError('');

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert('User created successfully!');
        setEmail('')
        setPassword('')
      })
      .catch((error) => {
        console.error('Error signing up:', error);
        setError(error.message);
      });
      
  };

  const handleSignIn = () => {
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    setError('');

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmail('')
        setPassword('')
        alert('User signed in successfully!');
        navigate('/fetch_data')
      })
      .catch((error) => {
        console.error('Error signing in:', error);
        setError(error.message);
      });
  };

  return (
    <div>
      email:- <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      /><br></br>
      password:-<input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        /><br></br>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default AuthExample;

