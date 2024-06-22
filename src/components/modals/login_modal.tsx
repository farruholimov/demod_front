import * as React from 'react';
import { Box, Button, Typography, Modal, keyframes, SxProps } from '@mui/material';
import Image from 'next/image'
import { Grid } from '@mui/material';
import { SignUpContext, LoginContext, VerificationContext, EditProfileContext, ConfirmContext, ProfileImageContext, AddProjectContext, EditProjectContext, ProjectsContext } from './context'
import { useDispatch, useSelector } from '../../store';
import { setLoginState, setSignupState, setVerifyState, setOpenModal, setProfileEditState, setConfirmState, setProfileImageState, setProfileImagePreview, setAddingProjectState, setEditingProjectState } from '../../data/modal_checker';
import AlertWrapper from '../alert';
import LoadingBar from 'react-top-loading-bar';
import EditProfile from './edit_profile';

export default function BasicModal(props: { styles?: SxProps }) {
  const [userEmail, setUserEmail] = React.useState('');
  const [progress, setProgress] = React.useState(0);

  //open certain modal by its status
  const isProfileImageOpen = useSelector((state: any) => state?.modal_checker?.isProfileImage);
  const isConfirmOpen = useSelector((state: any) => state?.modal_checker?.isConfirm);
  const isLoginOpen = useSelector((state: any) => state?.modal_checker?.isLogin);
  const isSignupOpen = useSelector((state: any) => state?.modal_checker?.isSignup);
  const isVerifyOpen = useSelector((state: any) => state?.modal_checker?.isVerify);
  const isProfileEditOpen = useSelector((state: any) => state?.modal_checker?.isProfileEdit);
  const isProjectsListOpen = useSelector((state: any) => state?.modal_checker?.isProjectsList);
  const isAddingProjectOpen = useSelector((state: any) => state?.modal_checker?.isAddingProject);
  const isEditingProjectOpen = useSelector((state: any) => state?.modal_checker?.isEditingProject);
  const isModalOpen = useSelector((state: any) => state?.modal_checker?.isModalOpen);

  const style: SxProps = {
    minWidth: '440px',
    maxWidth: isProfileEditOpen ? '676px' : '440px',
    overflow: "hidden",
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    innerHeight: "226px",
    bgcolor: '#ffff',
    border: '1px solid #fff',
    boxShadow: 24,
    p: "24px",
    ...props?.styles
  };

  //declare dispatcher
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setSignupState(false))
    dispatch(setLoginState(false))
    dispatch(setVerifyState(false))
    dispatch(setConfirmState(false))
    dispatch(setProfileEditState(false))
    dispatch(setAddingProjectState(false))
    dispatch(setEditingProjectState(false))
    dispatch(setProfileImageState(false))
    dispatch(setProfileImagePreview(null))
    dispatch(setOpenModal(false))
  };
  const modalSlider = keyframes`
    from{
      transform:translateX(100%)
    }
    to{
      transform:translateX(0)
    }
  `

  const myModalStyle: React.CSSProperties = {
    animation: `${modalSlider}  0.7s linear forwards`
  }

  return (
    <div>
      <LoadingBar
        color={"#ff0000"}
        progress={progress}
      />
      {/* <AlertWrapper /> */}
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='login__modals--wrap' sx={style}>
          {/* <Box className='login__modal--close' sx={{ width: "100%" }}>
            <Button onClick={handleClose} sx={{ width: "100%", marginBottom: "50px", display: "flex", justifyContent: "flex-end" }}>
              <Image width={16} height={16} src="/img/icon/x-icon.svg" alt="close-icon" />
            </Button>
          </Box> */}

          {
            isProfileImageOpen ?
              <ProfileImageContext /> :
              isConfirmOpen ?
                <ConfirmContext /> :
                isSignupOpen ?
                  <SignUpContext
                    setUserEmail={(email: any) => { setUserEmail(email) }}
                  /> :
                  isLoginOpen ?
                    <LoginContext
                      setUserEmail={(email: any) => { setUserEmail(email) }}
                    />
                    :
                    isVerifyOpen ?
                      <VerificationContext
                        userEmail={userEmail}
                        setProgress={(val: any) => { setProgress(val) }}
                      />
                      :
                      isProfileEditOpen ? <EditProfileContext />
                        :
                        isAddingProjectOpen ? <AddProjectContext />
                          :
                          isEditingProjectOpen ? <EditProjectContext />
                            :
                            isProjectsListOpen ? <ProjectsContext />
                              : null
          }
        </Box>
      </Modal>
    </div>
  );
}
