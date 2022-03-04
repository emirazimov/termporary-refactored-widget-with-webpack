// import { CircularProgress } from "@material-ui/core"
import React, { useContext } from "react"
// import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles"
import { ErrorIcon } from "../../../assets/icons"
// import { Grid, Typography } from "@material-ui/core"
// import Button from "@material-ui/core/Button"
import { connect } from "react-redux"
import { setError } from "../../../Redux/car-reducer"
import { setGotAddressError } from "../../../Redux/company-profile-reducer"
import styles from "./IncorrectAddressError.module.scss"
import ThemeContext from "../../../context"

// const theme = createMuiTheme({
//   palette: {
//     secondary: {
//       main: "#4F4F4F",
//     },
//   },
// })

const IncorrectAddressError = ({
  error,
  setActiveStep,
  setError,
  setGotAddressError,
}) => {
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
      // style={{
      //   margin: "0 auto",
      //   width: "100%",
      //   height: "90%",
      //   display: "flex",
      //   flexDirection: "row ",
      //   justifyContent: "center",
      //   alignItems: "center",
      //   backgroundColor: "black",
      //   // paddingTop: "40%",
      //   // paddingRight: "20px",
      //   // paddingLeft: "20px",
      // }}
      className={styles.incorrectAddressErrorWrapper}
    >
      {/* <MuiThemeProvider theme={theme}> */}
      {/* <CircularProgress color="secondary" /> */}
      <div
        // container
        // direction="column"
        // alignItems="center"
        // style={{ height: "50%" }}
        className={styles.incorrectAddressErrorTextContainer}
      >
        <ErrorIcon />
        <p
          // style={{ fontWeight: "700", fontSize: "19px", marginTop: "15px" }}

          className={styles.incorrectAddressErrorTextSelf1}
          style={{ color: fontColor }}
        >
          Oops!
        </p>
        <p
          // style={{ textAlign: "center", marginTop: "15px", color: "#BCBCBC" }}
          className={styles.incorrectAddressErrorTextSelf2}
          style={{ color: fontColor }}
        >
          {error}
        </p>
      </div>
      <div className={styles.incorrectAddressErrorButtonContainer}>
        <button
          // color="primary"
          // variant="contained"
          onClick={() => {
            setActiveStep(0)
            setError("")
            setGotAddressError(true)
          }}
          className={styles.incorrectAddressErrorButtonSelf}
          style={{
            background: backAndNextButtonsColor,
            color: backAndNextButtonsFontColor,
          }}
          // style={{ marginTop: "17px", background: "#c9c9c9" }}
        >
          Back
        </button>
      </div>

      {/* </MuiThemeProvider> */}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    error: state.cars.error,
  }
}

export default connect(mapStateToProps, { setGotAddressError, setError })(
  IncorrectAddressError
)
// export default Error

//#region styled-components

// const Container = styled.div`
//     margin: 0 auto;
//     width: 100%;
//     /* @media (max-width: 500px) {
//         width: 94%;
//     } */
// `;
