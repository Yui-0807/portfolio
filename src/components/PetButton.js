import React from 'react';
import Badge from '@mui/material/Badge';
import PetsIcon from '@mui/icons-material/Pets';

const PetButton = ({ onClick, showBadge }) => {
  return (
    <>
    <Badge color="error" variant={showBadge ? "dot" : "standard"} onClick={onClick}>
      <PetsIcon />
    </Badge>
    <span>Pet</span>
    </>
  );
};

export default PetButton;
