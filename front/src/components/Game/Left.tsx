import React from 'react';
import { Button } from '@mui/material';
import { useParams, Navigate, useNavigate } from 'react-router-dom';

export const Left = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button variant="outlined" color="warning" onClick={() => navigate('/')}>
        EXIT
      </Button>
    </div>
  );
};
