import { makeStyles, useMediaQuery } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
// import Typography from "@material-ui/core/Typography"
import React, { useContext } from "react"
import { useFormContext } from "react-hook-form"
import ThemeContext from "../../../../../context"
import {
  MinusIcon,
  // NumberOfPassengers,
  // NumberOfPassengersIcon,
  PlusIcon,
} from "../../../../../assets/icons"
import "../../index.css"
import styles from "./SafetySeat.module.scss"

const useStyles = makeStyles((theme) => ({
  mainPlusMinusContainer: {
    height: "34px",
    borderBottom: "2px solid #AC8159",
    transition: "200ms",
    "&:hover": { borderBottom: "2px solid white", transition: "200ms" },
  },
}))

export default React.memo(function SafetySeat({
  setBoosterSeat,
  setChildSafetySeat,
  boosterSeat,
  childSafetySeat,
  isBoosterSeatExistOnBackend,
  isSafetySeatExistOnBackend,
  showCarsWithSafetySeat,
  setSafetySeatCount,
  setBoosterSeatCount,
  safetySeatCountRedux,
  boosterSeatCountRedux,
}) {
  const classes = useStyles()
  const { register } = useFormContext()

  const onDecreaseBoosterSeat = () => {
    if (boosterSeatCountRedux === 0) {
      return
    }
    setBoosterSeat((boosterSeat) => boosterSeat - 1)
    setBoosterSeatCount(boosterSeatCountRedux - 1)
  }
  const onIncreaseBoosterSeat = () => {
    if (boosterSeatCountRedux === 14) {
      return
    }
    setBoosterSeat((boosterSeat) => boosterSeat + 1)
    setBoosterSeatCount(boosterSeatCountRedux + 1)
    console.log(boosterSeatCountRedux)
  }

  const onDecreaseChildSafetySeat = () => {
    if (safetySeatCountRedux === 0) {
      return
    }
    setChildSafetySeat((childSafetySeat) => childSafetySeat - 1)
    setSafetySeatCount(safetySeatCountRedux - 1)
  }
  const onIncreaseChildSafetySeat = () => {
    if (safetySeatCountRedux === 14) {
      return
    }
    setChildSafetySeat((childSafetySeat) => childSafetySeat + 1)
    setSafetySeatCount(safetySeatCountRedux + 1)
  }

  //   React.useEffect(() => {
  //     setPassengers(parseInt(passengersqState))
  //   }, [passengersqState])
  const isMobile = useMediaQuery("(max-width:340px)")
  const shouldSafetySeatBeColumnDirection = useMediaQuery("(max-width:420px)")

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
    <div style={{ paddingLeft: "9px" }}>
      {isBoosterSeatExistOnBackend && (
        <div className={styles.boosterSeatCounterWrapper}>
          <div className={styles.boosterSeatCounterIconAndTitleContainer}>
            <span
              className={styles.boosterSeatCounterTitle}
              style={{ color: fontColor }}
            >
              Youth Booster Seat
            </span>
          </div>
          <div className={styles.boosterSeatCounterContainer}>
            <div className={styles.boosterSeatCounterMinusContainer}>
              <button
                onClick={onDecreaseBoosterSeat}
                className={styles.boosterSeatCounterMinusSelf}
                style={{
                  background: inputsBackground,
                  border: `1px solid ${borderColorForInnerElements}`,
                  borderTopLeftRadius: borderRadiusesForInnerElements,
                  borderBottomLeftRadius: borderRadiusesForInnerElements,
                }}
                type="button"
              >
                <MinusIcon color={fontColor} />
              </button>
            </div>
            <div className={styles.boosterSeatCounterInputContainer}>
              <input
                ref={register}
                name="Youth Booster Seat"
                onChange={(e) => {
                  setBoosterSeat(e.target.value)
                  setBoosterSeatCount(e.target.value)
                }}
                value={boosterSeatCountRedux}
                size="1"
                type="number"
                className={styles.boosterSeatCounterInputSelf}
                style={{
                  background: inputsBackground,
                  borderTop: `1px solid ${borderColorForInnerElements}`,
                  borderBottom: `1px solid ${borderColorForInnerElements}`,
                  color: inputsFontColor,
                }}
              />
            </div>
            <div className={styles.boosterSeatCounterPlusContainer}>
              <button
                onClick={onIncreaseBoosterSeat}
                className={styles.boosterSeatCounterPlusSelf}
                style={{
                  background: inputsBackground,
                  border: `1px solid ${borderColorForInnerElements}`,
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
      )}
      {isSafetySeatExistOnBackend && (
        <div className={styles.safetySeatCounterWrapper}>
          <div className={styles.safetySeatCounterIconAndTitleContainer}>
            <span
              className={styles.safetySeatCounterTitle}
              style={{ color: fontColor }}
            >
              {"Infant & Child Safety Seat"}
            </span>
          </div>
          <div className={styles.safetySeatCounterContainer}>
            <div className={styles.safetySeatCounterMinusContainer}>
              <button
                onClick={onDecreaseChildSafetySeat}
                className={styles.safetySeatCounterMinusSelf}
                style={{
                  background: inputsBackground,
                  border: `1px solid ${borderColorForInnerElements}`,
                  borderTopLeftRadius: borderRadiusesForInnerElements,
                  borderBottomLeftRadius: borderRadiusesForInnerElements,
                }}
                type="button"
              >
                <MinusIcon color={fontColor} />
              </button>
            </div>
            <div className={styles.safetySeatCounterInputContainer}>
              <input
                ref={register}
                name={`Infant & Child Safety Seat`}
                onChange={(e) => {
                  setChildSafetySeat(e.target.value)
                  setSafetySeatCount(e.target.value)
                }}
                value={safetySeatCountRedux}
                size="1"
                type="number"
                className={styles.safetySeatCounterInputSelf}
                style={{
                  background: inputsBackground,
                  borderTop: `1px solid ${borderColorForInnerElements}`,
                  borderBottom: `1px solid ${borderColorForInnerElements}`,
                  color: inputsFontColor,
                }}
              />
            </div>
            <div className={styles.safetySeatCounterPlusContainer}>
              <button
                onClick={onIncreaseChildSafetySeat}
                className={styles.safetySeatCounterPlusSelf}
                style={{
                  background: inputsBackground,
                  border: `1px solid ${borderColorForInnerElements}`,
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
      )}
    </div>
  )
})
