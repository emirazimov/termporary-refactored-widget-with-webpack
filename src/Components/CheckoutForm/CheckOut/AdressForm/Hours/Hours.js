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
    countersOuterBorderColor,
    countersInnerDividerBorder,
  } = useContext(ThemeContext)

  return (
    <div className={styles.hoursCounterWrapper}>
      <div className={styles.hoursCounterIconAndTitleContainer}>
        <HourlyIcon color={fontColor} />
        <h3 className={styles.hoursCounterTitle} style={{ color: fontColor }}>
          Hours
        </h3>
      </div>
      <div className={styles.hoursCounterPlusMinusContainer}>
        <div className={styles.hoursCounterMinusContainer}>
          <button
            onClick={onDecrease}
            className={styles.hoursCounterMinus}
            style={{
              background: inputsBackground,
              border: redBorderOnSubmitForHours
                ? `1px solid red`
                : `1px solid ${countersOuterBorderColor}`,

              borderRight: redBorderOnSubmitForHours
                ? `1px solid red`
                : `1px solid ${countersInnerDividerBorder}`,

              borderTopLeftRadius: borderRadiusesForInnerElements,
              borderBottomLeftRadius: borderRadiusesForInnerElements,
            }}
            type="button"
          >
            <MinusIcon color={inputsFontColor} />
          </button>
        </div>
        <div className={styles.hoursCounterInputContainer}>
          <input
            ref={register}
            name="hours"
            onChange={(e) => {
              setHoursAddressForm(e.target.value)
              setHoursRedux(e.target.value)
            }}
            value={hoursCount}
            size="1"
            style={{
              background: inputsBackground,
              borderTop: redBorderOnSubmitForHours
                ? `1px solid red`
                : `1px solid ${countersOuterBorderColor}`,
              borderBottom: redBorderOnSubmitForHours
                ? `1px solid red`
                : `1px solid ${countersOuterBorderColor}`,
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
                : `1px solid ${countersOuterBorderColor}`,
              borderLeft: redBorderOnSubmitForHours
                ? `1px solid red`
                : `1px solid ${countersInnerDividerBorder}`,
              borderTopRightRadius: borderRadiusesForInnerElements,
              borderBottomRightRadius: borderRadiusesForInnerElements,
            }}
            type="button"
          >
            <PlusIcon color={inputsFontColor} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hours
