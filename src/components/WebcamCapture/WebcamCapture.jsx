import React, { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from "react-webcam";
import './WebcamCapture.css';
import axios from 'axios';
import baseurl from "../../utils/baseurl";


const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const inputFile = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
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

  const updateImageUrl = async (location) => {
    try {
      const url = `${baseurl}/api/users/${userId}/updateimageurl`;
      const data = {
        imageUrl: location
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

  const handleUploadImageCloudinary = async () => {
    if(imgSrc == null) {
      setDisplayWarning(true);
      console.log("Image is null");
    } else {
      let formData = new FormData();

      formData.append("file", imgSrc);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
      formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
      formData.append("folder", "webcam");

      await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData
        }
      ).then(res => {
        return res.json()
      }).then(data => {
        updateImageUrl(data.secure_url);
      })
    }
  }

  const handleUploadImageAwsS3 = async (e) => {
    let responseData;
    if(imgSrc !== null){
      const image = e.target.files[0];
      //console.log(image);
      let formData = new FormData();
      formData.append("image", image);
      await fetch(`${baseurl}/api/upload`, {
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
        <p className='webcam-heading-text'>
          Take picture to complete Registration?
        </p>
        {imgSrc ? (
            <button className='webcam-capture-button' onClick={retake}>
              Retake Photo
            </button>
          ) : (
            <button className='webcam-capture-button' onClick={capture}>
              Capture Photo
            </button>
        )}
        {/* <input
          type="file"
          ref={inputFile}
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleUploadImageCloudinary}
        /> */}
        <button className='webcam-capture-button' onClick={handleUploadImageCloudinary} >
          Complete Sign Up
        </button>
        {displayWarning && <p className="capture-image-warning-text">Capture Image before Uploading</p>}
      </div>
    </div>
  )
}

export default WebcamCapture;