import React, { useState, Component }  from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import styles from "./background.module.scss";

export default function Background(props) {
  const [open, setOpen] = React.useState(false);
  const title = props.info.title;
  const img = props.info.img;
  const dimensions = props.dimensions;
  const description = props.info.description;
  const handleClickOpen = () => {
      setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const paragraphsRender = description.map(
    (description, index) =>
      <DialogContentText
        sx={{ 
          fontSize: { xs: "1rem", sm: "1.2rem", md: "1.2rem", lg: "1.1rem"},
          fontWeight: { xs: "400", sm: "400", md: "400", lg: "400"},
          fontFamily: "Poppins , sans-serif",
          margin:  { xs: "0.5rem", sm: "1.5rem", md: "1.5rem", lg: "2rem"},
          color: "#011114"
        }}
      > {description}
      </DialogContentText>
  );

   return (
        <div >       
            <Dialog
                fullWidth="true"
                maxWidth="lg"        
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div 
                    style={{
                    display:'flex',
                    justifyContent:'center',
                    flexDirection:'row',
                    alignItems: 'center' }}>
                    
                    <CardMedia
                        sx={{
                            objectFit: "contain",   
                            width: { xs: "50px", sm: "60px", md: "100px", lg: "100px"},
                            height: { xs: "100px", sm: "130px", md: "130px", lg: "190px" },
                            
                        }}
                        
                        component="img"
                        image={img}
                        alt={title}
                    />
                    <DialogTitle 
                         sx={{ 
                            fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.5rem", lg: "1.5rem"},
                            fontWeight: { xs: "500", sm: "500", md: "500", lg: "500"},
                            fontFamily: "Poppins , sans-serif",
                            color: "#011114"
                         }}
                    > {title} </DialogTitle>
                </div>
     
   
                <DialogContent dividers>
                    { paragraphsRender }                    
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={handleClose}
                        sx={{ 
                            fontSize: { xs: "0.8rem", sm: "1rem", md: "1rem", lg: "1.2rem"},
                            fontWeight: { xs: "600", sm: "600", md: "600", lg: "600"},
                            fontFamily: "Poppins , sans-serif",
                            margin:  { xs: "1rem", sm: "1rem", md: "1rem", lg: "1rem"},
                            color: "#011114"
                        }}
                        autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Card
                onClick={handleClickOpen}
                className={styles.fullHeightCard}
                sx={{ 
                    width: dimensions.width, 
                    height: dimensions.height,
                
                    '&:hover': {
                        backgroundColor: 'primary.secondary',
                        opacity: [0.9, 0.8, 0.7],
                    }, 
                }}
                raised='true'
                boxshadow={1}
                >
               
                    <CardActionArea>
                        <div  style={{ display:'flex', justifyContent:'center' }}>
                            <CardMedia
                                sx={{
                                    objectFit: "contain",
                                    padding: "1em 1em 1em 1em", 
                                    width: { xs: "80px", sm: "90px", md: "110px", lg: "120px"},
                                    height: { xs: "80px", sm: "90px", md: "110px", lg: "120px" }}}
                                component="img"
                                image={img}
                                alt={title}
                            />
                        </div>
                        <CardContent>
                            <div className={styles.backgroundTitle}>
                                <span className={styles.backgroundTitleLabel}> {title} </span>
                            </div>
                        </CardContent>
                    </CardActionArea>
              
            </Card>
        </div>
    )
}

Background.prototype = {
    title : PropTypes.string.isRequired,
    img: PropTypes.object.isRequired,
    dimensions: PropTypes.object.isRequired,
    desciption: PropTypes.array.isRequired
}
