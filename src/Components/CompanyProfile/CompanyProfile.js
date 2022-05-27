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
    headerFontColor,
  } = useContext(ThemeContext)

  return (
    <>
      {initializing ? (
        <>
          <div
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
                alt="companyLogo"
                className={styles.companyProfileImageSelf}
              />
            </div>
            <div className={styles.companyProfileNameContainer}>
              <span
                className={styles.companyProfileNameSelf}
                style={{ color: headerFontColor }}
              >
                {profile.companyName}
              </span>
            </div>
            <div className={styles.companyProfileCloseIconContainer}>
              <div
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
                <CloseWidgetIcon color={fontColor} />
              </div>
            </div>
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
