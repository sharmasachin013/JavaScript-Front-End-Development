import React, { useState,useEffect  } from 'react';
import QRCode from 'qrcode';
import { ToastContainer, toast } from 'react-toastify';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'react-toastify/dist/ReactToastify.css';
import './QRGenerator.css'; // Import the custom CSS

const QRGenerator = () => {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('png');
  const [qrPreview, setQrPreview] = useState('');

  const validateUrl = (url) => {
    const regex = /^(https?:\/\/)?([\w\d-]+\.){1,}[\w]{2,}(\/.+)?$/;
    return regex.test(url);
  };

   // Generate live QR preview when URL changes
   useEffect(() => {
    if (validateUrl(url)) {
      QRCode.toDataURL(url)
        .then((dataUrl) => {
          setQrPreview(dataUrl);
        })
        .catch(() => {
          setQrPreview('');
        });
    } else {
      setQrPreview('');
    }
  }, [url]);

  const handleGenerate = async () => {
    if (!validateUrl(url)) {
      toast.error('❌ Invalid URL!');
      return;
    }

    try {
      const fileName = `qr_${Date.now()}.${format}`;
      const qrDataUrl = await QRCode.toDataURL(url);

      if (format === 'png' || format === 'svg') {
        const blob = await (await fetch(qrDataUrl)).blob();
        saveAs(blob, fileName);
      } else if (format === 'pdf') {
        const pdf = new jsPDF();
        pdf.addImage(qrDataUrl, 'PNG', 10, 10, 180, 180);
        pdf.save(fileName);
      }

      updateLog(url);
      toast.success('✅ QR Code saved!');
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  const updateLog = (url) => {
    const log = localStorage.getItem('qrLog') || '';
    const existingUrls = new Set(log.split('\n').filter(Boolean).map(line => line.trim()));
    if (existingUrls.has(url)) return;

    existingUrls.add(url);
    const updatedLog = Array.from(existingUrls).join('\n') + '\n';
    localStorage.setItem('qrLog', updatedLog);

    const finalBlob = new Blob([updatedLog], { type: 'text/plain;charset=utf-8' });
    saveAs(finalBlob, 'qr_log.txt');
  };

  const handleDownloadLog = () => {
    const log = localStorage.getItem('qrLog') || '';
    const blob = new Blob([log], { type: 'text/plain' });
    saveAs(blob, 'qr_log.txt');
  };
  return (
    <div className="qr-wrapper">
      <div className="qr-container">
        <h2 className="qr-title">🔳 QR Code Generator</h2>
  
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="qr-input"
          id="qrurl"
        />
  
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="qr-select"
        >
          <option value="png">PNG</option>
          <option value="svg">SVG</option>
          <option value="pdf">PDF</option>
        </select>
  
        <button onClick={handleGenerate} className="qr-button">
          Generate QR Code
        </button>
  
        <button onClick={handleDownloadLog} className="qr-log-btn">
          📄 Download Log File
        </button>
        {qrPreview && (
          <div style={{ textAlign: 'center', marginBottom: '15px' }}>
  <img
  src={qrPreview}
  alt="QR Preview"
  style={{
    width: '250px', // Increase size here
    height: '250px',
    margin: 5,
    padding: 0,
    display: 'inline-block',
    border: '1px solid #ddd',
    borderRadius: '8px'
  }}
/>
          </div>
        )}

  
        <ToastContainer style={{ textAlign: 'center', marginBottom: '15px' }} />
      </div>
    </div>
  );
 
};

export default QRGenerator;
