import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import App from "./App"
import ThemeContext from "./context"
import store from "./Redux/redux-store"
import reportWebVitals from "./reportWebVitals"

// var divForReact = document.createElement("div")

// divForReact.setAttribute("id", "widget-by-bookinglane")
// document.getElementsByTagName("body")[0].appendChild(divForReact)
// var head = document.getElementsByTagName("head")[0]

// head.innerHTML += `<link
//       rel="stylesheet"
//       href="https://bookinglane-widgets.s3.us-east-2.amazonaws.com/Global-widget-files/widget.css"
//     />`

var ThemeProviderAppBackgroundColor = window.ThemeProviderAppBackgroundColor

var fontColor = window.fontColor

var borderRadiusesForInnerElements = window.borderRadiusesForInnerElements

var borderRadiusesForWholeApp = window.borderRadiusesForWholeApp

var borderColorForInnerElements = window.borderColorForInnerElements

var borderColorForOuterApp = window.borderColorForOuterApp

var carsTypeColor = window.carsTypeColor

var carsTypeBorderColor = window.carsTypeBorderColor

var hoverColor = window.hoverColor

var iconsColor = window.iconsColor

var inputsFontColor = window.inputsFontColor

var backAndNextButtonsColor = window.backAndNextButtonsColor
var backAndNextButtonsFontColor = window.backAndNextButtonsFontColor
var backAndNextButtonsBorderColor = window.backAndNextButtonsBorderColor

var fleetCarsBackgroundColor = window.fleetCarsBackgroundColor

var innerTextOnHover = window.innerTextOnHover
var inputsBackground = window.inputsBackground

var bookNowIconCircleBorderColor = window.bookNowIconCircleBorderColor

var bookNowIconBackgroundColor = window.bookNowIconBackgroundColor
var bookNowIconInnerElementsColor = window.bookNowIconInnerElementsColor
var AMPMHoverBackgroundColor = window.AMPMHoverBackgroundColor
var AMPMHoverFontColor = window.AMPMHoverFontColor

var countersOuterBorderColor = window.countersOuterBorderColor
var countersInnerDividerBorder = window.countersInnerDividerBorder

var switchesBorderColor = window.switchesBorderColor
var switchesCircleColor = window.switchesCircleColor
var switchesBackgroundColor = window.switchesBackgroundColor
var switchesBorderColorEnabled = window.switchesBorderColorEnabled
var switchesCircleColorEnabled = window.switchesCircleColorEnabled
var switchesBackgroundColorEnabled = window.switchesBackgroundColorEnabled

var dotsLineColor = window.dotsLineColor

var headerFontColor = window.headerFontColor
// font-color-for-customize

function Main() {
  return (
    <Provider store={store}>
      <ThemeContext.Provider
        value={{
          ThemeProviderAppBackgroundColor,
          fontColor,
          borderRadiusesForInnerElements,
          borderRadiusesForWholeApp,
          borderColorForInnerElements,
          borderColorForOuterApp,
          carsTypeColor,
          carsTypeBorderColor,
          hoverColor,
          iconsColor,
          backAndNextButtonsColor,
          innerTextOnHover,
          inputsFontColor,
          inputsBackground,
          bookNowIconCircleBorderColor,
          bookNowIconBackgroundColor,
          bookNowIconInnerElementsColor,
          backAndNextButtonsFontColor,
          backAndNextButtonsBorderColor,
          fleetCarsBackgroundColor,
          AMPMHoverBackgroundColor,
          AMPMHoverFontColor,
          countersOuterBorderColor,
          countersInnerDividerBorder,
          switchesBorderColor,
          switchesCircleColor,
          switchesBackgroundColor,
          switchesBorderColorEnabled,
          switchesCircleColorEnabled,
          switchesBackgroundColorEnabled,
          dotsLineColor,
          headerFontColor,
        }}
      >
        <App />
      </ThemeContext.Provider>
    </Provider>
  )
}

ReactDOM.render(<Main />, document.getElementById("widget-by-bookinglane"))

reportWebVitals()
