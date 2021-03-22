




import IRecipeThumbnail from "../models/recipethumbnail"

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router'
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });

const RecipeThumbnail = (recipeThumbnail: IRecipeThumbnail): JSX.Element => {
    console.log("Rt: ", recipeThumbnail)
    const history = useHistory();
    const classes = useStyles();

    const _routeOnClick = (id: number) =>{
        const linkPath = `/recipe/${id}`
        history.push(linkPath)
    }
    return (
        <Card className={classes.root} onClick={()=> _routeOnClick(recipeThumbnail.Id)}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="/static/images/food.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {recipeThumbnail.Name}
                    </Typography>

                </CardContent>
            </CardActionArea>
        </Card>
    );
}


const _renderRecipeThumbnails = (thumbnails: IRecipeThumbnail[]): JSX.Element => {
    return (
        <div>
            <Grid container spacing={3}>
                {thumbnails.map((c) =>
                    <Grid item xs={12}>
                        <RecipeThumbnail
                            Id = {c.Id}
                            Name = {c.Name}
                            Duration = { c.Duration }
                            Spiciness = {c.Spiciness}
                            Category = {c.Category}
                        />  
                    </Grid>
                    )}
            </Grid>
        </div>
    )
}

export default _renderRecipeThumbnails