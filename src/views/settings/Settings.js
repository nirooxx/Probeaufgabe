import React, {useState} from 'react'
import {UPDATE, RESET} from '../../actions/actionTypes';
import {useDispatch, useSelector } from 'react-redux'
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CForm,
    CFormGroup,
    CInput,
    CLabel,
    CSwitch
  } from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Settings = () => {
    const config = useSelector((state) => state.settings);
    const [settings, setSettings] = useState({delay: config.delay, duration: config.duration, photoMod: config.photoMod , showSettings: false})
    const dispatch = useDispatch()
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSettings({delay: settings.delay, duration: settings.duration, photoMod: settings.photoMod, showSettings: false})
        dispatch({type: UPDATE, payload: settings})
      };

    const handleReset = async (e) => {
      e.preventDefault();
      setSettings({delay: settings.delay, duration: settings.duration, photoMod: settings.photoMod, showSettings: false})
      dispatch({type: RESET, payload: settings})

    };

    const handleChange = async (checked) => {
        settings.photoMod === true ?  setSettings({...settings, photoMod: false}) :  
            setSettings({...settings, photoMod: checked.target.value === 'on' ? true :false})
    }
  return (
       <>
        <CForm className="form-horizontal" onSubmit={handleSubmit} onReset={handleReset}>
        <CCard className="col-sm-12" >
            <CCardHeader>
              Einstellungen
            </CCardHeader>
            <CCardBody>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Verzögerung</CLabel>
                  </CCol>
                  <CCol xs="12" md="3">
                    <CInput id="text-input" name="text-input" value={settings.delay} placeholder="Sec" onChange={(e) => setSettings({...settings, delay: e.target.value })}/>
                  </CCol>
                  <CLabel htmlFor="text-input">Sekunden</CLabel>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Dauer</CLabel>
                  </CCol>
                  <CCol xs="12" md="3">
                    <CInput id="text-input" name="text-input" placeholder="Sec" value={settings.duration} onChange={(e) => setSettings({...settings, duration: e.target.value })}/>
                  </CCol>
                  <CLabel htmlFor="text-input">Sekunden</CLabel>
                </CFormGroup>
                <CFormGroup row>
                  <CCol tag="label" sm="6" className="col-form-label">
                    Manuell aufnehmen
                  </CCol>
                  <CCol sm="6">
                    <CSwitch
                      className="mr-1"
                      color="primary"
                      onChange={handleChange}
                     checked = {settings.photoMod}
                    />
                  </CCol>
                </CFormGroup>
              
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Speichern</CButton> <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Abbrechen</CButton>
            </CCardFooter>
          </CCard>
          </CForm>
       </> 
  )
}

export default Settings
