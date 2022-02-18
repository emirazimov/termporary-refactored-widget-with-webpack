import { useMediaQuery } from "@material-ui/core"
import React, { useContext } from "react"
import { AspectRatio } from "react-aspect-ratio"
import Carousel, { consts } from "react-material-ui-carousel"
import { BackArrowIcon, ForwardArrowIcon } from "../../../../assets/icons"
import Directions from "../../../GoogleMap/Directions/Directions"
import styles from "./Preview.module.scss"
import { Modal } from "../../../Helpers/Modal/Modal"
import ThemeContext from "../../../../context"
import styled from "styled-components"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "../FleetForm/FleetForm.css"

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

const PreviewUIComponent = ({
  carId,
  cars,
  formData,
  next,
  back,
  setNoteRedux,
  setOrderSum,
  hourlyAndSeatsRedux,
  gateMeeting,
  selectedCar,
  note,
  setNote,
  distance,
  setDistance,
  sendNote,
  handleChange,
  carCard,
  setCarCard,
  carModal,
  setCarModal,
  open,
  setOpen,
  handleClickOpen,
  handleClickClose,
  handleClick,
  round,
  showCarAmount,
  show,
  setShow,
}) => {
  const isMobile = useMediaQuery("(max-width:500px)")
  console.log(formData.orderStartDateTime)

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
  } = useContext(ThemeContext)

  return (
    <div
      className={styles.previewWrapper}
      style={{ background: ThemeProviderAppBackgroundColor }}
    >
      <div className={styles.previewTitleContainer}>
        <span className={styles.previewTitleSelf} style={{ color: fontColor }}>
          Preview
        </span>
      </div>

      <div className={styles.directionsContainer}>
        <Directions
          destinations={formData.orderAddressDetails}
          setDistance={setDistance}
        />
      </div>
      <div
        className={styles.reservationDetailsContainer}
        style={{
          zIndex: "15",
          backgroundColor: ThemeProviderAppBackgroundColor,
        }}
      >
        <div
          className={styles.carContainer}
          style={{
            background: fleetCarsBackgroundColor,
            border: `1px solid ${borderColorForInnerElements}`,
            borderRadius: borderRadiusesForInnerElements,
          }}
        >
          <div className={styles.carImageBlock}>
            <Slider {...settings} className={styles.carImageSelf}>
              {selectedCar.imageUrls.length !== 0 ? (
                selectedCar.imageUrls.map((url) => (
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
                      }}
                    >
                      or similar
                    </div>

                    <img
                      src={url.path}
                      // style={{
                      //   width: !isMobile ? "100%" : "100%",
                      //   height: !isMobile ? "118px" : "116px",
                      //   borderRadius: "9px",
                      //   cursor: "zoom-in",
                      // }}
                      alt="car"
                      onClick={() => handleClickOpen()}
                      className={styles.carImageSelf}
                      style={{
                        // display: "block",
                        width: !isMobile ? "100%" : "100%",
                        height: !isMobile ? "112px" : "116px",
                        borderTopLeftRadius: borderRadiusesForInnerElements,
                        cursor: "zoom-in",
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
                    }}
                  >
                    or similar
                  </span>
                  <AspectRatio
                    // ratio="560/315"
                    style={{
                      display: "block",
                      width: !isMobile ? "100%" : "100%",
                      height: !isMobile ? "112px" : "116px",
                      borderTopLeftRadius: borderRadiusesForInnerElements,
                      cursor: "zoom-in",
                    }}
                  >
                    <img
                      src={"https://fl-1.cdn.flockler.com/embed/not-found.png"}
                      // style={{
                      //   width: !isMobile ? "100%" : "100%",
                      //   height: !isMobile ? "118px" : "116px",
                      //   borderRadius: "9px",
                      // }}
                      alt="car"
                      className={styles.carImageSelf}
                    />
                  </AspectRatio>
                </>
              )}
            </Slider>
            <Modal onClose={() => handleClickClose()} show={show}>
              <Slider
                {...settings}
                style={{
                  width: !isMobile ? "550px" : "239px",
                  height: !isMobile ? "400px" : "170px",
                }}
                // className={styles.modalSlider}
              >
                {selectedCar.imageUrls.map((url) => (
                  <AspectRatio
                    ratio="4/3"
                    style={{
                      width: !isMobile ? "550px" : "257px",
                      height: !isMobile ? "400px" : "170px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={url.path}
                      style={{
                        borderRadius: "8px",
                        width: !isMobile ? "550px" : "257px",
                        height: !isMobile ? "400px" : "170px",
                      }}
                      alt="car"
                      key={`${url.id}${url.path}`}
                    />
                  </AspectRatio>
                ))}
              </Slider>
            </Modal>
          </div>
          <div className={styles.carDescriptionTextBlock}>
            <div className={styles.carDescriptionTextContainer}>
              <span
                className={styles.carModel}
                style={{
                  color: fontColor,
                }}
              >
                {selectedCar.make} {selectedCar.model}
              </span>

              <div className={styles.detailedDescription}>
                <div className={styles.detailedDescriptionTitleContainer}>
                  <span
                    className={styles.detailedDescriptionTitleSelf}
                    style={{
                      color: fontColor,
                    }}
                  >
                    Type
                  </span>
                </div>
                <div className={styles.detailedDescriptionPointedLineContainer}>
                  <div
                    className={styles.detailedDescriptionPointedLineSelf}
                    style={{
                      borderBottom: `2px dotted ${fontColor}`,
                    }}
                  />
                </div>
                <div className={styles.detailedDescriptionValueContainer}>
                  <span
                    className={styles.detailedDescriptionValueSelf}
                    style={{
                      color: fontColor,
                    }}
                  >
                    {selectedCar.type}
                  </span>
                </div>
              </div>

              <div className={styles.detailedDescription}>
                <div className={styles.detailedDescriptionTitleContainer}>
                  <span
                    className={styles.detailedDescriptionTitleSelf}
                    style={{
                      color: fontColor,
                    }}
                  >
                    Capacity
                  </span>
                </div>
                <div className={styles.detailedDescriptionPointedLineContainer}>
                  <div
                    className={styles.detailedDescriptionPointedLineSelf}
                    style={{
                      borderBottom: `2px dotted ${fontColor}`,
                    }}
                  />
                </div>
                <div className={styles.detailedDescriptionValueContainer}>
                  <span
                    className={styles.detailedDescriptionValueSelf}
                    style={{
                      color: fontColor,
                    }}
                  >
                    {selectedCar.capacity}
                  </span>
                </div>
              </div>

              <div className={styles.detailedDescription}>
                <div className={styles.detailedDescriptionTitleContainer}>
                  <span
                    className={styles.detailedDescriptionTitleSelf}
                    style={{
                      color: fontColor,
                    }}
                  >
                    Color
                  </span>
                </div>
                <div className={styles.detailedDescriptionPointedLineContainer}>
                  <div
                    className={styles.detailedDescriptionPointedLineSelf}
                    style={{
                      borderBottom: `2px dotted ${fontColor}`,
                    }}
                  />
                </div>
                <div className={styles.detailedDescriptionValueContainer}>
                  <span
                    className={styles.detailedDescriptionValueSelf}
                    style={{
                      color: fontColor,
                    }}
                  >
                    {selectedCar.color}
                  </span>
                </div>
              </div>

              <div className={styles.detailedDescription}>
                <div className={styles.detailedDescriptionTitleContainer}>
                  <span
                    className={styles.detailedDescriptionTitleSelf}
                    style={{
                      color: fontColor,
                    }}
                  >
                    Amount
                  </span>
                </div>
                <div className={styles.detailedDescriptionPointedLineContainer}>
                  <div
                    className={styles.detailedDescriptionPointedLineSelf}
                    style={{
                      borderBottom: `2px dotted ${fontColor}`,
                    }}
                  />
                </div>
                <div className={styles.detailedDescriptionValueContainer}>
                  <span
                    className={styles.detailedDescriptionValueAmountSelf}
                    style={{
                      color: fontColor,
                    }}
                  >
                    {gateMeeting
                      ? `$${round(
                          selectedCar.price -
                            selectedCar.greetAndMeetPrice -
                            selectedCar.boosterSeatPrice -
                            selectedCar.safetySeatPrice,
                          2
                        )}`
                      : showCarAmount()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.reservationDetailsItem}>
          <div className={styles.reservationDetailsItemContainer}>
            <div className={styles.reservationDetailsItemTitleContainer}>
              <span
                className={styles.reservationDetailsItemTitleSelf}
                style={{
                  color: fontColor,
                }}
              >
                Date
              </span>
            </div>
            <div className={styles.reservationDetailsItemPointedLineContainer}>
              <div
                className={styles.reservationDetailsItemPointedLineSelf}
                style={{
                  borderBottom: `2px dotted ${fontColor}`,
                }}
              />
            </div>
            <div className={styles.reservationDetailsItemValueContainer}>
              <span
                className={styles.reservationDetailsItemValueSelf}
                style={{
                  color: fontColor,
                }}
              >
                {formData.orderStartDateTime.match(
                  /(\d{1,4}([.\-/])\d{1,2}([.\-/])\d{1,4})/g
                )}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.reservationDetailsItem}>
          <div className={styles.reservationDetailsItemContainer}>
            <div className={styles.reservationDetailsItemTitleContainer}>
              <span
                className={styles.reservationDetailsItemTitleSelf}
                style={{
                  color: fontColor,
                }}
              >
                Time
              </span>
            </div>
            <div className={styles.reservationDetailsItemPointedLineContainer}>
              <div
                className={styles.reservationDetailsItemPointedLineSelf}
                style={{
                  borderBottom: `2px dotted ${fontColor}`,
                }}
              />
            </div>
            <div className={styles.reservationDetailsItemValueContainer}>
              <span
                className={styles.reservationDetailsItemValueSelf}
                style={{
                  color: fontColor,
                }}
              >
                {new Date(formData.orderStartDateTime).toLocaleTimeString(
                  "en-US",
                  {
                    hour: "numeric",
                    minute: "numeric",
                  }
                )}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.reservationDetailsItem}>
          <div className={styles.reservationDetailsItemContainer}>
            <div className={styles.reservationDetailsItemTitleContainer}>
              <span
                className={styles.reservationDetailsItemTitleSelf}
                style={{
                  color: fontColor,
                }}
              >
                From
              </span>
            </div>
            <div className={styles.reservationDetailsItemPointedLineContainer}>
              <div
                className={styles.reservationDetailsItemPointedLineSelf}
                style={{
                  borderBottom: `2px dotted ${fontColor}`,
                }}
              />
            </div>
            <div className={styles.reservationDetailsItemValueContainer}>
              <span
                className={styles.reservationDetailsItemValueSelf}
                style={{
                  color: fontColor,
                }}
              >
                {formData.orderAddressDetails[0].rideCheckPoint}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.reservationDetailsItem}>
          <div className={styles.reservationDetailsItemContainer}>
            <div className={styles.reservationDetailsItemTitleContainer}>
              <span
                className={styles.reservationDetailsItemTitleSelf}
                style={{
                  color: fontColor,
                }}
              >
                To
              </span>
            </div>
            <div className={styles.reservationDetailsItemPointedLineContainer}>
              <div
                className={styles.reservationDetailsItemPointedLineSelf}
                style={{
                  borderBottom: `2px dotted ${fontColor}`,
                }}
              />
            </div>
            <div className={styles.reservationDetailsItemValueContainer}>
              <span
                className={styles.reservationDetailsItemValueSelf}
                style={{
                  color: fontColor,
                }}
              >
                {
                  formData.orderAddressDetails[
                    formData.orderAddressDetails.length - 1
                  ].rideCheckPoint
                }
              </span>
            </div>
          </div>
        </div>

        <div className={styles.reservationDetailsItem}>
          <div className={styles.reservationDetailsItemContainer}>
            <div className={styles.reservationDetailsItemTitleContainer}>
              <span
                className={styles.reservationDetailsItemTitleSelf}
                style={{
                  color: fontColor,
                }}
              >
                Vehicle
              </span>
            </div>
            <div className={styles.reservationDetailsItemPointedLineContainer}>
              <div
                className={styles.reservationDetailsItemPointedLineSelf}
                style={{
                  borderBottom: `2px dotted ${fontColor}`,
                }}
              />
            </div>
            <div className={styles.reservationDetailsItemValueContainer}>
              <span
                className={styles.reservationDetailsItemValueSelf}
                style={{
                  color: fontColor,
                }}
              >
                {selectedCar.type}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.reservationDetailsItem}>
          <div className={styles.reservationDetailsItemContainer}>
            <div className={styles.reservationDetailsItemTitleContainer}>
              <span
                className={styles.reservationDetailsItemTitleSelf}
                style={{
                  color: fontColor,
                }}
              >
                Total distance
              </span>
            </div>
            <div className={styles.reservationDetailsItemPointedLineContainer}>
              <div
                className={styles.reservationDetailsItemPointedLineSelf}
                style={{
                  borderBottom: `2px dotted ${fontColor}`,
                }}
              />
            </div>
            <div className={styles.reservationDetailsItemValueContainer}>
              <span
                className={styles.reservationDetailsItemValueSelf}
                style={{
                  color: fontColor,
                }}
              >
                {distance} miles
              </span>
            </div>
          </div>
        </div>

        <div className={styles.reservationDetailsItem}>
          <div className={styles.reservationDetailsItemContainer}>
            <div className={styles.reservationDetailsItemTitleContainer}>
              <span
                className={styles.reservationDetailsItemTitleSelf}
                style={{
                  color: fontColor,
                }}
              >
                Number of Passengers
              </span>
            </div>
            <div className={styles.reservationDetailsItemPointedLineContainer}>
              <div
                className={styles.reservationDetailsItemPointedLineSelf}
                style={{
                  borderBottom: `2px dotted ${fontColor}`,
                }}
              />
            </div>
            <div className={styles.reservationDetailsItemValueContainer}>
              <span
                className={styles.reservationDetailsItemValueSelf}
                style={{
                  color: fontColor,
                }}
              >
                {formData.passengersQuantity}
              </span>
            </div>
          </div>
        </div>

        {hourlyAndSeatsRedux && (
          <div className={styles.reservationDetailsItem}>
            <div className={styles.reservationDetailsItemContainer}>
              <div className={styles.reservationDetailsItemTitleContainer}>
                <span
                  className={styles.reservationDetailsItemTitleSelf}
                  style={{
                    color: fontColor,
                  }}
                >
                  Hours
                </span>
              </div>
              <div
                className={styles.reservationDetailsItemPointedLineContainer}
              >
                <div
                  className={styles.reservationDetailsItemPointedLineSelf}
                  style={{
                    borderBottom: `2px dotted ${fontColor}`,
                  }}
                />
              </div>
              <div className={styles.reservationDetailsItemValueContainer}>
                <span
                  className={styles.reservationDetailsItemValueSelf}
                  style={{
                    color: fontColor,
                  }}
                >
                  {formData.hours}
                </span>
              </div>
            </div>
          </div>
        )}

        <>
          {selectedCar.boosterSeatPrice == undefined
            ? null
            : formData.showCarsWithSafetySeat == true && (
                <div className={styles.reservationDetailsItem}>
                  <div className={styles.reservationDetailsItemContainer}>
                    <div
                      className={styles.reservationDetailsItemTitleContainer}
                    >
                      <span
                        className={styles.reservationDetailsItemTitleSelf}
                        style={{
                          color: fontColor,
                        }}
                      >
                        Youth Booster Seat
                      </span>
                    </div>
                    <div
                      className={
                        styles.reservationDetailsItemPointedLineContainer
                      }
                    >
                      <div
                        className={styles.reservationDetailsItemPointedLineSelf}
                        style={{
                          borderBottom: `2px dotted ${fontColor}`,
                        }}
                      />
                    </div>
                    <div
                      className={styles.reservationDetailsItemValueContainer}
                    >
                      <span
                        className={styles.reservationDetailsItemValueSelf}
                        style={{
                          color: fontColor,
                        }}
                      >
                        {selectedCar.boosterSeatPrice !== 0 &&
                        selectedCar.boosterSeatPrice !== undefined
                          ? `$${selectedCar.boosterSeatPrice}`
                          : `$${0}`}
                      </span>
                    </div>
                  </div>
                </div>
              )}
        </>

        <>
          {selectedCar.safetySeatPrice == undefined
            ? null
            : formData.showCarsWithSafetySeat == true && (
                <div className={styles.reservationDetailsItem}>
                  <div className={styles.reservationDetailsItemContainer}>
                    <div
                      className={styles.reservationDetailsItemTitleContainer}
                    >
                      <span
                        className={styles.reservationDetailsItemTitleSelf}
                        style={{
                          color: fontColor,
                        }}
                      >
                        {"Infant & Child Safety Seat"}
                      </span>
                    </div>
                    <div
                      className={
                        styles.reservationDetailsItemPointedLineContainer
                      }
                    >
                      <div
                        className={styles.reservationDetailsItemPointedLineSelf}
                        style={{
                          borderBottom: `2px dotted ${fontColor}`,
                        }}
                      />
                    </div>
                    <div
                      className={styles.reservationDetailsItemValueContainer}
                    >
                      <span
                        className={styles.reservationDetailsItemValueSelf}
                        style={{
                          color: fontColor,
                        }}
                      >
                        {selectedCar.safetySeatPrice !== 0 &&
                        selectedCar.safetySeatPrice !== undefined
                          ? `$${selectedCar.safetySeatPrice}`
                          : `$${0}`}
                      </span>
                    </div>
                  </div>
                </div>
              )}
        </>

        {gateMeeting && (
          <>
            <div className={styles.reservationDetailsItem}>
              <div className={styles.reservationDetailsItemContainer}>
                <div className={styles.reservationDetailsItemTitleContainer}>
                  <span
                    className={styles.reservationDetailsItemTitleSelf}
                    style={{
                      color: fontColor,
                    }}
                  >
                    {"Meet & Greet/Luggage Assist"}
                  </span>
                </div>
                <div
                  className={styles.reservationDetailsItemPointedLineContainer}
                >
                  <div
                    className={styles.reservationDetailsItemPointedLineSelf}
                    style={{
                      borderBottom: `2px dotted ${fontColor}`,
                    }}
                  />
                </div>
                <div className={styles.reservationDetailsItemValueContainer}>
                  <span
                    className={styles.reservationDetailsItemValueSelf}
                    style={{
                      color: fontColor,
                    }}
                  >
                    {`$${selectedCar.greetAndMeetPrice}`}
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.reservationDetailsItem}>
              <div className={styles.reservationDetailsItemContainer}>
                <div className={styles.reservationDetailsItemTitleContainer}>
                  <span
                    className={styles.reservationDetailsItemTitleSelf}
                    style={{
                      color: fontColor,
                    }}
                  >
                    Luggage count
                  </span>
                </div>
                <div
                  className={styles.reservationDetailsItemPointedLineContainer}
                >
                  <div
                    className={styles.reservationDetailsItemPointedLineSelf}
                    style={{
                      borderBottom: `2px dotted ${fontColor}`,
                    }}
                  />
                </div>
                <div className={styles.reservationDetailsItemValueContainer}>
                  <span
                    className={styles.reservationDetailsItemValueSelf}
                    style={{
                      color: fontColor,
                    }}
                  >
                    {formData.luggageCount}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        <div className={styles.reservationDetailsItem}>
          <div className={styles.reservationDetailsItemContainer}>
            <div className={styles.reservationDetailsItemTitleContainer}>
              <span
                className={styles.reservationDetailsItemTitleSelf}
                style={{
                  color: fontColor,
                }}
              >
                Total
              </span>
            </div>
            <div className={styles.reservationDetailsItemPointedLineContainer}>
              <div
                className={styles.reservationDetailsItemPointedLineSelf}
                style={{
                  borderBottom: `2px dotted ${fontColor}`,
                }}
              />
            </div>
            <div className={styles.reservationDetailsItemValueContainer}>
              <span
                className={styles.reservationDetailsItemValueSelf}
                style={{
                  color: fontColor,
                }}
              >
                {`$${round(selectedCar.price, 2)}`}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.notesTextFieldContainer}>
          <Textarea
            id="outlined-multiline-flexible"
            placeholder="Notes / Itinerary"
            fontColor={fontColor}
          />
        </div>
        <div className={styles.buttonGroupBlock}>
          <div className={styles.buttonGroupBlockContainer}>
            <button
              variant="contained"
              color="primary"
              fullWidth
              onClick={back}
              startIcon={<BackArrowIcon />}
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
              variant="contained"
              fullWidth
              onClick={() => {
                next()
                sendNote(note)
                setOrderSum(selectedCar.price)
              }}
              color="primary"
              endIcon={<ForwardArrowIcon />}
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
  )
}

export default PreviewUIComponent

const Textarea = styled.textarea`
  width: 100%;
  // display: block;
  height: 45px;
  color: ${(props) => props.fontColor};
  font-family: "Vazir", sans-serif;
  font-size: 15px;
  border: none;
  outline: none;
  resize: none;
  padding: 0;
  background: transparent;
  border-bottom: 1px solid ${(props) => props.fontColor};
  &::-webkit-input-placeholder {
    font-size: 15px;
    color: ${(props) => props.fontColor};
    font-family: "Vazir", sans-serif;
  }
  &:-moz-placeholder {
    /* Upto Firefox 18, Deprecated in Firefox 19  */
    font-size: 15px;
    color: ${(props) => props.fontColor};
    font-family: "Vazir", sans-serif;
  }
  &::-moz-placeholder {
    /* Firefox 19+ */
    font-size: 15px;
    color: ${(props) => props.fontColor};
    font-family: "Vazir", sans-serif;
  }
  &:-ms-input-placeholder {
    font-size: 15px;
    color: ${(props) => props.fontColor};
    font-family: "Vazir", sans-serif;
  }
  &:focus::placeholder {
    color: transparent;
  }
`
