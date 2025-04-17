import React from 'react';
import Alert from '@mui/material/Alert';

export default function AlertMessage({ messageText, messageSeverity }) {
  return (
    <div style={{ marginTop: '20px' }}>
      <Alert
        severity={messageSeverity}
      >
        {messageText}
      </Alert>
    </div>
  );
}
