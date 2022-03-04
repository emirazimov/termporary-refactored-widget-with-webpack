import React, { useContext } from "react"
// import Grid from "@material-ui/core/Grid"
// import Typography from "@material-ui/core/Typography"
// import Button from "@material-ui/core/Button"
import { connect } from "react-redux"
import styles from "./ReservationFailed.module.scss"
import { ErrorIcon } from "../../../assets/icons"
import ThemeContext from "../../../context"

const ReservationFailed = ({ setActiveStep, failMessage }) => {
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
    innerTextOnHover,
    inputsFontColor,
    inputsBackground,
    bookNowIconFontAndCircleBorderColor,
    bookNowIconBackgroundColor,
    backAndNextButtonsColor,
    backAndNextButtonsFontColor,
  } = useContext(ThemeContext)

  return (
    <div
      // container
      // direction='column'
      // justify='center'
      // alignItems='center'
      // style={{ height: '80vh', backgroundColor: 'black' }}
      className={styles.reservationFailedWrapper}
    >
      <div className={styles.reservationFailedTextContainer}>
        <ErrorIcon />
        <p
          // style={{
          //   textAlign: "center",
          //   marginLeft: "20px",
          //   marginRight: "20px",
          //   marginBottom: "30px",
          //   color: "white",
          // }}
          className={styles.reservationFailedTextSelf}
          style={{ color: fontColor }}
        >
          {failMessage}
        </p>
      </div>
      <div className={styles.reservationFailedButtonContainer}>
        <button
          // color="primary"
          // variant="contained"
          onClick={() => setActiveStep(3)}
          className={styles.reservationFailedButtonSelf}
          style={{
            background: backAndNextButtonsColor,
            color: backAndNextButtonsFontColor,
          }}
        >
          Back
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    failMessage: state.companyProfile.failMessage,
  }
}

export default connect(mapStateToProps)(ReservationFailed)
