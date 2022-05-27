import { makeStyles } from "@material-ui/core"
// import Grid from "@material-ui/core/Grid"
// import Typography from "@material-ui/core/Typography"
import React, { useContext } from "react"
import { useFormContext } from "react-hook-form"
import { LuggageIcon } from "../../../../../assets/icons"
import ThemeContext from "../../../../../context"
import {
  // HourlyIcon,
  // LuggageIcon,
  MinusIcon,
  PlusIcon,
} from "../../../../../assets/icons"
import "../../index.css"
import styles from "./Luggage.module.scss"

const useStyles = makeStyles((theme) => ({
  mainPlusMinusContainer: {
    height: "34px",

    borderBottom: "2px solid #AC8159",
    transition: "200ms",
    "&:hover": { borderBottom: "2px solid white", transition: "200ms" },
  },
}))

const Luggage = ({ luggage, setLuggage }) => {
  const classes = useStyles()

  const { register } = useFormContext()

  //   const [hoursAddressForm, setHoursAddressForm] = useState(0)

  const onDecrease = () => {
    if (luggage === 0) {
      return
    }
    setLuggage((luggage) => luggage - 1)
  }
  const onIncrease = () => {
    setLuggage((luggage) => luggage + 1)
  }

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
    <div className={styles.luggageQuantityWrapper}>
      <div className={styles.luggageQuantityIconAndTitleContainer}>
        <LuggageIcon color={fontColor} />
        <span
          className={styles.luggageCounterTitle}
          style={{ color: fontColor }}
        >
          Luggage Count
        </span>
      </div>
      <div className={styles.luggageQuantityCounterContainer}>
        <div className={styles.luggageQuantityMinusContainer}>
          <button
            onClick={onDecrease}
            style={{
              background: inputsBackground,
              border: `1px solid ${countersOuterBorderColor}`,

              borderRight: `1px solid ${countersInnerDividerBorder}`,

              borderTopLeftRadius: borderRadiusesForInnerElements,
              borderBottomLeftRadius: borderRadiusesForInnerElements,
            }}
            className={styles.luggageQuantityMinusSelf}
            type="button"
          >
            <MinusIcon color={fontColor} />
          </button>
        </div>
        <div className={styles.luggageQuantityInputContainer}>
          <input
            ref={register}
            name="hours"
            onChange={(e) => {
              setLuggage(e.target.value)
            }}
            value={luggage}
            size="1"
            style={{
              background: inputsBackground,
              borderTop: `1px solid ${countersOuterBorderColor}`,
              borderBottom: `1px solid ${countersOuterBorderColor}`,
              color: inputsFontColor,
            }}
            type="number"
            className={styles.luggageQuantityInputSelf}
          />
        </div>
        <div className={styles.luggageQuantityPlusContainer}>
          <button
            onClick={onIncrease}
            style={{
              background: inputsBackground,
              border: `1px solid ${countersOuterBorderColor}`,

              borderLeft: `1px solid ${countersInnerDividerBorder}`,
              borderTopRightRadius: borderRadiusesForInnerElements,
              borderBottomRightRadius: borderRadiusesForInnerElements,
            }}
            className={styles.luggageQuantityPlusSelf}
            type="button"
          >
            <PlusIcon color={fontColor} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Luggage
