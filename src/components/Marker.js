import React from 'react';
import { IconButton, Paper, Typography } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import moment from 'moment';

export const Marker = ({ location, open = false, onDelete, onEdit }) => {
  const { name, date, startTime, endTime } = location;
  const [isOpen, setIsOpen] = React.useState(open);
  const formattedDate = moment(date).format('l');
  const formattedTime = time => moment(time).format("HH:mm");

  const handleDelete = React.useCallback((e) => {
    onDelete(location.id);
  }, [location]);

  const handleEdit = React.useCallback((e) => {
    onEdit(location.id);
  }, [location]);

  return (
    <div
      onClick={() => setIsOpen(true)}
      style={{ width: 50, height: 50, background: 'rgba(243,7,7,0.3)', borderRadius: '50%', cursor: 'pointer', position: 'relative' }}>
      {isOpen &&
        <Paper style={{ padding: 5, position: 'absolute', top: -85, height: 80, width: 110, zIndex: 999, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="caption">{name}</Typography>
          <Typography variant="caption">{formattedDate}</Typography>
          <div>
            <Typography variant="caption">{formattedTime(startTime)}-{formattedTime(endTime)}</Typography>
          </div>
          <div style={{ display: 'flex', justifyContent: "space-between" }}>
            <Edit fontSize="small" onClick={handleEdit} />
            <Delete fontSize="small" onClick={handleDelete} />
          </div>
        </Paper>
      }
    </div>
  )
};
