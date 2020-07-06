import { makeStyles } from '@material-ui/core/styles';


const drawerWidth = 400;

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      height : "10vh"
    }),
    
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  form : {
    display : "flex",
    alignItems : "center"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: 0,
    width : "100%",
    height : "93vh",
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  drawerBody : {
    height : "80%",
    display : "flex",
    flexDirection : "column",
    justifyContent : "center",
    alignItems : "center",
    "& > *" : {
      marginBottom : "1.5rem"
    }
  },
  btns : {
    marginLeft : "auto",
    "& > *" : {
      marginLeft : "1rem"
    }
  },
  "@media (max-width : 720px)" : {
    text : {
      fontSize : "1rem"
    },
    btns : {
      "&  *" :{
        fontSize : "0.6rem"
      }
    }
  }
}));
