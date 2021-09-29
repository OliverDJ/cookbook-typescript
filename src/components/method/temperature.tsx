


import ITemperatureInfo from "../../models/temperatureinfo"
import IEnum from "../../models/enum"

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRecordVinyl, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { faWindowMaximize } from '@fortawesome/free-solid-svg-icons'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '3px 10px'
    },
    title:{
        fontSize:'0.60em',
        margin: theme.spacing(1,0),
        textAlign: 'center'
    },
    grid:{

        justifyContent: 'center',
    },
    sourceIcon:{
        color: '#999999',
        margin: '2px 5px 0px 5px',
        fontSize: '20px',
    },
    gridItem:{
        color: '#999999',
        padding: '5px',
    },
    t:{
        fontSize: '18px',
    },
  }));


  
interface TProps {
    temperatureInput: ITemperatureInfo
}
interface iconInfo {
    icon: IconDefinition,
    label: string
}

const getSourceIcon = (s: IEnum) : iconInfo=> {
    const c = s.Case
    if(c == "Oven") {
        return {icon: faWindowMaximize, label: "oven"}//[faWindowMaximize, "oven"]
    }else if (c == "StoveTop"){
        return  {icon: faRecordVinyl, label: "stove-top"}
    }else if (c == "Room"){
        return {icon: faHome, label: "room-temp"}
    }else if (c == "Grill"){
        return {icon: faFire, label: "bbq"}
    }
    else{
        return {icon: faQuestionCircle, label: "unknown"}
    }
}



const getUnit = (s: IEnum) =>{
    console.log(s)
    const c = s.Case
    if(c == 'Celsius'){
        return "°C"
    }else if (c == 'Farenheit'){
        return "°F"
    }
    else if (c == 'Kelvin'){
        return "°K"
    }
    else {
        return ""
    }
}
const TemperatureInfo = ({temperatureInput}: TProps): JSX.Element => {
    const classes = useStyles();
    var {icon, label} = getSourceIcon(temperatureInput.Source)
    return (
        <div className={classes.root}>
        <Typography className={classes.title} color="textPrimary" variant="body1">Temperature</Typography>
        <Grid container className={classes.grid} >
            <Grid item className={classes.gridItem} >
                <Typography className={classes.t} color="textSecondary" variant="body2">{temperatureInput.Value} {getUnit(temperatureInput.Unit)}</Typography>
            </Grid>
            <Grid item className={classes.gridItem} >
                <Typography>
                    <FontAwesomeIcon title={label} icon={icon} className={classes.sourceIcon} size="xs"/>
                </Typography>
            </Grid>
        </Grid>
        </div>
    )

}


export default TemperatureInfo