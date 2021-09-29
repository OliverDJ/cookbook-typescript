


import IMethod from "../models/method"
import IIngredientQuantity from "../models/ingredientquantity"
import ITemperatureInfo from "../models/temperatureinfo"
import IngredientQuantity from "./ingredientquantity"

import TemperatureInfo from "../components/method/temperature"
import TimeInfo from "../components/method/time"

import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'


const useStyles = makeStyles((theme) => ({
    root: {
        // width: '100%',
        //   maxWidth: '80%',

        backgroundColor: theme.palette.background.paper,
    },
    grid:{
        justifyContent: 'center',
        textAlign: 'left'
    },
    infoGrid:{
        justifyContent: 'flex-end',
    },
    gridItem:{
        margin: theme.spacing(0.2,1)
    },
    section1: {
      textAlign: 'left',
      margin: theme.spacing(1, 3),
    },
    section2: {
        textAlign: 'left',
        margin: theme.spacing(1, 3, 4, 3),
    },
    section3: {
        margin: theme.spacing(1,3),
        // backgroundColor: 'red'
    },
    title:{
        padding: theme.spacing(1, 3, 1, 3),
        // color: 'red'
    },
    emptyDiv: {
        margin: '7px',
        padding: '7px'
    },
    ingredientText:{
        textAlign: 'left',
        marginTop: '5px'
    },
    methodTitle:{
        fontSize:'0.60em',
        margin: theme.spacing(1,0)
    }
  }));

const _renderIngredientQuantity = (iq: IIngredientQuantity) =>{
    return (
            <IngredientQuantity
                Ingredient={iq.Ingredient}
                Measurement={iq.Measurement}
                />
    )
}

const _rendeIngredient = (classes: any, iqL : IIngredientQuantity[]) => {
    if(iqL.length === 0){
        return (
            <div className={classes.emptyDiv}>
            </div>)
    }
    else{
        return(
            <div >
                <Divider variant="fullWidth" />
                {/* <Typography gutterBottom variant="body1" className={classes.ingredientText}>
                    Ingredients
                </Typography> */}
                <List className='ingredient-quantity-list'>
                    {iqL.map((iq) =>_renderIngredientQuantity(iq))}
                </List>
            </div>
        )
    }
}
const _shouldRenderTemp = (t?: ITemperatureInfo) => {
    if(t == null){
        return false
    }
    else{
       return true
    }
}

const Method = (method: IMethod): JSX.Element => {
    const classes = useStyles();
    return (
    <div className={classes.root}>
         <Grid container className={classes.grid} >
            <Grid item xs={8}>
                <Typography color="textPrimary" variant="h6" className={classes.title}>
                    {method.Title}
                </Typography>
                <div className={classes.section2}>
                    <Typography color="textPrimary" variant="body2">
                            {method.Description}
                    </Typography>
                </div>
            </Grid>
            <Grid item xs={4} >
                <Grid container className={classes.infoGrid}>
                    <Grid item className={classes.gridItem}>
                        {method.TemperatureInfo != null && <TemperatureInfo temperatureInput={method.TemperatureInfo} />}
                    </Grid>
                    <Grid item className={classes.gridItem}>
                        { method.Duration != null && <TimeInfo timeInfo={method.Duration} /> }
                    </Grid>
                </Grid>
            </Grid>
         </Grid>
         <div className={classes.section3}>
                {_rendeIngredient(classes, method.IngredientQuantities)}
        </div>
    </div>
    );
}

// const Method = (method: IMethod): JSX.Element => {
//     const classes = useStyles();
//     return (
//     <div className={classes.root}>
//         <div className={classes.section1}>
//             <Grid container alignItems="flex-start" >
//                 <Grid item xs>
//                     {/* {_shouldRenderTemp(method.TemperatureInfo) &&  <TemperatureInfo temperatureInput={method.TemperatureInfo} />)} */}
//                     {method.TemperatureInfo != null && <TemperatureInfo temperatureInput={method.TemperatureInfo} />}
//                     {/* {method.TemperatureInfo != null ? <TemperatureInfo temperatureInput={method.TemperatureInfo} /> : <Default/>} */}
//                 </Grid>
//                 <Grid item className={classes.clock}>
//                     <Typography gutterBottom variant="body2">
//                         {method.Duration?.Unit}
//                     </Typography>
//                     <FontAwesomeIcon icon={faClock} className="time-icon" size="xs"/>
//                 </Grid>
//             </Grid>
//         </div>
//         <div className={classes.section2}>
//             {/* <Typography color="textPrimary" variant="body1">
//                     Description:
//             </Typography> */}
//             <Typography color="textPrimary" variant="body2">
//                     {method.Description}
//             </Typography>
//         </div>
//         <div className={classes.section3}>
//             {_rendeIngredient(classes, method.IngredientQuantities)}

//         </div>
//     </div>
//     );
// }

export default Method;
