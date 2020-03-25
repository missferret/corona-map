import React from 'react';
import { Paper, Typography } from '@material-ui/core';

export const Marker = ({ location, open = false }) => {
  const { name, date, startTime, endTime } = location;
  const [isOpen, setIsOpen] = React.useState(open);
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      style={{ width: 50, height: 50, background: 'rgba(243,7,7,0.3)', borderRadius: '50%', cursor: 'pointer', position: 'relative' }}>
      {isOpen &&
        <Paper style={{ padding: 5, position: 'absolute', top: -85, height: 70, width: 100 }}>
          <Typography variant="caption">{name}</Typography>
          <Typography variant="caption">{date}</Typography>
          <div>
            <Typography variant="caption">{startTime}-{endTime}</Typography>
          </div>
        </Paper>
      }
    </div>
  )
};
