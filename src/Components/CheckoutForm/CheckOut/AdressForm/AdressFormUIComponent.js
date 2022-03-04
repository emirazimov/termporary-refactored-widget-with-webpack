import { ListItem, TextField, useMediaQuery } from "@material-ui/core"
import React, { useContext, useRef, useState } from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import GoogleMap from "../../../GoogleMap/GoogleMapContainer/GoogleMap"
import Hours from "./Hours/Hours"
import PassengerQuantity from "./PassengerQuantity/PassengerQuantity"
import Carousel, { consts } from "react-elastic-carousel"
import SafetySeat from "./SafetySeat/SafetySeat"
import Luggage from "./Luggage/Luggage"
import styles from "./AdressFormStyles/AdressForm.module.scss"
import "./AdressFormStyles/AdressFormDatePickerSeparatedStyles.scss"
import { Switch } from "../../../Helpers/Switch/Switch"
import "./AdressFormStyles/AdressFormCarousel.scss"
import CalendarPicker from "@mui/lab/CalendarPicker"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import { Modal } from "../../../Helpers/Modal/Modal"
import ThemeContext from "../../../../context"
import {
  ClockIcon,
  DateIcon,
  HourlyIcon,
  MeetAndGreetIcon,
  MeetAndGreetIconWhite,
  PlaneIcon,
  SafetySeatIcon,
  Ticket,
} from "../../../../assets/icons"
import Autocomplete from "@mui/material/Autocomplete"
import styled from "styled-components"
import ReCAPTCHA from "react-google-recaptcha"

{
  /*компонента перед экспортом обернута в react.memo*/
}

const AdressFormwithoutReactMemo = ({
  carTypes,
  formData,
  setHourlyRedux,
  setGateMeetingRedux,
  gateMeeting,
  hourlyAndSeatsRedux,
  resetInputs,
  setDateForDefaultValue,
  setTimeForDefaultValue,
  setPassengersQuantityForBackStep,
  isBoosterSeatExistOnBackend,
  isSafetySeatExistOnBackend,
  airlines,
  bookingType,
  boosterSeat,
  carSelectionID,
  childSafetySeat,
  destinations,
  flightNumber,
  handleChangeAMPM,
  handleClick,
  handleSubmit,
  hourly,
  hoursAddressForm,
  isAirline,
  luggage,
  methods,
  myArrow,
  onSubmit,
  passengers,
  redBorderOnSubmit,
  redBorderOnSubmit2,
  redBorderOnSubmitForCarType,
  redBorderOnSubmitForDate,
  redBorderOnSubmitForPassengers,
  redBorderOnSubmitForTime,
  redBorderOnSubmitForTime2,
  redBorderOnSubmitForTime3,
  redBorderOnSubmitForTime4,
  redBorderOnSubmitForTime5,
  redBorderOnSubmitForTime6,
  safetySeat,
  setAirlineId,
  setBoosterSeat,
  setChildSafetySeat,
  setDestinations,
  setFlightNumber,
  setHourly,
  setHoursAddressForm,
  setIsAirportPickupIncludedLocalState,
  setIsGateMeeting,
  setLuggage,
  setPassengers,
  setSafetySeat,
  date,
  setDate,
  show,
  setShow,
  AMPM,
  fetchAirlines,
  extractAirlineId,
  time,
  setTime,
  setShowCarsWithSafetySeat,
  showRecaptcha,
  setShowRecaptcha,
  setSafetySeatCount,
  setBoosterSeatCount,
  redBorderOnSubmitForHours,
  setHoursRedux,
  hoursCount,
}) => {
  const isMobile = useMediaQuery("(max-width:530px)")

  const {
    ThemeProviderAppBackgroundColor,
    fontColor,
    borderRadiuses,
    carsTypeColor,
    carsTypeBorderColor,
    hoverColor,
    iconsColor,
    backAndNextButtonsColor,
    backAndNextButtonsFontColor,
    backAndNextButtonsBorderColor,
    innerTextOnHover,
    inputsFontColor,
    inputsBackground,
    borderRadiusesForInnerElements,
    borderRadiusesForWholeApp,
    borderColorForInnerElements,
    borderColorForOuterApp,
    AMPMHoverBackgroundColor,
    AMPMHoverFontColor,
  } = useContext(ThemeContext)

  const [card, setCard] = useState()
  const inputCard = useRef()
  const startsWithTwo = time[0] === "2"

  const handleChange = () => {
    const timeNumberAfterColon = ":"

    const setZeroOrNot = (timeValue1) => {
      if (timeValue1 > 1) {
        return 0
      }
      return timeValue1
    }
    const timeValue = inputCard.current.value
      .replace(/\D/g, "")
      .match(/(\d{0,1})(\d{0,1})(\d{0,1})(\d{0,1})/)
    inputCard.current.value = timeValue[4]
      ? `${setZeroOrNot(timeValue[1])}${timeValue[2]}${
          (timeValue[3] || timeValue[2]) && timeNumberAfterColon
        }${timeValue[3]}${timeValue[4]}`
      : `${timeValue[1]}${
          (timeValue[3] || timeValue[2]) && timeNumberAfterColon
        }${timeValue[2]}${timeValue[3]}`

    setTime(inputCard.current.value)
    setTimeForDefaultValue(inputCard.current.value)
    console.log(timeValue)
  }

  const MeetAndGreetSwitchBlock = (
    <>
      <div className={styles.meetAndGreetWrapper}>
        <div className={styles.meetAndGreetContainer}>
          <div className={styles.meetAndGreetIconAndNameContainer}>
            <MeetAndGreetIcon color={fontColor} />
            <span
              className={styles.meetAndGreetIconAndNameTitle}
              style={{ color: fontColor }}
            >
              {"Meet & Greet/Luggage Assist"}
            </span>
          </div>

          <div className={styles.meetAndGreetSwitch}>
            <Switch
              checked={gateMeeting}
              onClick={() => {
                if (gateMeeting == false) {
                  setGateMeetingRedux(true)
                  setIsGateMeeting(true)
                  setIsAirportPickupIncludedLocalState(true)
                  console.log("true")
                } else {
                  setGateMeetingRedux(false)
                  setIsGateMeeting(false)
                  setIsAirportPickupIncludedLocalState(false)
                  console.log("false")
                }
              }}
              numberToIdentify={1}
            />
          </div>
        </div>
      </div>
      <Luggage luggage={luggage} setLuggage={setLuggage} />
    </>
  )

  function onChange(value) {
    console.log("Captcha value:", value)
    window.localStorage.setItem("captcha", value)
  }

  React.useEffect(() => {
    fetchAirlines()
  }, [])

  return (
    <div
      className={styles.mainWrapper}
      style={{ backgroundColor: ThemeProviderAppBackgroundColor }}
    >
      <FormProvider {...methods} style={{ width: "100%" }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <div className={styles.mapAndDirectionsWrapper}>
            <GoogleMap
              setDestinations={setDestinations}
              destinations={destinations}
              orderAddressDetails={formData.orderAddressDetails}
              redBorderOnSubmit={redBorderOnSubmit}
              redBorderOnSubmit2={redBorderOnSubmit2}
            />
          </div>
          <div className={styles.underMapOptionsWrapper}>
            <div className={styles.underMapOptionsContainer}>
              {(isAirline || formData.isAirportPickupIncluded) &&
                (formData.bookingType === 3 || bookingType === 3) && (
                  <div className={styles.underMapOptionsContainerForAirlines}>
                    <div className={styles.airlinesItem}>
                      <PlaneIcon color={fontColor} />
                      <Autocomplete
                        disablePortal
                        onChange={(event, newValue) => {
                          newValue
                            ? extractAirlineId(newValue)
                            : setAirlineId(null)
                        }}
                        style={{ width: "100%" }}
                        options={airlines.map((airline) => airline.name)}
                        renderInput={(params) => (
                          <div
                            ref={params.InputProps.ref}
                            style={{ width: "100%", display: "flex" }}
                          >
                            <input
                              type="text"
                              {...params.inputProps}
                              placeholder="Airlines"
                              className={styles.airLinesInput}
                              style={{
                                width: "100%",
                                color: inputsFontColor,
                                border: `1px solid ${borderColorForInnerElements}`,
                                background: inputsBackground,
                              }}
                            />
                          </div>
                        )}
                      />
                    </div>
                    <div className={styles.flightNumberContainer}>
                      <div className={styles.flightNumberItem}>
                        <Ticket color={fontColor} />
                        <input
                          name="flightNumber"
                          placeholder="Flight number"
                          className={styles.flightNumberInput}
                          autoComplete="off"
                          style={{
                            color: inputsFontColor,
                            border: `1px solid ${borderColorForInnerElements}`,
                            background: inputsBackground,
                          }}
                          defaultValue={null}
                          value={flightNumber}
                          onChange={(e) => setFlightNumber(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              <div className={styles.dateTimeBlock}>
                <div className={styles.dateTimeBlockContainer}>
                  <div className={styles.datePicker}>
                    <DateIcon color={inputsFontColor} />
                    <div
                      onClick={() => setShow(true)}
                      className={
                        redBorderOnSubmitForDate
                          ? styles.datePickerOpenButtonWithRedBorder
                          : styles.datePickerOpenButton
                      }
                      placeholder="Pick up Date"
                      value={
                        formData.dateForDefaultValue && !resetInputs
                          ? formData.dateForDefaultValue
                          : date?.toLocaleDateString("en-US")
                      }
                      style={{
                        color: inputsFontColor,
                        border: !redBorderOnSubmitForDate
                          ? `1px solid ${borderColorForInnerElements}`
                          : `1px solid red`,
                        borderRadius: borderRadiusesForInnerElements,
                        background: inputsBackground,
                      }}
                    >
                      {formData.dateForDefaultValue && !resetInputs
                        ? formData.dateForDefaultValue
                        : date?.toLocaleDateString("en-US")}

                      {!formData.dateForDefaultValue ? (
                        <span style={{ color: "grey" }}>Pick up Date</span>
                      ) : null}
                    </div>

                    <Modal onClose={() => setShow(false)} show={show}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <div>
                          <CalendarPicker
                            date={date}
                            onChange={(newDate) => {
                              console.log(newDate)
                              if (newDate instanceof Date) {
                                setShow(false)
                              }
                              setDateForDefaultValue(
                                newDate.toLocaleDateString("en-US")
                              )
                              setDate(newDate)
                            }}
                          />
                        </div>
                      </LocalizationProvider>
                    </Modal>
                  </div>
                  <div className={styles.timePicker}>
                    <div className={styles.timePickerContainer}>
                      <ClockIcon color={inputsFontColor} />
                      <input
                        name="orderStartTime"
                        placeholder="hh:mm"
                        autoComplete="off"
                        className={styles.timePickerInput}
                        setTime={setTime}
                        ref={inputCard}
                        onClick={(event) => {
                          const { value } = event.target
                          const position = value.length
                          event.target.setSelectionRange(position, position)
                        }}
                        onChange={handleChange}
                        style={{
                          color: inputsFontColor,
                          border:
                            redBorderOnSubmitForTime ||
                            redBorderOnSubmitForTime2 ||
                            redBorderOnSubmitForTime3 ||
                            redBorderOnSubmitForTime4 ||
                            redBorderOnSubmitForTime5 ||
                            redBorderOnSubmitForTime6
                              ? `1px solid red`
                              : `1px solid ${borderColorForInnerElements}`,
                          background: inputsBackground,
                          textAlign: "right",
                          paddingRight: "78px",
                          borderRadius: borderRadiusesForInnerElements,
                        }}
                        value={
                          !resetInputs ? formData.timeForDefaultValue : null
                        }
                      />
                      <div className={styles.toggleButtonsContainer}>
                        <div
                          className={styles.toggleButtonAM}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleChangeAMPM(e)
                          }}
                          style={{
                            color:
                              AMPM == "AM"
                                ? `${AMPMHoverFontColor}`
                                : inputsFontColor,
                            background:
                              AMPM == "AM"
                                ? `${AMPMHoverBackgroundColor}`
                                : "transparent",
                            opacity: AMPM == "AM" ? "1" : "0.5",
                            borderRadius: `calc(${borderRadiusesForInnerElements} - 2px)`,
                          }}
                        >
                          AM
                        </div>
                        <div
                          className={styles.toggleButtonPM}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleChangeAMPM(e)
                          }}
                          style={{
                            color:
                              AMPM == "PM"
                                ? `${AMPMHoverFontColor}`
                                : inputsFontColor,
                            background:
                              AMPM == "PM"
                                ? `${AMPMHoverBackgroundColor}`
                                : "transparent",
                            opacity: AMPM == "PM" ? "1" : "0.5",
                            borderRadius: `calc(${borderRadiusesForInnerElements} - 2px)`,
                          }}
                        >
                          PM
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{ width: "100%" }}
                className={styles.passengersQuantityBlock}
              >
                <div className={styles.passengersQuantityBlockContainer}>
                  <PassengerQuantity
                    passengersqState={formData.passengersQuantity}
                    setPassengers={setPassengers}
                    passengers={passengers}
                    setPassengersQuantityForBackStep={
                      setPassengersQuantityForBackStep
                    }
                    passengersQuantityForBackStep={
                      formData.passengersQuantityForBackStep
                    }
                    redBorderOnSubmitForPassengers={
                      redBorderOnSubmitForPassengers
                    }
                  />
                </div>
              </div>
              {(isAirline || formData.isAirportPickupIncluded) &&
                (formData.bookingType === 3 || bookingType === 3) &&
                MeetAndGreetSwitchBlock}
              {destinations[1]?.rideCheckPoint.match(/(^|\W)Airport($|\W)/) &&
                MeetAndGreetSwitchBlock}
              {(isBoosterSeatExistOnBackend || isSafetySeatExistOnBackend) && (
                <div className={styles.safetySeatWrapper}>
                  <div className={styles.safetySeatContainer}>
                    <div className={styles.safetySeatIconAndNameContainer}>
                      <SafetySeatIcon color={fontColor} />
                      <span
                        className={styles.safetySeatIconAndNameTitle}
                        style={{ color: fontColor }}
                      >
                        Safety Seat
                      </span>
                    </div>
                    <Switch
                      checked={formData.showCarsWithSafetySeat}
                      onClick={() => {
                        setSafetySeat(!safetySeat)
                        setShowCarsWithSafetySeat(!safetySeat)
                      }}
                      numberToIdentify={2}
                    />
                  </div>
                </div>
              )}
              <div className={styles.SafetySeatCounterWrapper}>
                {formData.showCarsWithSafetySeat === true && (
                  <div className={styles.SafetySeatCounterContainer}>
                    <SafetySeat
                      setBoosterSeat={setBoosterSeat}
                      setChildSafetySeat={setChildSafetySeat}
                      boosterSeat={boosterSeat}
                      childSafetySeat={childSafetySeat}
                      isBoosterSeatExistOnBackend={isBoosterSeatExistOnBackend}
                      isSafetySeatExistOnBackend={isSafetySeatExistOnBackend}
                      showCarsWithSafetySeat={formData.showCarsWithSafetySeat}
                      setSafetySeatCount={setSafetySeatCount}
                      setBoosterSeatCount={setBoosterSeatCount}
                      safetySeatCountRedux={formData.safetySeatCount}
                      boosterSeatCountRedux={formData.boosterSeatCount}
                      showCarsWithSafetySeat={formData.showCarsWithSafetySeat}
                    />
                  </div>
                )}
              </div>
              <div className={styles.hourlyWrapper}>
                <div className={styles.hourlyRowContainer}>
                  <div className={styles.hourlyIconAndNameContainer}>
                    <HourlyIcon color={fontColor} />
                    <span
                      className={styles.hourlyIconAndNameTitle}
                      style={{ color: fontColor }}
                    >
                      Hourly
                    </span>
                  </div>
                  <Switch
                    checked={hourlyAndSeatsRedux}
                    onClick={() => {
                      if (!hourlyAndSeatsRedux) {
                        setHourlyRedux(true)
                      } else {
                        setHourlyRedux(false)
                      }
                      setHourly(!hourly)
                    }}
                    numberToIdentify={3}
                  />
                </div>
              </div>
              <div className={styles.hourlyCounter}>
                {hourlyAndSeatsRedux === true && (
                  <Hours
                    hoursState={formData.hours}
                    hourly={hourly}
                    hoursAddressForm={hoursAddressForm}
                    setHoursAddressForm={setHoursAddressForm}
                    setHoursAddressForm={setHoursAddressForm}
                    redBorderOnSubmitForHours={redBorderOnSubmitForHours}
                    setHoursRedux={setHoursRedux}
                    hoursCount={hoursCount}
                  />
                )}
              </div>
              <div className={styles.preferencesWrapper}>
                <div className={styles.preferencesTitleContainer}>
                  <span
                    className={styles.preferencesTitle}
                    style={{ color: fontColor }}
                  >
                    Preferences
                  </span>
                </div>
                <div
                  className={styles.preferencesCarsContainer}
                  style={{
                    borderRadius: `${borderRadiusesForInnerElements}`,
                    border: redBorderOnSubmitForCarType
                      ? "1px solid red"
                      : "1px solid transprent",
                  }}
                >
                  <Carousel
                    renderArrow={myArrow}
                    itemsToShow={3}
                    pagination={false}
                    transitionMs={300}
                  >
                    {carTypes.map((car, indexOfEachCar) => (
                      <CarItemContainer
                        hoverColor={hoverColor}
                        borderRadiusesForInnerElements={
                          borderRadiusesForInnerElements
                        }
                        carsTypeColor={carsTypeColor}
                        carsTypeBorderColor={carsTypeBorderColor}
                        carSelected={car.id === carSelectionID}
                        fontColor={fontColor}
                        innerTextOnHover={innerTextOnHover}
                        onClick={() => handleClick(car.id)}
                        name="carsValidation"
                      >
                        <div className={styles.carItemTitleContainer}>
                          <span className={styles.carItemTitle}>
                            {car.name}
                          </span>
                        </div>
                        <div item className={styles.carImageContainer}>
                          <img
                            alt="carImage"
                            src={car.imageUrl}
                            className={
                              indexOfEachCar == 2
                                ? styles.carImageStylesForBiggerTypeOfImage
                                : styles.carImage
                            }
                            item
                            className={styles.carImage}
                          />
                          {console.log(indexOfEachCar == 2)}
                        </div>
                      </CarItemContainer>
                    ))}
                  </Carousel>
                </div>
                <Modal
                  onClose={() => setShowRecaptcha(false)}
                  show={showRecaptcha}
                >
                  <ReCAPTCHA
                    sitekey="6LeuP3weAAAAAHoe3aaP27xmYorD1s1vXK7XdlPk"
                    onChange={onChange}
                  />
                </Modal>
                <div className={styles.buttonGroupBlockContainer}>
                  <button
                    type="submit"
                    className={styles.buttonNextSelf}
                    style={{
                      background: backAndNextButtonsColor,
                      color: backAndNextButtonsFontColor,
                      border: `1px solid ${backAndNextButtonsBorderColor}`,
                      borderRadius: borderRadiusesForInnerElements,
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

const AdressFormUIComponent = React.memo(AdressFormwithoutReactMemo)

export default AdressFormUIComponent

const CarItemContainer = styled.div`
  width: 60px;
  height: 66px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius:${(props) => props.borderRadiusesForInnerElements};
  border: 1px solid ${(props) => props.carsTypeBorderColor};
  background: ${(props) => {
    if (!props.carSelected) {
      return props.carsTypeColor
    } else {
      return props.hoverColor
    }
  }}} ;
   outline: none !important;
  span{
    color:
    
    ${(props) => {
      if (props.carSelected) {
        return props.innerTextOnHover
      } else {
        return props.fontColor
      }
    }}};
  }

  transition: 0.1s;
  &:hover {
    background: ${(props) => props.hoverColor};
    cursor: pointer;
    transition: 0.1s;

    span{
    color:${(props) => props.innerTextOnHover} ;
  }
  }
`
