import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import { useHistory } from 'react-router'


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    navLinks: {
        display: 'inline-flex',
        listStyleType: 'none' 
    }
  }));


const NavBar = () => {
    const history = useHistory();
    const classes = useStyles();

    const navLinkOnClick = (path: string) =>{
        history.push(path)
    } 
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <ul className={classes.navLinks}>
                <li><Button onClick={() => navLinkOnClick("/")} color="inherit">Home</Button></li>
                <li><Button onClick={() => navLinkOnClick("/categories")}  color="inherit">Categories</Button></li>
            </ul>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

export default NavBar