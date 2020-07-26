import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


import EditProject from './EditProject';


export default function EditProjectWithModal(props) {

    const [open, setOpen] = React.useState(false);
    
    const handleClickOpen = () => {
    setOpen(true);};
    
    const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <div>

      {
        props.large ?
          <Button
            onClick={handleClickOpen}
          >
            Edit Project
          </Button>
          :
          <Button
            onClick={handleClickOpen}
          >
          </Button>
      }


      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        maxWidth="xl"
      >
        <DialogTitle>
          <Button  onClick={handleClose}>
            Close
          </Button>
          Edit Project • {props.project_name}
        </DialogTitle>

        <DialogContent style={{ padding: "5px 10px" }}>
          <EditProject projectID={props.projectID} />
        </DialogContent>
      </Dialog>
    </div>
  );
}