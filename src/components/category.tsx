

import ICategory from "../models/category"


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });

const Category = (category: ICategory): JSX.Element => {

    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="/static/images/food.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {category.Name}
                    </Typography>
                    {/* <Typography variant="body2" color="textSecondary" component="p">
                        {category.Description}
                    </Typography> */}
                </CardContent>
            </CardActionArea>
            {/* <CardActions>
                <Button size="small" color="primary">
                Share
                </Button>
                <Button size="small" color="primary">
                Learn More
                </Button>
            </CardActions> */}
        </Card>
    );
}

const _renderCategories = (categories: ICategory[]): JSX.Element => {
    return (
        <div>
            <Grid container spacing={3}>
                {categories.map((c) =>
                    <Grid item xs={3}>
                        <Category
                            Id = {c.Id}
                            Name = {c.Name}
                            Description = {c.Description}
                        />  
                    </Grid>
                    )}
            </Grid>
        </div>
    )
}


// {categories.map (
//     (c ) => 
//       <Category 
//         Id = {c.Id}
//         Name = {c.Name}
//         Description = {c.Description}
//       />) }
// export default Category
export default _renderCategories