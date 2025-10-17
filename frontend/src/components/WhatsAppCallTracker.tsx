import React, { useState, useEffect } from 'react';

const WhatsAppCallTracker = ({ customerNumber, customerName, agentId }) => {
  const [callStatus, setCallStatus] = useState('idle'); // 'idle', 'initiated', 'completed'
  const [callStartTime, setCallStartTime] = useState(null);
  const [callEndTime, setCallEndTime] = useState(null);
  const [callDuration, setCallDuration] = useState(0);
  const [notes, setNotes] = useState('');
  const [timer, setTimer] = useState(0);

  // Format phone number for WhatsApp URL
  const formattedNumber = customerNumber.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${formattedNumber}`;

  // Timer effect for tracking call duration
  useEffect(() => {
    let interval;
    if (callStatus === 'initiated') {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  // Start WhatsApp call and log initiation
  const startWhatsAppCall = () => {
    const startTime = new Date();
    setCallStartTime(startTime);
    setCallStatus('initiated');
    setTimer(0);
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Here you would make API call to save initial log
    logCallToDB({
      agentId,
      customerNumber,
      customerName,
      callStartTime: startTime,
      status: 'initiated'
    });
  };

  // Complete call and save final log
  const completeCall = () => {
    const endTime = new Date();
    setCallEndTime(endTime);
    setCallStatus('completed');
    
    // Calculate duration in minutes
    const durationInMinutes = Math.round(timer / 60);
    setCallDuration(durationInMinutes);

    // Save final log with duration
    logCallToDB({
      agentId,
      customerNumber,
      customerName,
      callStartTime,
      callEndTime: endTime,
      callDuration: durationInMinutes,
      notes,
      status: 'completed'
    });
  };

  // Reset for new call
  const resetCall = () => {
    setCallStatus('idle');
    setCallStartTime(null);
    setCallEndTime(null);
    setCallDuration(0);
    setNotes('');
    setTimer(0);
  };

  // Mock function to save call log to database
  const logCallToDB = (callData) => {
    // Replace this with actual API call to your backend
    console.log('Saving call log:', callData);
    
    // Example API call:
    // fetch('/api/call-logs', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(callData)
    // });
  };

  // Format timer display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="whatsapp-call-tracker">
      <h3>WhatsApp Call with {customerName}</h3>
      <p>Number: {customerNumber}</p>
      
      {callStatus === 'idle' && (
        <button 
          onClick={startWhatsAppCall}
          className="start-call-btn"
        >
          📞 Start WhatsApp Call
        </button>
      )}

      {callStatus === 'initiated' && (
        <div className="call-in-progress">
          <div className="timer">
            Call Duration: {formatTime(timer)}
          </div>
          <p>Call started at: {callStartTime?.toLocaleTimeString()}</p>
          <p>• Please make the call in WhatsApp</p>
          <p>• Return here after the call ends</p>
          
          <div className="complete-section">
            <textarea
              placeholder="Add call notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
            />
            <button 
              onClick={completeCall}
              className="complete-call-btn"
            >
              ✅ Complete Call
            </button>
          </div>
        </div>
      )}

      {callStatus === 'completed' && (
        <div className="call-completed">
          <div className="success-message">
            ✅ Call logged successfully!
          </div>
          <p><strong>Duration:</strong> {callDuration} minutes</p>
          <p><strong>Start Time:</strong> {callStartTime?.toLocaleString()}</p>
          <p><strong>End Time:</strong> {callEndTime?.toLocaleString()}</p>
          {notes && <p><strong>Notes:</strong> {notes}</p>}
          
          <button 
            onClick={resetCall}
            className="new-call-btn"
          >
            📞 New Call
          </button>
        </div>
      )}
    </div>
  );
};

export default WhatsAppCallTracker;