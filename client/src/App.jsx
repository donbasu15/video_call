import { useRef, useState } from 'react'
import './App.css'





function App() {
  const [stream,setStream] = useState(null);

  const webcamVideo = useRef()
  const startStream = async () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then(newStream => {
        console.log("Got media",newStream);
        webcamVideo.current.srcObject = newStream;
        setStream(newStream);
      });
  
  };
  const stopStream = () => {
    stream.getTracks().forEach((track) => track.stop());

    setPlaying(false);
};
  return (
    <>
      <video ref={webcamVideo} autoPlay playsInline></video>
      <button onClick={startStream}>Start</button>
      <button onClick={stopStream}>Stop</button>
    </>
  )
}

export default App
