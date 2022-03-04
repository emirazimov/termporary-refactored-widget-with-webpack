import React, { useContext, useEffect } from "react"
import { connect } from "react-redux"
import {
  getCompanyProfile,
  setGotAddressError,
} from "../../Redux/company-profile-reducer"
// import Grid from "@material-ui/core/Grid"
// import Typography from "@material-ui/core/Typography"
// import { makeStyles } from '@material-ui/core/styles'
// import { CloseWidgetIcon } from "../../assets/icons"
// import Divider from "@material-ui/core/Divider"
// import { isMobile } from "react-device-detect"
// import { Preloader } from "../Helpers/Preloader/Preloader"
// import AppBar from "@material-ui/core/AppBar"
import { useMediaQuery } from "@material-ui/core"
import {
  setResetWidgetInputs,
  setResetWidgetInputsActionCreator,
} from "../../Redux/reset-widget-inputs-reducer"
import {
  setIsAirportPickupIncluded,
  setShowCarsWithSafetySeat,
} from "../../Redux/form-reducer"
import { setGateMeetingRedux } from "../../Redux/gate-meeting-reducer"
import styles from "./CompanyProfile.module.scss"
import ThemeContext from "../../context"
import { CloseWidgetIcon } from "../../assets/icons"
import { setHourlyRedux } from "../../Redux/hourly-reducer"

const CompanyProfile = ({
  initializing,
  profile,
  getCompanyProfile,
  handleCloseDialog,
  setExpanded,
  setActiveStep,
  setBackgroundScrollStop,
  resetInputs,
  setResetWidgetInputs,
  setGotAddressError,
  setIsAirportPickupIncluded,
  setGateMeetingRedux,
  setShowCarsWithSafetySeat,
  setHourlyRedux,
}) => {
  // const classes = useStyles()

  const jwtToken = localStorage.getItem("Authorization")
  const smallDevices = useMediaQuery("(max-width:768px)")

  const resetWidgetInputs = (dispatch) => {
    dispatch(setResetWidgetInputsActionCreator(true))
  }
  useEffect(() => {
    if (jwtToken) {
      getCompanyProfile()
    }
  }, [getCompanyProfile, jwtToken])
  // useEffect(() => {
  //   setResetWidgetInputs()
  // }, [])
  const {
    ThemeProviderAppBackgroundColor,
    fontColor,
    borderRadiusesForInnerElements,
    borderRadiusesForWholeApp,
    borderColorForInnerElements,
    borderColorForOuterApp,
    carsTypeColor,
    hoverColor,
    iconsColor,
    backAndNextButtonsColor,
    innerTextOnHover,
    inputsFontColor,
    inputsBackground,
    bookNowIconFontAndCircleBorderColor,
    bookNowIconBackgroundColor,
  } = useContext(ThemeContext)

  return (
    <>
      {/* {isMobile ? <> <Grid container direction="row"
                justify="space-between"
                alignItems="center"
                className={classes.companyContainer}>
                <Grid item>
                    <img src={profile.companyLogoPath} className={classes.companyLogo} alt='companyLogo' />
                </Grid>
                <Grid item xs={5}>
                    <Typography className={classes.companyName}>{profile.companyName}</Typography>
                </Grid>
                <Grid item>
                    <span style={{ cursor: 'pointer' }} onClick={() => { handleCloseDialog(false); setActiveStep(0) }}>
                        <CloseWidgetIcon />
                    </span>
                </Grid>
            </Grid>
                <Divider orientation='horizontal' variant='fullWidth' />
            </> : */}
      {initializing ? (
        <>
          <div
            // container
            // direction="row"
            // justify="space-between"
            // alignItems="center"
            // wrap="nowrap"
            // className={classes.companyContainer}
            className={styles.companyProfileWrapper}
            style={{
              background: ThemeProviderAppBackgroundColor,
              borderTopRightRadius: borderRadiusesForWholeApp,
              borderTopLeftRadius: borderRadiusesForWholeApp,
            }}
          >
            <div className={styles.companyProfileImageContainer}>
              <img
                src={profile.companyLogoPath}
                // className={classes.companyLogo}
                alt="companyLogo"
                className={styles.companyProfileImageSelf}
              />
            </div>
            <div
              // item
              // xs={7}
              // md={7}
              // lg={8}
              // xl={8}
              className={styles.companyProfileNameContainer}
            >
              <span
                className={styles.companyProfileNameSelf}
                style={{ color: fontColor }}
              >
                {profile.companyName}
              </span>
            </div>
            {/* {smallDevices && ( */}
            <div className={styles.companyProfileCloseIconContainer}>
              <div
                // style={{ cursor: "pointer", marginRight: "6px" }}
                className={styles.companyProfileCloseIconSelf}
                onClick={() => {
                  setExpanded()
                  setActiveStep(0)
                  setBackgroundScrollStop(false)
                  setResetWidgetInputs(true)
                  setGotAddressError(false)
                  setIsAirportPickupIncluded(false)
                  setGateMeetingRedux(false)

                  setShowCarsWithSafetySeat(false)
                  setHourlyRedux(false)
                }}
              >
                {/* <span
                  className={styles.companyProfileCloseIconSelfCustomCreation}
                ></span> */}
                <CloseWidgetIcon color={fontColor} />
                {/* <CloseWidgetIcon /> */}
              </div>
            </div>
            {/* )} */}
          </div>
        </>
      ) : null}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    profile: state.companyProfile.profile,
    resetInputs: state.resetWidgetInputs.resetInputs,
  }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, {
  getCompanyProfile,
  setResetWidgetInputs,
  setGotAddressError,
  setIsAirportPickupIncluded,
  setGateMeetingRedux,
  setShowCarsWithSafetySeat,
  setHourlyRedux,
})(CompanyProfile)
