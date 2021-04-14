import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {DELETE} from '../../actions/actionTypes';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import JSZip from 'jszip'
import { saveAs } from "file-saver";
import {
  CButton,
} from '@coreui/react'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    control: {
      padding: theme.spacing(2),
    },
    gridList: {
        width: 500,
        height: 400,
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
      },
      titleBar: {
        background:
          'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
          'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
      },
      icon: {
        color: 'white',
      },
  }));


const PhotoGallery = (title) => {
  const photo = useSelector(state => state.photos)
  const dispatch = useDispatch()
  const classes = useStyles();
  var zip = new JSZip();
  const generateZip = () => {
    var img = zip.folder("images");
    let count = 0;
    photo.map((p) => { 
      count++
      return img.file(`image_000${count}.jpeg`, p.replace('data:image/jpeg;base64,', ''), {base64: true});
    })
    img.generateAsync({type:"blob"}).then(function(content) {
      // see FileSaver.js
      saveAs(content, `${title.title.title}.zip`);
  });
  }

  return (
       <>
    <div className="col-sm-6">
    <div className="card">
      <div className="card-header">
      <h5 className="card-title">{photo.length && photo.length > 1 ? `${photo.length} Bild-Beispiele` : !photo.length ? 'Bildbeispiele hinzufügen' : `${photo.length} Bild-Beispiel`}</h5>
      </div>
      <div className="card-body">
      <Grid container className={classes.root} spacing={3}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={1}>
      <GridList cellHeight={200} spacing={2} className={classes.gridList}>
        {photo.map((tile) => (
          <GridListTile key={tile} cols={1} rows={1}>
            <img src={tile} alt='' />
            <GridListTileBar
              titlePosition="top"
              actionIcon={
                <IconButton aria-label={`delete`} className={classes.icon} onClick={() => dispatch({ type: DELETE, payload: tile})}>
                  <DeleteOutlineIcon />
                </IconButton>
              }
              actionPosition="left"
              className={classes.titleBar}
            />
          </GridListTile>
        ))}
      </GridList>
      </Grid>
      </Grid>
    </Grid>
    <CButton onClick={() => generateZip()} className="btn btn-primary">Download</CButton>
      </div> 
      </div>
  
    </div>
       </> 
  )
}

export default PhotoGallery
