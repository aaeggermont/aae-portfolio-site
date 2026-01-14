import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import { Button, CardActionArea, CardActions } from '@mui/material';
import './Project.scss';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

//import { useNavigate } from 'react-router-dom';

type ProjectProps = {
    index: number;
    projectId: number;
    projectLink: string;
    similarProjects: object;
    skills: string;
    title: string;
    description: string;
    thumbnailImg: any;
}

type Props = { data: ProjectProps };

export default function Project ({ data }: Props ) {

    const { title, thumbnailImg, description, skills, projectLink } = data;

    console.log('Project data:', data);

    /*
    const navigate = useNavigate();

    const handleProjectPage = (event) => {
        setTimeout(() => {
            navigate( `/${projectLink}` , { replace: false });
        }, 500);  
    }; */
    
    return (
        <div className="flip-card-container">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <Card 
                            sx={{ 
                                width: { xs: 280, sm: 280, md: 276, lg: 345 },
                                height: { xs: 180, sm: 180, md: 177, lg: 221 },
                                '--Card-padding': '0px', 
                            }}> 
                                <CardMedia
                                    sx={{
                                       //objectFit: 'cover',
                                       width: { xs: 280, sm: 280, md: 276, lg: 345 },
                                       height: { xs: 180, sm: 180, md: 177, lg: 221 },
                                    }}
                                    component="img"
                                    image={thumbnailImg}
                                    alt={title} />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        bottom: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        '& > :not(style)': {
                                            m: 0,
                                            width: '100%',
                                            height: '100%',
                                          },
                                        bgcolor: 'rgba(0, 0, 0, 0.20)',
                                        color: 'white',
                                        fontSize: '0.2rem' }}>
                                    <div>
                                        <Typography 
                                             sx={{
                                            //objectFit: 'cover',
                                            width: { xs: 280, sm: 280, md: 276, lg: 345 },
                                            height: { xs: 180, sm: 180, md: 177, lg: 221 },
                                            fontFamily: "'Montserrat', sans-serif",
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.1rem',
                                            fontWeight: '500',
                                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                                        }} 
                                         gutterBottom>
                                        
                                            {title}
                                        </Typography>
                                    </div>
                                </Box>
                             
                        </Card>
                    </div>
                    <div className="flip-card-back">
                        <Card
                            sx={{ 
                                width: { xs: 280, sm: 320, md: 345, lg: 345 },
                                height: { xs: 180, sm: 205, md: 221, lg: 221 },
                                backgroundColor:  'rgba(0, 0, 0, 0.05)',
                                '--Card-padding': '0px',
                            }}>
                                <CardActionArea >
                                    <CardContent>
                                        <Typography 
                                            sx={{
                                                fontFamily: "'Poppins', sans-serif",
                                                fontSize: '1rem',
                                                fontWeight: '500'
                                            }} 
                                            gutterBottom variant="h5" component="div">
                                            {title}
                                        </Typography>
                                        <Typography 
                                            sx={{  
                                                fontFamily: "'Poppins', sans-serif",
                                                fontSize: '0.8rem',
                                                fontWeight: '400'
                                            }}
                                        variant="body2" color="text.secondary">
                                        {description}
                                        </Typography>
                                        <Typography 
                                            sx={{ 
                                                paddingTop: '1rem',
                                                marginTop: '2px',
                                                fontWeight: '800',
                                                fontSize: '0.8rem',
                                                fontFamily: "'Poppins', sans-serif" }}
                                                variant="body2" color="text.secondary">
                                        {skills}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                        </Card>
                    </div>
                </div>
            </div>
    );  
}
