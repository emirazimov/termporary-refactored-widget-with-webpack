import { GoogleApiWrapper, Map, Marker } from "google-maps-react"
import React, { forwardRef, useContext, useState } from "react"
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete"
import {
  AddLocIcon,
  DeleteLocIcon,
  EndLocationIcon,
  StartLocationIcon,
} from "../../../assets/icons"
import MapStyles from "../mapStyles"
import { connect } from "react-redux"
import { useStyles } from "./GoogleMapStyles"
import styles from "./GoogleMap.module.scss"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import "./animationForGoogleMap.css"
import ThemeContext from "../../../context"
import styled from "styled-components"

const GoogleMap = React.memo(
  forwardRef(
    ({
      setDestinations,
      destinations,
      orderAddressDetails,
      ref,
      errors,
      redBorderOnSubmit,
      redBorderOnSubmit2,
      resetInputs,
      formData,
      flagForGotAddressError,
      ...props
    }) => {
      const [condition, setCondition] = useState([])

      const handleChanger = (e) => {
        setCondition(e.event.target)
        console.log(condition)
      }
      const [markers, setMarkers] = useState([])
      const [mapCenter, setMapCenter] = useState({
        lat: 33.1507,
        lng: -96.8236,
      })

      const setUseHookState = (value, id) => {
        let newArr = [...destinations]
        newArr[id].rideCheckPoint = value
        setDestinations(newArr)
      }

      const handleChange = (value, id) => {
        setUseHookState(value, id)
      }

      let selectedArray = null

      const handleSelect = async (value, id) => {
        setUseHookState(value, id)
        const results = await geocodeByAddress(value)
        const latLng = await getLatLng(results[0])
        const placeId = results[0].place_id
        let placeType = 0
        if (results[0].types.some((types) => types === "airport")) {
          placeType = 2
        }
        selectedArray = [...destinations]
        selectedArray[id] = {
          ...selectedArray[id],
          latitude: latLng.lat,
          longitude: latLng.lng,
          placeId: placeId,
          placeType: placeType,
        }

        setDestinations(selectedArray)

        setMapCenter({ lat: latLng.lat, lng: latLng.lng })
        if (markers.length >= 1) {
          markers.splice(0, 2)
          setMarkers([...markers, { lat: latLng.lat, lng: latLng.lng }])
        } else {
          setMarkers([...markers, { lat: latLng.lat, lng: latLng.lng }])
        }
      }

      const addEndPoint = () => {
        let newArr = [
          ...destinations,
          {
            rideCheckPoint: "",
            latitude: 0,
            longitude: 0,
            placeType: 0,
            placeId: "",
          },
        ]
        setDestinations(newArr)
      }

      const airportCenter4 = [
        "Daniel K. Inouye International Airport (HNL), Rodgers Blvd, Honolulu, HI, USA",
        "Honolulu Airport (HNL), Rodgers Blvd, Honolulu, HI, USA",
      ]
      var nothing = null
      const removeEndPoint = (index) => {
        let newArr = [...destinations]
        newArr.splice(index, 1)
        setDestinations(newArr)
      }
      var copiedSuggestions = null
      var copiedLoading = null
      React.useEffect(() => {}, [orderAddressDetails])
      React.useEffect(() => {
        if (Boolean(formData.orderAddressDetails[0]?.rideCheckPoint)) {
          setDestinations(formData.orderAddressDetails)
        }
        if (resetInputs) {
          setDestinations(destinations)
        }
      }, [])

      const {
        ThemeProviderAppBackgroundColor,
        fontColor,
        borderRadiuses,
        carsTypeColor,
        hoverColor,
        iconsColor,
        backAndNextButtonsColor,
        innerTextOnHover,
        inputsFontColor,
        borderRadiusesForInnerElements,
        borderRadiusesForWholeApp,
        borderColorForInnerElements,
        borderColorForOuterApp,
        inputsBackground,
      } = useContext(ThemeContext)

      const setDestinationsIcons = (id, destinations) => {
        if (id === 0) {
          return styles.destinationsInputWithFROMIcon
        } else if (id === destinations.length - 1) {
          return styles.destinationsInputWithTOIcon
        }
        if (id > 0 && id < destinations.length - 1) {
          return styles.destinationsInputWithNumberIcon
        }
      }
      const getDestinationsIcons = (id, destinations) => {
        if (id === 0) {
          return <StartLocationIcon color={inputsFontColor} />
        } else if (id === destinations.length - 1) {
          return <EndLocationIcon color={inputsFontColor} />
        }
      }

      return (
        <>
          <div className={styles.mapWithInputsWrapper}>
            <div className={styles.mapContainer}>
              <div className={styles.mapContainerForHideMapsTagsPositioning}>
                <Map
                  google={props.google}
                  disableDefaultUI={true}
                  initialCenter={{
                    lat: mapCenter.lat,
                    lng: mapCenter.lng,
                  }}
                  center={{
                    lat: mapCenter.lat,
                    lng: mapCenter.lng,
                  }}
                  styles={MapStyles}
                  zoom={12}
                >
                  {markers.map((marker, id) => (
                    <Marker
                      key={`${id}${marker.lat}`}
                      lat={marker.lat}
                      lng={marker.lng}
                    />
                  ))}
                </Map>
              </div>
            </div>
            <div
              className={styles.mapInputsContainerForHideMapsTagsPositioning}
              style={{ background: ThemeProviderAppBackgroundColor }}
            >
              <div className={styles.mapInputsContainer}>
                <TransitionGroup>
                  {destinations.map((destination, id) => {
                    console.log(destinations)
                    if (!airportCenter4.includes(destination?.rideCheckPoint)) {
                      nothing = destinations[id]?.rideCheckPoint
                    }

                    return (
                      <CSSTransition
                        key={id}
                        classNames={{
                          enter: "enter",
                          enterActive: "enterActive",
                          exit: "exit",
                          exitActive: "exitActive",
                        }}
                        timeout={300}
                      >
                        <PlacesAutocomplete
                          value={
                            formData.orderAddressDetails[id]?.rideCheckPoint &&
                            !resetInputs
                              ? formData.orderAddressDetails[id]?.rideCheckPoint
                              : nothing
                          }
                          onChange={(value) => handleChange(value, id)}
                          onSelect={(value) => {
                            handleSelect(value, id)
                          }}
                          key={`${destination.id}${id}`}
                        >
                          {({
                            getInputProps,
                            suggestions,
                            getSuggestionItemProps,
                            loading,
                          }) => {
                            copiedSuggestions = [...suggestions].filter(
                              (item) => {
                                return !airportCenter4.includes(
                                  item.description
                                )
                              }
                            )

                            return (
                              <>
                                <div
                                  className={styles.destinationsInputContainer}
                                >
                                  {id > 0 && id < destinations.length - 1 && (
                                    <span
                                      className={
                                        styles.numberOfDestinationPoint
                                      }
                                      style={{
                                        color: inputsFontColor,
                                        border: `2px solid ${inputsFontColor}`,
                                      }}
                                    >
                                      {id}
                                    </span>
                                  )}
                                  {getDestinationsIcons(id, destinations)}
                                  <AddressInput
                                    value={
                                      formData.orderAddressDetails[id]
                                        ?.rideCheckPoint && !resetInputs
                                        ? formData.orderAddressDetails[id]
                                            ?.rideCheckPoint
                                        : nothing
                                    }
                                    name="rideCheckPoint"
                                    defaultValue={
                                      destinations[id]?.rideCheckPoint
                                    }
                                    inputRef={ref}
                                    style={{
                                      color: inputsFontColor,
                                      border:
                                        redBorderOnSubmit ||
                                        redBorderOnSubmit2 ||
                                        flagForGotAddressError
                                          ? `1px solid red`
                                          : `1px solid ${borderColorForInnerElements}`,
                                      background: inputsBackground,
                                      borderRadius:
                                        borderRadiusesForInnerElements,
                                    }}
                                    inputsFontColor={inputsFontColor}
                                    placeholder={id === 0 ? "From" : "To"}
                                    className={setDestinationsIcons(
                                      id,
                                      destinations
                                    )}
                                    {...getInputProps()}
                                  />
                                  {id === destinations.length - 1 && (
                                    <span
                                      onClick={addEndPoint}
                                      className={styles.addLocationIcon}
                                    >
                                      <AddLocIcon color={inputsFontColor} />
                                    </span>
                                  )}
                                  {id > 0 && id < destinations.length - 1 && (
                                    <span
                                      onClick={() => removeEndPoint(id)}
                                      className={styles.deleteLocationIcon}
                                    >
                                      <DeleteLocIcon color={inputsFontColor} />
                                    </span>
                                  )}
                                  <div className={styles.dropDown}>
                                    {loading && (
                                      <div
                                        className={styles.dropDownLoadingText}
                                      >
                                        Loading...
                                      </div>
                                    )}
                                    {copiedSuggestions.map((suggestion, id) => {
                                      return (
                                        <div
                                          key={`${id}${suggestion.description}`}
                                          {...getSuggestionItemProps(
                                            suggestion
                                          )}
                                          className={styles.itemInsideDropDown}
                                        >
                                          {suggestion.description}
                                        </div>
                                      )
                                    })}
                                  </div>
                                </div>
                              </>
                            )
                          }}
                        </PlacesAutocomplete>
                      </CSSTransition>
                    )
                  })}
                </TransitionGroup>
              </div>
            </div>
          </div>
        </>
      )
    }
  )
)

const AddressInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 35px;
  position: relative;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 37px;
  padding-right: 35px;
  background-position-x: 2%;
  background-position-y: 60%;
  font-size: 13.5px;
  &::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${(props) => props.inputsFontColor};
    opacity: 1; /* Firefox */
  }
  &:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${(props) => props.inputsFontColor};
  }
  &::-ms-input-placeholder {
    /* Microsoft Edge */
    color: ${(props) => props.inputsFontColor};
  }
  &:focus {
    outline: none;
  }
`

const mapStateToProps = (state) => {
  return {
    // profile: state.companyProfile.profile,
    formData: state.formData,
    resetInputs: state.resetWidgetInputs.resetInputs,
    flagForGotAddressError: state.companyProfile.gotAddressError,
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCmKhi_5V_pulQtm6DFJ8teDZpR9I5hJoM",
  libraries: ["places", "drawing", "geometry"],
})(connect(mapStateToProps, {})(GoogleMap))
