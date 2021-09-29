


import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ISubdivision from '../../models/subdivision'
import IDuration from '../../models/duration'
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const useStyles = makeStyles({
    container:{
        // minHeight: '1em'
        margin: '29px 0px 10px 0px',
        padding: '5px'
    },
    subdivision:{
        
    },
    listRoot: {
        display: 'flex',
        justifyContent: 'center',
        margin: '1px',
        listStyleType: 'none'
    },
    typo:{
        fontSize: '12px',
        color: '#eeeeee',
    },
    grid:{
        margin: '10px 0px 20px 0px'
    },
    eyeIcon:{
        color: '#1e272e',
        fontSize: '20px',
    },
    activity:{
        display: 'flex',
        flexDirection: 'row'
    },
    title:{
        fontSize: '20px',
        margin: '10px'
    }

  });

const grey = '#7a7a7a'
const dark = '#0f7b90'//'#1e272e'
interface ISubdivisionCalculated{
    Offline: boolean,
    Duration: IDuration,
    NumberOfSteps: number,
    Minutes: number
    Ratio: number
}

interface ScheduleProp {
    schedule: ISubdivision[],
    duration: IDuration
}

const mapDurationToMinutes = (d: IDuration) =>{
    return (d.Hours * 60) + d.Minutes + Math.floor(d.Seconds / 60)
}
const additionReducer = (accumulator:number, elem:number) => accumulator + elem;

const mapSubdivisionToInfo = (totalMinutes: number, sub : ISubdivision) => {
    const minutes = mapDurationToMinutes(sub.Duration)
    return (
        {
            Offline: sub.Offline,
            Duration: sub.Duration,
            NumberOfSteps: sub.NumberOfSteps,
            Minutes: minutes,
            Ratio: (minutes / totalMinutes)
        }
    )
}

const _min = (n: number) =>{
    const classes = useStyles();
    return(
        <Typography className={classes.typo}>
            {`${n} min`}
        </Typography>
    )
}
const _Subdivision = (subC: ISubdivisionCalculated) =>{
    const classes = useStyles();
    const color = subC.Offline ? grey : dark
    // const width = (subC.Ratio * 100) + '%'
    const width = (subC.Ratio * 500) + 'px'
    console.log("width", width)
    const _label = subC.Minutes + ' min'
    const showMin = subC.Ratio > 0.15
    let label = showMin ? _label : ""
    return (
        <li>
            <Chip label={label} style={{color: '#eeeeee', borderRadius: '9px', backgroundColor: color, width: width, margin: '10px 1px'}}/>
            {/* <Paper title={label} style={{backgroundColor: color, width: width, minHeight: '0.75em', margin: '10px 1px'}} >
                {showMin && _min(subC.Minutes) }
            </Paper > */}
        </li>
    )
}

const _Activity = (label: string, icon: IconDefinition) => {
    const classes = useStyles();

    return(
    <div className={classes.activity}>
        <Typography style={{margin: '0px 5px 0px 0px'}}>
            <FontAwesomeIcon icon={icon} className={classes.eyeIcon} size="xs"/>
        </Typography>
        <Typography>{label}</Typography>
    </div>)
}

const _Info = (duration: IDuration) => {
    const classes = useStyles();
    return(
    <div>
        <Typography variant='h2' style={{fontSize: '1.5em'}}>{`${duration.Hours} h  : ${duration.Minutes} min`}</Typography>
        <Grid container className={classes.grid} >
            <Grid item xs={9}/>
                
            <Grid item xs={1} >
                <Paper style={{backgroundColor: dark, width: '1em', minHeight: '0.7em', margin: '0px 10px 0px 10px'}} />
            </Grid>
            <Grid item xs={2}>
                {_Activity('Active', faEye)}
            </Grid>

            <Grid item xs={9} />
            <Grid item xs={1}>
                <Paper style={{backgroundColor: grey, width: '1em', minHeight: '0.7em', margin: '0px 10px 0px 10px'}} />
            </Grid>
            <Grid item xs={2}>
                {_Activity('Inactive', faEyeSlash)}
            </Grid>
        </Grid>
    </div>)
}
const Schedule = ({schedule, duration}: ScheduleProp ) : JSX.Element =>{
    const classes = useStyles();
    console.log(schedule)

    const totalTimeMinutes = 
        schedule.map(c => mapDurationToMinutes(c.Duration)).reduce(additionReducer)

    const subInfoList = schedule.map(sub => mapSubdivisionToInfo(totalTimeMinutes, sub))
        
    console.log('scoop', subInfoList)
    console.log(totalTimeMinutes)
    return(
        <div className={classes.container} >
            {/* <p>hello</p> */}

            <Typography variant='h2' className={classes.title}>Schedule</Typography> 
            {_Info(duration)}
            <ul className={classes.listRoot}>
                {subInfoList.map(sub => _Subdivision(sub))}
            </ul>
        </div>
    )

}

export default Schedule