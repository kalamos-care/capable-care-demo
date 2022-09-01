import BasicModal from "./BasicModal";
import ProfileIcon from "./icons/ProfileIcon";
import { Alert, DialogActions, Typography } from "@mui/material";
import { useState } from "react";
import api from "../capableApi/index";
import { useCurrentPatient } from "../fetchDataHooks";
import * as Sentry from "@sentry/react";

export default function AvatarUploadModal(props) {
  const { currentPatient } = useCurrentPatient();
  const [selectedImage, updateSelectedImage] = useState(null);
  const onFileChange = event => {
  updateSelectedImage(event.target.files[0]);
  }
  const [failedRequest, setFailedRequest] = useState(false);
  const patientId = currentPatient.id;
  const updateAvatar = async () => {
    const formData = new FormData();
    formData.append("file", selectedImage)
    try {
      await api.client.Patient.avatarUpload(patientId, {
        patient: {
          avatar: formData
        }
      }); 
      updateFailedRequest(false);
    } catch (e) {
      Sentry.captureException(e);
      console.error("Avatar update failed", e);
      updateFailedRequest(true);
    }
  }
    return (
      <BasicModal open={props.open} handleClose={props.close}>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <ProfileIcon />
          <Typography
            variant="modal"
            component="h1"
            sx={{ fontSize: "1.2rem", color: "theme.black" }}
          >
            Upload your profile photo
          </Typography>
        </DialogActions>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginBottom: 2,
          }}
        >
          <Typography variant="modal" component="h2">
            Select a PNG or JPG photo
          </Typography>
          <input type="file" onChange={onFileChange} /> 
                <button onClick={updateAvatar}> 
                  Upload! 
                </button> 
          {failedRequest && (
            <Alert severity="error">
              Woops something went wrong. Please try again!
            </Alert>
          )}  
        </DialogActions>
      </BasicModal>
    );
  }
