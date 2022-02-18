import { makeStyles } from "@material-ui/core"
// import Grid from "@material-ui/core/Grid"
// import Typography from "@material-ui/core/Typography"
import React, { useContext } from "react"
import { useFormContext } from "react-hook-form"
import { MinusIcon, PlusIcon } from "../../../../../assets/icons"
import styles from "./Hours.module.scss"
import "../../index.css"
import ThemeContext from "../../../../../context"
import { HourlyIcon } from "../../../../../assets/icons"

const useStyles = makeStyles((theme) => ({
  mainPlusMinusContainer: {
    height: "34px",

    borderBottom: "2px solid #AC8159",
    transition: "200ms",
    "&:hover": { borderBottom: "2px solid white", transition: "200ms" },
  },
}))

const Hours = ({
  hoursState,
  setHourly,
  hoursAddressForm,
  setHoursAddressForm,
  hourlyAndSeatsRedux,
  redBorderOnSubmitForHours,
  setHoursRedux,
  hoursCount,
}) => {
  const classes = useStyles()

  const { register } = useFormContext()

  //   const [hoursAddressForm, setHoursAddressForm] = useState(0)

  const onDecrease = () => {
    if (hoursCount === 0) {
      return
    }
    setHoursAddressForm((hoursAddressForm) => hoursAddressForm - 1)
    setHoursRedux(hoursCount - 1)
  }
  const onIncrease = () => {
    setHoursAddressForm((hoursAddressForm) => hoursAddressForm + 1)
    setHoursRedux(hoursCount + 1)
  }

  //   React.useEffect(() => {
  //     if (hoursState !== 0) {
  //       setHourly(true)
  //       setHoursAddressForm(parseInt(hoursState))
  //     }
  //   }, [hoursState])

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
    <div
      // container
      // direction="row"
      // justify="space-between"
      // alignItems="center"
      // style={{ marginTop: "-4px" }}
      className={styles.hoursCounterWrapper}
    >
      <div className={styles.hoursCounterIconAndTitleContainer}>
        {/* <div container direction="row" alignItems="center"> */}
        <HourlyIcon color={fontColor} />

        {/* <span className={styles.hoursCounterIcon}></span> */}
        <h3
          // style={{ color: "white", fontSize: "14px", marginTop: "4px" }}
          className={styles.hoursCounterTitle}
          style={{ color: fontColor }}
        >
          Hours
        </h3>
        {/* </div> */}
      </div>
      <div
        className={styles.hoursCounterPlusMinusContainer}
        // style={{
        //   borderRadius: `${borderRadiusesForInnerElements}`,
        //   border: redBorderOnSubmitForHours
        //     ? `1px solid red`
        //     : "1px solid transparent",
        // }}
      >
        {/* <div
          // container
          // direction="row"
          // justify="space-around"
          // alignItems="center"
          // className={classes.mainPlusMinusContainer}
          className={styles.hoursCounterPlusMinus}
          // style={{
          //   // background: "#282828",
          //   // height: "35px",
          //   // borderRadius: "5px",
          //   height: "34px",
          //   // paddingTop: "-4px",
          // }}
        > */}
        <div className={styles.hoursCounterMinusContainer}>
          <button
            onClick={onDecrease}
            className={styles.hoursCounterMinus}
            style={{
              background: inputsBackground,
              border: redBorderOnSubmitForHours
                ? `1px solid red`
                : `1px solid ${borderColorForInnerElements}`,
              borderTopLeftRadius: borderRadiusesForInnerElements,
              borderBottomLeftRadius: borderRadiusesForInnerElements,
            }}
            type="button"
            // style={{ marginRight: "5px" }}
          >
            <MinusIcon color={inputsFontColor} />
          </button>
        </div>
        <div
          // item
          // style={{
          //   textAlign: "center",
          //   // borderBottom: "2px solid #AC8159",
          //   // marginTop: "6px",
          //   // paddingBottom: "2px",
          //   // borderBottom: "2px solid #AC8159",
          //   // height: "105%",
          // }}
          className={styles.hoursCounterInputContainer}
        >
          <input
            ref={register}
            name="hours"
            // className="passenger"
            onChange={(e) => {
              setHoursAddressForm(e.target.value)
              setHoursRedux(e.target.value)
            }}
            value={hoursCount}
            size="1"
            // style={{
            //   // pointerEvents: "none",
            //   minWidth: "34px",
            //   maxWidth: "34px",
            //   // marginLeft: "2px",
            //   // marginRight: "2.5px",
            //   // marginBottom: "4px",
            //   backgroundColor: "transparent",
            //   border: "none",
            //   color: "white",
            //   textAlign: "center",
            //   fontFamily: "Roboto",
            //   textTransform: "none",
            //   fontWeight: "400",
            //   fontSize: "14px",
            //   height: "100%",
            // }}
            style={{
              background: inputsBackground,
              borderTop: redBorderOnSubmitForHours
                ? `1px solid red`
                : `1px solid ${borderColorForInnerElements}`,
              borderBottom: redBorderOnSubmitForHours
                ? `1px solid red`
                : `1px solid ${borderColorForInnerElements}`,
              color: inputsFontColor,
            }}
            type="number"
            className={styles.hoursCounterInput}
          />
        </div>
        <div className={styles.hoursCounterPlusContainer}>
          <button
            className={styles.hoursCounterPlus}
            onClick={onIncrease}
            style={{
              background: inputsBackground,
              border: redBorderOnSubmitForHours
                ? `1px solid red`
                : `1px solid ${borderColorForInnerElements}`,
              borderTopRightRadius: borderRadiusesForInnerElements,
              borderBottomRightRadius: borderRadiusesForInnerElements,
            }}
            type="button"
            // style={{ marginLeft: "4px" }}
          >
            <PlusIcon color={inputsFontColor} />
          </button>
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}

export default Hours
