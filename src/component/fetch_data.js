import React, { useEffect, useState } from 'react';
import { auth, database } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

const Dashboard = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      const userRef = ref(database, `payment_intent/${user.uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        console.log("data",data);
        setName(data?.name || '');
        setImageUrl(data?.imageUrl || '');
        setLoading(false);
      });
    } else {
      setName('');
      setImageUrl('');
      setLoading(false);
    }
  });

  return () => unsubscribe();
}, []);

return (
  <div>
    <h1>Dashboard</h1>
    {loading ? <p>Loading...</p> : (
      <div>
        <p>Name: {name}</p>
        {imageUrl && <img src={imageUrl} alt="Profile" />}
      </div>
    )}
  </div>
);
};

export default Dashboard;
