import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Webcam from "react-webcam";
import './WebcamCapture.css';
import axios from 'axios';


const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const inputFile = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const { state } = useLocation();
  const [displayWarning, setDisplayWarning] = useState(false);
  const [userId, setUserId] = useState(null);


  useEffect(() => {
    let userIdStr = localStorage.getItem("userId");
    console.log(userIdStr);
    setUserId(userIdStr);
  }, []);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setDisplayWarning(false);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  }

  const updateImageUrl = async (s3location) => {
    try {
      const url = `http://localhost:8080/api/users/${userId}/updateimageurl`;
      const data = {
        imageUrl: s3location
      }
      const { data: res } = await axios.post(url, data);
      console.log(res);
      localStorage.removeItem("userId");
      window.location = "/emailsent";
    }
    catch(error) {
      console.log(error);
    }
  }

  const handleUploadImage = async (e) => {
    let responseData;
    if(imgSrc !== null){
      const image = e.target.files[0];
      console.log(image);
      let formData = new FormData();
      formData.append("image", image);
      //var data = imgSrc.toString().replace(/^data:image\/jpg;base64,/, "");
      //var buf = Buffer.from(data, "base64");
      await fetch('http://localhost:8080/api/upload', {
        method: 'POST',
        body: formData
      }).then((res) => res.json())
        .then((data) => {
          responseData = data;
        })
      
      if(responseData.success){
        console.log(responseData);
        updateImageUrl(responseData.location);
      } else {
        console.log("Failed to upload image");
      }
    } else {
      console.log('Image is Null');
    }
  }

  const onSubmitImage = () => {
    if(imgSrc == null) {
      setDisplayWarning(true);
    } else {
      inputFile.current.click();
    }
  }

  return (
    <div className="webcam-container">
      <div className='webcam-left-panel'>
        {imgSrc ? (
            <img src={imgSrc} alt="webcam" />
          ) : (
            <Webcam
              width={600} 
              height={450} 
              ref={webcamRef} 
              mirrored={true}
              screenshotFormat="image/jpeg"
              screenshotQuality={0.98}
            />
        )}
      </div>
      <div className="webcam-right-panel">
        <p className='webcam-heading-text'>Take picture to complete Registration?</p>
        {imgSrc ? (
            <button className='webcam-capture-button' onClick={retake}>
              Retake Photo
            </button>
          ) : (
            <button className='webcam-capture-button' onClick={capture}>
              Capture Photo
            </button>
        )}
        <input
          type="file"
          ref={inputFile}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleUploadImage}
        />
        <button className='webcam-capture-button' onClick={onSubmitImage} >
          Complete Sign Up
        </button>
        {displayWarning && <p className="capture-image-warning-text">Capture Image before Uploading</p>}
      </div>
    </div>
  )
}

export default WebcamCapture;