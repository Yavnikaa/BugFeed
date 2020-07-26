import React from 'react';
import ReportBug from './ReportBug'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';



export default function NewIssueWithModal(props) {
const [open, setOpen] = React.useState(false);
const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>

      {
        props.floating

          ?

          <Fab
            onClick={handleClickOpen}
            color="secondary"
            style={{ position: "absolute", bottom: "30px", right: "30px" }}
          >
          </Fab>

          :

          <Button
            onClick={handleClickOpen}
          >
            Add New Bug
          </Button>

      }


      <Dialog
        
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
       
      >

        <DialogTitle >
          <Button onClick={handleClose}> Close
          </Button>

          {props.project_name} • New Bug

            </DialogTitle>

        <DialogContent style={{ padding: "5px 10px" }}>
          <ReportBug
            project={props.project}
            handleClose={handleClose}
          />
        </DialogContent>

      </Dialog>


    </>
  );
}

    