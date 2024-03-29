import React from 'react';
import Badge from '@mui/material/Badge';
import PetsIcon from '@mui/icons-material/Pets';

const PetButton = ({ onClick, showBadge }) => {
  return (
    <div className='pet-manager-btn'>
      <Badge
        color="error"
        // badgeContent={''}
        variant={showBadge ? "dot" : ""}
        onClick={onClick}
        // anchorOrigin={{
        //   vertical: 'top',
        //   horizontal: 'left',
        // }}
      >
        <PetsIcon />
      </Badge>
    </div>
  );
};

export default PetButton;
