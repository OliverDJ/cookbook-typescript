





import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
    title:{
        fontSize: '0.7em' 
    },
    listRoot: {
        display: 'flex',
        // marginTop: '24px',
        justifyContent: 'center',
        // marginTop: '0px'
    },
    container:{

    },
    chiliImage: {
        maxWidth:'3em',
        padding: '5px'
      },
  });

const _Chili = (i: number, spininess: number) =>{
    const classes = useStyles();
    const c = i < spininess ? '/static/images/chilies/filled.png' : '/static/images/chilies/outline.png'
    return (
        <li >
            <Typography>
                <img src={c} className={classes.chiliImage}/>
            </Typography>
        </li>
    )
}

interface SpicinessProp {
    level: number,
    threshold: number
}

const Spiciness = ({level, threshold}: SpicinessProp ) : JSX.Element =>{
    const classes = useStyles();
    const data = ([...Array(threshold).fill(0)])
    return(
        <div className={classes.container} >
            {/* <Typography>Spiciness</Typography> */}
            {/* <Typography className={classes.title} color="textPrimary" variant="body1">Spiciness</Typography> */}
            <List className={classes.listRoot}>
                { data.map((_, i) => _Chili(i, level)) }
            </List>
        </div>
    )

}

export default Spiciness