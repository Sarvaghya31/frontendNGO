import React, { useEffect, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import Button from './Button';
import axiosClientUser from './interceptors/axiosClientUser'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const QRScanner = () => {
  const [cameras, setCameras] = useState([]);
  const [selectedCameraindex, setSelectedCameraindex] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scanner, setScanner] = useState(null);
  const navigate=useNavigate()


  useEffect(() => {
    Html5Qrcode.getCameras()
      .then(devices => {
        setCameras(devices);
        if (devices.length > 0) {
          setSelectedCameraindex(0);
        }
      })
      .catch(err => {
        console.error("Error getting cameras: ", err);
      });

    return () => {
      // Cleanup on unmount
      if (scanner) {
        scanner.stop().then(() => {
          scanner.clear();
        }).catch((err) => console.error("Stop error:", err));
      }
    };
  }, []);

  const startScanner = (cameraidx) => {
    if(cameras.length===0)
        {  
            toast.error("No camera Detected");
            return;
        }
    const html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start(
      cameras[cameraidx].id,
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      async(decodedText) => {
        //alert(`Scanned: ${decodedText}`);
        try{
          //console.log(decodedText);
          await html5QrCode.stop();
          html5QrCode.clear();
          setScanning(false);
         const res=await axiosClientUser.get(`${decodedText}`)
         toast.success("Succesfully Donated")
         navigate('/user')
        }
        catch{
          toast.error("Unable to verify the donation right now,Try again later")
        }
        try {
          await html5QrCode.stop();
          html5QrCode.clear();
          setScanning(false);
          navigate('/user')
        } catch (stopErr) {
          console.error("Error stopping scanner:", stopErr);
        }
      },
      (error) => {
        // Optionally handle scan errors
      }
    ).then(() => {
      setScanner(html5QrCode);
      setScanning(true);
    }).catch(err => {
      console.error("Start error: ", err);
    });
  };

  const stopScanner = () => {
    if (scanner) {
      scanner.stop().then(() => {
        scanner.clear();
        setScanning(false);
      }).catch((err) => {
        console.error("Stop error:", err);
      });
    }
  };

  const changeCamera=async ()=>{
    if (scanner) {
    await scanner.stop();
    await scanner.clear();
  }
    const idx=selectedCameraindex===0?1:0;
    setSelectedCameraindex(idx)
    startScanner(idx);
  }

  return (
    <div className="w-full h-full min-h-xl flex flex-col items-center justify-center gap-6 p-4">
      <h2 className="text-xl font-bold mb-2">Scan the QR Code to Donate</h2>

      <div className="mb-4 flex">
        {!scanning ? (
          <Button onClick={()=>{startScanner(selectedCameraindex)}} className="bg-green-500 text-white px-4 py-2 rounded">
            Start Scanning
          </Button>
        ) : (
            <>
          <Button onClick={stopScanner} className="bg-red-500 text-white px-4 py-2 rounded">
            Stop Scanning
          </Button>
          {cameras.length > 1 && (
              <Button
                onClick={changeCamera}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Switch Camera
              </Button>
            )}
          </>
        )}
      </div>
  
      <div id="reader" style={{ width: "300px" }}></div>
      
    </div>
  );
};

export default QRScanner;
