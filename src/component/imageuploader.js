import React, { useState } from 'react';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref as databaseRef, set } from 'firebase/database';
import { auth, storage, database } from '../firebase';
import { useNavigate } from 'react-router-dom';

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');

  const navigate = useNavigate()

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const user = auth.currentUser;
    if (user && image) {
      const imageRef = storageRef(storage, `images/${user.uid}/${image.name}`);
      uploadBytes(imageRef, image).then(() => {
        getDownloadURL(imageRef).then((url) => {
          setUrl(url);
          set(databaseRef(database, `payment_intent/${user.uid}/imageUrl`), url)
          .then(() => {
            alert('Image uploaded successfully!');
            setImage(null);
            if (document.getElementById('imageInput')) {
              document.getElementById('imageInput').value = '';
            }
            navigate('/fetch_data') 
          })
            .catch((error) => {
              console.error('Error updating database: ', error);
              // alert('Failed to upload image. Please try again.');
            });
        });
      });
    }
  };

  return (
    <div>
      <input type="file" id="imageInput" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>
      {/* {url && <img src={url} alt="Uploaded" />} */}
    </div>
  );
};

export default ImageUploader;
