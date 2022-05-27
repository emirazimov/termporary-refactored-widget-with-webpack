import { makeStyles, useMediaQuery } from "@material-ui/core"
// import Grid from "@material-ui/core/Grid"
// import Typography from "@material-ui/core/Typography"
import React, { useContext } from "react"
import { useFormContext } from "react-hook-form"
import { NumberOfPassengersIcon } from "../../../../../assets/icons"
import ThemeContext from "../../../../../context"
import {
  MinusIcon,
  // NumberOfPassengers,
  // NumberOfPassengersIcon,
  PlusIcon,
} from "../../../../../assets/icons"
import "../../index.css"
import styles from "./PassengerQuantity.module.scss"

const useStyles = makeStyles((theme) => ({
  mainPlusMinusContainer: {
    height: "34px",
    borderBottom: "2px solid #AC8159",
    transition: "200ms",
    "&:hover": { borderBottom: "2px solid white", transition: "200ms" },
  },
}))

export default React.memo(function PassengerQuantity({
  passengersqState,
  setPassengers,
  passengers,
  passengersQuantityForBackStep,
  setPassengersQuantityForBackStep,
  redBorderOnSubmitForPassengers,
}) {
  const classes = useStyles()
  const { register } = useFormContext()

  const onDecrease = () => {
    if (passengersQuantityForBackStep === 0) {
      return
    }
    let progress = passengersQuantityForBackStep - 1
    setPassengers((passengers) => passengers - 1)
    setPassengersQuantityForBackStep(progress)
  }
  const onIncrease = (e) => {
    if (passengersQuantityForBackStep === 14) {
      return
    }
    let progress = passengersQuantityForBackStep + 1
    setPassengers((passengers) => passengers + 1)
    setPassengersQuantityForBackStep(progress)

    console.log(passengersQuantityForBackStep)
  }
  // console.log(passengersQuantityForBackStep)
  //   React.useEffect(() => {
  //     setPassengers(parseInt(passengersqState))
  //   }, [passengersqState])
  const isMobile = useMediaQuery("(max-width:340px)")
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
    countersOuterBorderColor,
    countersInnerDividerBorder,
  } = useContext(ThemeContext)

  return (
    <div className={styles.passengerQuantityWrapper}>
      <div className={styles.passengerQuantityIconAndTitleContainer}>
        <NumberOfPassengersIcon color={fontColor} />

        <span
          className={styles.passengerCounterTitle}
          style={{ color: fontColor }}
        >
          Number of passengers
        </span>
      </div>
      <div className={styles.passengerQuantityCounterContainer}>
        <div className={styles.passengerQuantityMinusContainer}>
          <button
            onClick={onDecrease}
            type="button"
            className={styles.passengerQuantityMinusSelf}
            style={{
              background: inputsBackground,
              border: redBorderOnSubmitForPassengers
                ? "1px solid red"
                : `1px solid ${countersOuterBorderColor}`,

              borderRight: redBorderOnSubmitForPassengers
                ? `1px solid red`
                : `1px solid ${countersInnerDividerBorder}`,
              borderTopLeftRadius: borderRadiusesForInnerElements,
              borderBottomLeftRadius: borderRadiusesForInnerElements,
            }}
          >
            <MinusIcon color={fontColor} />
          </button>
        </div>
        <div className={styles.passengerQuantityInputContainer}>
          <input
            ref={register}
            name="passengersQuantity"
            onChange={(e) => {
              setPassengers(e.target.value)
              setPassengersQuantityForBackStep(e.target.value)
            }}
            value={passengersQuantityForBackStep}
            size="1"
            type="number"
            className={styles.passengerQuantityInputSelf}
            style={{
              background: inputsBackground,
              borderTop: redBorderOnSubmitForPassengers
                ? "1px solid red"
                : `1px solid ${countersOuterBorderColor}`,
              borderBottom: redBorderOnSubmitForPassengers
                ? "1px solid red"
                : `1px solid ${countersOuterBorderColor}`,
              color: inputsFontColor,
            }}
          />
        </div>
        <div className={styles.passengerQuantityPlusContainer}>
          <button
            onClick={(event) => {
              onIncrease()
              event.stopPropagation()
            }}
            className={styles.passengerQuantityPlusSelf}
            style={{
              background: inputsBackground,
              border: redBorderOnSubmitForPassengers
                ? "1px solid red"
                : `1px solid ${countersOuterBorderColor}`,

              borderLeft: redBorderOnSubmitForPassengers
                ? `1px solid red`
                : `1px solid ${countersInnerDividerBorder}`,
              borderTopRightRadius: borderRadiusesForInnerElements,
              borderBottomRightRadius: borderRadiusesForInnerElements,
            }}
            type="button"
          >
            <PlusIcon color={fontColor} />
          </button>
        </div>
      </div>
    </div>
  )
})
