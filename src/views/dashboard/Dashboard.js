import React, {useState, useEffect} from 'react'
import {TAKEPHOTO, UPDATE} from '../../actions/actionTypes';
import { useDispatch, useSelector } from 'react-redux'
import Webcam from "react-webcam";
import { CIcon } from '@coreui/icons-react';
import {
  CFormGroup,
  CInput,
  CButton,
  CCol,
  CInputGroup,
  CInputGroupAppend
} from '@coreui/react'

const videoConstraints = {
  width: 1080,
  height: 1040,
  facingMode: "user"
};

const PhotoGallery = React.lazy(() => import('../gallery/PhotoGallery'));
const Settings = React.lazy(() => import('../settings/Settings'));

const Dashboard = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState({title: 'Dein Label', editMode: false})
  const settings = useSelector((state) => state.settings);
  const [seconds, setSeconds] = useState({counter: Number(settings.duration), delay: Number(settings.delay)});
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(
    () => {

      if(!settings.showSettings){
        if(settings.photoMod){
          const imageSrc = webcamRef.current.getScreenshot({width: 224, height: 224});
            dispatch({ type: TAKEPHOTO, payload: imageSrc })
        }else{
          if(seconds?.delay){
            seconds.delay--
            if(seconds.delay <=0) {
              seconds.counter--
              setSeconds({counter: Number(seconds.counter)});
                if(seconds.counter <=0){
                  const imageSrc = webcamRef.current.getScreenshot({width: 224, height: 224});
                  dispatch({ type: TAKEPHOTO, payload: imageSrc })
                  setSeconds({counter: Number(settings.duration), delay: Number(settings.delay)});
                  }
            }
          }else{
            seconds.counter--
              setSeconds({counter: Number(seconds.counter)});
                if(seconds.counter <=0){
                  const imageSrc = webcamRef.current.getScreenshot({width: 224, height: 224});
                  dispatch({ type: TAKEPHOTO, payload: imageSrc })
                  setSeconds({counter: Number(settings.duration), delay: Number(settings.delay)});
                  }
          }
          
      }
  }
    },
    [webcamRef, dispatch, settings, seconds]
  );


    const changeEditMode = () => {
      if(title.editMode){
        setTitle({ editMode: false})
      }else {
        setTitle({ editMode: true})
      }
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      setTitle({ title: title.title, editMode: false})
     
    };
    const onSettings = async (e) => {
      e.preventDefault();
      settings.showSettings = true;
      dispatch({type: UPDATE, payload: settings})
     
    };


    useEffect(() => {
      if(!settings.photoMod){
        var handle = setInterval(capture, 1000);
      }

    return () => {
       clearInterval(handle)
      }
    }, [capture, settings]);

  return (
    <>

    <div className="row">
    {settings?.showSettings ? <Settings/> :
      <div className="col-sm-6">
      <div className="card">
      <div className="card-header">
          {title.editMode ?
          <form onSubmit={handleSubmit}>
            <CFormGroup className='col-sm-5 row' >
             <CCol>
             <CInputGroup>
                <CInput id="name" placeholder="Enter your Label" onChange={(e) => setTitle({...title, title: e.target.value })}/>
                <CInputGroupAppend >
                <CButton type="submit" className="btn btn-outline-primary"><CIcon name="cil-check" size="sm" /> </CButton>
                </CInputGroupAppend>
                </CInputGroup>
              </CCol>
            </CFormGroup>
          </form> : <div className="container">
                      <div className="row">
                        <h5 className="card-title">{title.title}</h5>
                        {!title.editMode ?
                              <CButton onClick={() => changeEditMode()} className="btn btn-outline-primary ml-4" ><CIcon name="cil-pencil" size="sm" /> </CButton>  : null
                        }
                      </div>
                    </div>
          }
       
      </div>

          <div className="card-body">
          <h5 className="card-title">Webcam</h5>
        
            <Webcam
            audio={false}
            height={400}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="col-sm-12"
            videoConstraints={videoConstraints}
          />
          <CButton onClick={settings.photoMod ? capture : null} className="btn btn-primary">{settings.photoMod ? 'Aufnehmen' : `${seconds?.counter} sek. zum Aufnehmen`}</CButton>
          <CButton onClick={onSettings} className="btn btn-primary float-right"><CIcon name="cil-settings"  /></CButton>
        
          </div>
      </div>
    </div>
  }
    <PhotoGallery title={title}/>
    </div>
      
    </>
  )
}

export default Dashboard
