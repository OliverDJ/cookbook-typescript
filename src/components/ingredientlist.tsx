
import IIngredientQuantity from "../models/ingredientquantity"
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0, 0.4, 1, 0.4),
      },
      backgroundColor: '#eeeeee'
      
    },
    container:{
        margin: theme.spacing(3, 0)
    },
    listItem: {
      padding: '0px',
      margin: '3px',
    },
    listItemText:{
        padding: '0px',
        fontSize:'0.45em',
    }
  }));


interface IngredientProp {
    ingredienQuantity: IIngredientQuantity,
    divider: boolean
}

interface IngredientListProp {
    ingredientQuantities: IIngredientQuantity[]
    
}

const _IngredientQuantity = ( {ingredienQuantity, divider}: IngredientProp ): JSX.Element => {
    const classes = useStyles();
    console.log(divider)
    return(
        <div>
        <ListItem button >
            <ListItemText
                classes={{  primary:classes.listItemText}}
                primary={ingredienQuantity.Ingredient.Name}
                secondary={`${ingredienQuantity.Measurement.Fields[0]} ${ingredienQuantity.Measurement.Case}`} />
        </ListItem>
        {divider == true && < Divider />}
        </div>
    )
}
const renderDivider = (l: number, i: number) => {
    return i + 1 < l
}

const IngredientList = ({ingredientQuantities} : IngredientListProp): JSX.Element => {
    const classes = useStyles();
    const length = ingredientQuantities.length
    return (
        <Paper className={classes.container}>
            <List >
                {ingredientQuantities.map((im, i) =>
                    <_IngredientQuantity divider={renderDivider(length, i)} ingredienQuantity={im} />)}
            </List>
        </Paper>

    )
}

export default IngredientList