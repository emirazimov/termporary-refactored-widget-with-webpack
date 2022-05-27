import React, { useContext } from "react"
import Carousel from "react-material-ui-carousel"
import { Preloader } from "../../../Helpers/Preloader/Preloader"
import { AppBar, useMediaQuery } from "@material-ui/core"
import { AspectRatio } from "react-aspect-ratio"
import "./FleetForm.css"
import IncorrectAddressError from "../../IncorrectAdressError/IncorrectAddressError"
import styles from "./FleetForm.module.scss"
import { Modal } from "../../../Helpers/Modal/Modal"
import ThemeContext from "../../../../context"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./FleetForm.css"

function SampleNextArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "0", zIndex: "30" }}
      onClick={onClick}
    />
  )
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "0", zIndex: "30" }}
      onClick={onClick}
    />
  )
}

const FleetForm = ({
  cars,
  isFetching,
  back,
  next,
  setCarId,
  gateMeeting,
  setGateMeetingRedux,
  error,
  setActiveStep,
  setResetWidgetInputs,
  setIsAirportPickupIncluded,
  carCard,
  handleClickOpen,
  handleClickClose,
  handleClick,
  result,
  round,
  show,
  showSafetySeatIsNotAvailable,
  setShowSafetySeatIsNotAvailable,
  formData,
}) => {
  const isMobile = useMediaQuery("(max-width:500px)")
  const isiPad = useMediaQuery("(max-width:1024px)")

  const carTextColor = "white"
  const car = [cars[0], cars[1]]

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          height: "6px",
          backgroundColor: "transparent",
          // borderRadius: "10px",
          padding: "0",
          bottom: "10px",
        }}
      >
        <ul style={{ margin: "0px", paddingLeft: "0px", textAlign: "center" }}>
          {dots}
        </ul>
      </div>
    ),
    // customPaging: function (i) {
    //   return (
    //     <div
    //     // style={{
    //     //   width: "3px",
    //     //   height: "3px",
    //     //   background: "red",

    //     //   // bottom: "6px",
    //     // }}
    //     ></div>
    //   )
    // },
    dotsClass: "button__bar",
  }

  const {
    ThemeProviderAppBackgroundColor,
    fontColor,
    borderRadiuses,
    carsTypeColor,
    hoverColor,
    iconsColor,
    backAndNextButtonsColor,
    backAndNextButtonsFontColor,
    backAndNextButtonsBorderColor,
    innerTextOnHover,
    inputsFontColor,
    borderRadiusesForInnerElements,
    borderRadiusesForWholeApp,
    borderColorForInnerElements,
    borderColorForOuterApp,
    fleetCarsBackgroundColor,
    dotsLineColor,
  } = useContext(ThemeContext)

  const ifThereisError = () => {
    if (error) {
      return (
        <IncorrectAddressError
          errorMessage={error}
          setActiveStep={setActiveStep}
        />
      )
    } else {
      if (!isFetching) {
        return (
          <div
            className={styles.mainWrapperFleet}
            style={{ background: ThemeProviderAppBackgroundColor }}
          >
            <div className={styles.contentContainer}>
              {showSafetySeatIsNotAvailable && (
                <div
                  className={styles.showSafetySeatIsNotAvailable}
                  style={{ background: ThemeProviderAppBackgroundColor }}
                >
                  <span
                    style={{
                      width: "100%",
                      color: fontColor,
                      textAlign: "center",
                      marginTop: "30px",
                      marginBottom: " 45px",
                    }}
                  >
                    Safety Seat is Not Available
                  </span>
                  <button
                    type="button"
                    style={{
                      width: "100%",
                      color: fontColor,
                      background: ThemeProviderAppBackgroundColor,
                      border: "none",
                      borderTop: `1px solid ${fontColor}`,
                      cursor: "pointer",
                      paddingTop: "18px",
                      paddingBottom: "18px",
                    }}
                    onClick={() => {
                      setShowSafetySeatIsNotAvailable(false)
                    }}
                  >
                    OK
                  </button>
                </div>
              )}
              <div className={styles.pageTitleContainer}>
                <span className={styles.pageTitle} style={{ color: fontColor }}>
                  Select vehicle
                </span>
              </div>
              <div className={styles.carListContainer}>
                {console.log(typeof cars)}
                {cars.map((car, index) => (
                  <div
                    onClick={(event) => {
                      if (
                        car.isBoosterSeatsExist == false &&
                        car.isBoosterSeatsExist == false &&
                        formData.showCarsWithSafetySeat == true
                      ) {
                        setShowSafetySeatIsNotAvailable(true)
                      } else {
                        !showSafetySeatIsNotAvailable && handleClick(car?.id)
                      }
                    }}
                    className={
                      car?.id === carCard
                        ? styles.carContainerSelected
                        : styles.carContainer
                    }
                    key={`${car?.id}${car?.name}`}
                    style={{
                      cursor: showSafetySeatIsNotAvailable
                        ? "not-allowed"
                        : "pointer",
                      background: fleetCarsBackgroundColor,
                      border: `1px solid ${borderColorForInnerElements}`,
                      borderRadius: borderRadiusesForInnerElements,
                    }}
                  >
                    <div className={styles.carImageBlock}>
                      {car.isBoosterSeatsExist == false &&
                        car.isBoosterSeatsExist == false &&
                        formData.showCarsWithSafetySeat == true && (
                          <span className={styles.safetySeatNotAvailable}>
                            Safety Seat N/A
                          </span>
                        )}
                      <Slider {...settings} className={styles.carImageSelf}>
                        {car?.imageUrls?.length !== 0 ? (
                          car?.imageUrls?.map((url) => (
                            <span
                              key={url.id}
                              // variant="outlined"
                              // color="primary"
                            >
                              <div
                                className={styles.orSimiliar}
                                style={{
                                  background: fleetCarsBackgroundColor,
                                  color: fontColor,
                                  // borderTopLeftRadius:
                                  //   borderRadiusesForInnerElements,
                                }}
                              >
                                or similar
                              </div>
                              <img
                                src={url?.path}
                                key={url?.id}
                                alt="car"
                                className={styles.carImageSelf}
                                onClick={(event) => {
                                  handleClickOpen(car?.id)
                                }}
                                style={{
                                  borderRadius: borderRadiusesForInnerElements,
                                }}
                              />
                            </span>
                          ))
                        ) : (
                          <>
                            <span
                              className={styles.orSimiliar}
                              style={{
                                background: fleetCarsBackgroundColor,
                                color: fontColor,
                                // borderTopLeftRadius:
                                //   borderRadiusesForInnerElements,
                              }}
                            >
                              or similar
                            </span>

                            <img
                              src={
                                "https://fl-1.cdn.flockler.com/embed/not-found.png"
                              }
                              className={styles.carImageSelf}
                              alt="car"
                              style={{
                                borderRadius: borderRadiusesForInnerElements,
                              }}
                            />
                          </>
                        )}
                      </Slider>
                    </div>
                    <div className={styles.carDescriptionTextBlock}>
                      <div className={styles.carDescriptionTextContainer}>
                        <span
                          className={styles.carModel}
                          style={{
                            color: fontColor,
                          }}
                        >
                          {car?.make} {car?.model}
                        </span>
                        <div className={styles.detailedDescription}>
                          <div
                            className={styles.detailedDescriptionTitleContainer}
                          >
                            <span
                              className={styles.detailedDescriptionTitleSelf}
                              style={{
                                color: fontColor,
                              }}
                            >
                              Type
                            </span>
                          </div>
                          <div
                            className={
                              styles.detailedDescriptionPointedLineContainer
                            }
                          >
                            <div
                              className={
                                styles.detailedDescriptionPointedLineSelf
                              }
                              style={{
                                borderBottom: `2px dotted ${dotsLineColor}`,
                              }}
                            />
                          </div>
                          <div
                            className={styles.detailedDescriptionValueContainer}
                          >
                            <span
                              className={styles.detailedDescriptionValueSelf}
                              style={{
                                color: fontColor,
                              }}
                            >
                              {car?.type}
                            </span>
                          </div>
                        </div>

                        <div className={styles.detailedDescription}>
                          <div
                            className={styles.detailedDescriptionTitleContainer}
                          >
                            <span
                              className={styles.detailedDescriptionTitleSelf}
                              style={{
                                color: fontColor,
                              }}
                            >
                              Capacity
                            </span>
                          </div>
                          <div
                            className={
                              styles.detailedDescriptionPointedLineContainer
                            }
                          >
                            <div
                              className={
                                styles.detailedDescriptionPointedLineSelf
                              }
                              style={{
                                borderBottom: `2px dotted ${dotsLineColor}`,
                              }}
                            />
                          </div>
                          <div
                            className={styles.detailedDescriptionValueContainer}
                          >
                            <span
                              className={styles.detailedDescriptionValueSelf}
                              style={{
                                color: fontColor,
                              }}
                            >
                              {car?.capacity}
                            </span>
                          </div>
                        </div>

                        <div className={styles.detailedDescription}>
                          <div
                            className={styles.detailedDescriptionTitleContainer}
                          >
                            <span
                              className={styles.detailedDescriptionTitleSelf}
                              style={{
                                color: fontColor,
                              }}
                            >
                              Color
                            </span>
                          </div>
                          <div
                            className={
                              styles.detailedDescriptionPointedLineContainer
                            }
                          >
                            <div
                              className={
                                styles.detailedDescriptionPointedLineSelf
                              }
                              style={{
                                borderBottom: `2px dotted ${dotsLineColor}`,
                              }}
                            />
                          </div>
                          <div
                            className={styles.detailedDescriptionValueContainer}
                          >
                            <span
                              className={styles.detailedDescriptionValueSelf}
                              style={{
                                color: fontColor,
                              }}
                            >
                              {car?.color}
                            </span>
                          </div>
                        </div>

                        <div className={styles.detailedDescription}>
                          <div
                            className={styles.detailedDescriptionTitleContainer}
                          >
                            <span
                              className={styles.detailedDescriptionTitleSelf}
                              style={{
                                color: fontColor,
                              }}
                            >
                              Amount
                            </span>
                          </div>
                          <div
                            className={
                              styles.detailedDescriptionPointedLineContainer
                            }
                          >
                            <div
                              className={
                                styles.detailedDescriptionPointedLineSelf
                              }
                              style={{
                                borderBottom: `2px dotted ${dotsLineColor}`,
                              }}
                            />
                          </div>
                          <div
                            className={styles.detailedDescriptionValueContainer}
                          >
                            <span
                              className={
                                styles.detailedDescriptionValueAmountSelf
                              }
                              style={{
                                color: fontColor,
                              }}
                            >
                              {gateMeeting
                                ? `$${round(car?.price, 2)}`
                                : `$${round(car?.price, 2)}`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Modal onClose={() => handleClickClose()} show={show}>
                  <Slider
                    {...settings}
                    style={{
                      width: !isMobile ? "550px" : "239px",
                      height: !isMobile ? "400px" : "170px",
                    }}
                    // className={styles.modalSlider}
                  >
                    {result?.imageUrls?.map((url) => (
                      <AspectRatio
                        ratio="4/3"
                        style={{
                          width: !isMobile ? "550px" : "239px",
                          height: !isMobile ? "400px" : "170px",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={url?.path}
                          style={{
                            borderRadius: "8px",
                            width: !isMobile ? "550px" : "239px",
                            height: !isMobile ? "400px" : "170px",
                          }}
                          alt="car"
                          key={`${url?.id}${url?.path}`}
                        />
                      </AspectRatio>
                    ))}
                  </Slider>
                </Modal>
                {Object.keys(cars).length === 0 && (
                  <div
                    style={{
                      color: fontColor,
                    }}
                  >
                    No cars
                  </div>
                )}
              </div>
            </div>
            <div
              className={styles.fleetButtonGroupForPositioning}
              style={{ background: ThemeProviderAppBackgroundColor }}
            >
              <div className={styles.fleetButtonGroupBlockContainer}>
                <button
                  onClick={() => {
                    back()
                    setGateMeetingRedux(false)
                    setResetWidgetInputs(false)
                    setIsAirportPickupIncluded(false)
                  }}
                  className={styles.buttonBackSelf}
                  style={{
                    background: backAndNextButtonsColor,
                    color: backAndNextButtonsFontColor,
                    border: `1px solid ${backAndNextButtonsBorderColor}`,
                    borderRadius: borderRadiusesForInnerElements,
                  }}
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    next()
                    setCarId(carCard)
                  }}
                  disabled={carCard ? false : true}
                  className={styles.buttonNextSelf}
                  style={{
                    opacity: carCard ? "1" : "0.5",
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
        )
      }
    }
  }

  return <>{isFetching ? <Preloader /> : ifThereisError()}</>
}

const FleetFormUIComponent = React.memo(FleetForm)

export default FleetFormUIComponent
