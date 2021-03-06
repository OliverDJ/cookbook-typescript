import IIngredientQuantity from "../models/ingredientquantity"
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.4, 1),
        // maxWidth: theme.spacing(11),
        // height: theme.spacing(6),
      },
      backgroundColor: '#eeeeee'

    },
    listItem: {
      padding: '0px',
      margin: '3px',
      // width: '50%'
      // backgroundColor: 'blue'

    },
    listItemText:{
        padding: '0px',
        fontSize:'0.45em',
        
        //Insert your required size
        // backgroundColor: 'red'
    }
  }));


const IngredientQuantity = (iq: IIngredientQuantity): JSX.Element => {
    const classes = useStyles();
    return(
        <li className={classes.listItem}>
            <Paper  className={classes.root}>
                <ListItemText
                    classes={{primary:classes.listItemText}}
                    primary={iq.Ingredient.Name}
                    secondary={`${iq.Measurement.Fields[0]} ${iq.Measurement.Case}`} />
            </Paper>
        </li>
    )
}

export default IngredientQuantity;