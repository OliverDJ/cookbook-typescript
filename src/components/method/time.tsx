




import ITimeInfo from "../../models/timeinfo"

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'

import Paper from '@material-ui/core/Paper';
import { unstable_batchedUpdates } from "react-dom";
  
interface TProps {
    timeInfo: ITimeInfo
}

const useStyles = makeStyles((theme) => ({
    root: {
        // backgroundColor: 'red',
        padding: '3px 10px'
    },
    title:{
        fontSize:'0.60em',
        margin: theme.spacing(1,0),
        textAlign: 'center'
    },
    t:{
        fontSize: '18px',
        // margin: theme.spacing(0,0,1,0)
    },
    grid:{
        justifyContent: 'center',
    },
    clockIcon:{
        color: '#999999',
        margin: '2px 5px 0px 5px',
        // padding: '5px',
        fontSize: '18px',
    },
    gridItem:{
        // color: '#999999',
        // margin: '10px 10px 10px 10px',
        // backgroundColor: 'green',
        padding: '5px',
        minWidth: '0.9rem'
    }
  }));

const padTimeValue = (n: number) =>{
    if(n < 10 ){
        return " " + n
    }else if(n >= 10 && n < 100 ){
        return "" + n
    }
    else{
        console.log('why here?')
    }
}

let abb = (u: string) => {
    if(u == 'Hour'){return 'h  '}
    else if(u == 'Minute'){return "min"}
}

const TimeInfo = ({timeInfo}: TProps): JSX.Element => {
    const classes = useStyles();

    let timeValue = padTimeValue(timeInfo.Fields[0])
    let unit = abb(timeInfo.Case)
    let t = timeValue + " " + unit
    return (
        // <p> hello </p>
        <div className={classes.root}>
            <Typography className={classes.title} color="textPrimary" variant="body1">Time</Typography>
            <Grid container className={classes.grid} >
                <Grid item className={classes.gridItem} >
                    <Typography className={classes.t} color="textSecondary" variant="body2">
                        {t} 
                    </Typography>
                    
                </Grid>
                <Grid item className={classes.gridItem} >
                    <Typography>
                        <FontAwesomeIcon icon={faClock} className={classes.clockIcon} size="xs"/>
                    </Typography>
                </Grid>
            </Grid>
        </div >
    )

}


export default TimeInfo