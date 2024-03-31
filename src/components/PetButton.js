import React from 'react';
import Badge from '@mui/material/Badge';
import PetsIcon from '@mui/icons-material/Pets';

const PetButton = ({ onClick, showBadge }) => {
  return (
    <div className='pet-manager-btn' onClick={onClick}>
      <Badge
        color="error"
        // badgeContent={''}
        variant={showBadge ? "dot" : ""}
        
      // anchorOrigin={{
      //   vertical: 'top',
      //   horizontal: 'left',
      // }}
      >
        <PetsIcon />
        <span className='pet-icon-label'>Pet</span>
      </Badge>
    </div>
  );
};

export default PetButton;
