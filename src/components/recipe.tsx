

import IRecipe from "../models/recipe"
import IngredientList from './ingredientlist'
import Method from './method'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Spiciness from './recipe/spiciness'
import Schedule from './recipe/schedule'
import Divider from '@material-ui/core/Divider';
import { faPepperHot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface RecipeProp{
    recipe: IRecipe
}

const useStyles = makeStyles({

    root:{
        display: 'flex',
        flexDirection: 'column'
    },
    infoContainer:{
        // backgroundColor: 'red',
        margin: '10px 0px' 
    },
    title:{
        fontSize: '2em'
    },
    ingredientlist:{
        padding: '5px',
    },
    methodTitle:{
        fontSize: '1em',
        padding: '10px 0px'
    }

  });


const _RecipeInfo = ({recipe}: RecipeProp): JSX.Element => {
    return (
        <div>
            <Paper>
                <Schedule schedule={recipe.Schedule} duration={recipe.Duration} />
                <Divider></Divider>
                <Spiciness level={recipe.Spiciness} threshold={5} />
            </Paper>
        </div>

    )
}


const Recipe = ({recipe}: RecipeProp): JSX.Element => {
    const classes = useStyles();
    const imgurl = recipe.Category.ImageUrl
    console.log(imgurl)
    return (
        <div className={classes.root}>
            <div className={classes.infoContainer}>
                <div>
                    <Typography className={classes.title} color="textPrimary" variant="h1">
                        {recipe.Name}
                    </Typography>
                </div>
                <div >
                    <Grid container>
                        <Grid item xs={4} className={classes.ingredientlist}>
                            <IngredientList ingredientQuantities={recipe.IngredientQuantities} />
                        </Grid>
                        <Grid item xs={8}>
                            <_RecipeInfo recipe={recipe} />
                        </Grid>
                    </Grid >
                </div>
            </div>
            <div>
                <Typography className={classes.methodTitle} color="textPrimary" variant="h2">
                        Methods
                </Typography>
                {
                    recipe.Methods.map((method)=>
                    <Method
                    Title={method.Title}
                    Description={method.Description}
                    IngredientQuantities={method.IngredientQuantities}
                    Duration={method.Duration}
                    Order={method.Order}
                    TemperatureInfo={method.TemperatureInfo}
                    Info={method.Info}
                    Offline={method.Offline}
                    />)
                }
            </div>
        </div>
    );
}

export default Recipe