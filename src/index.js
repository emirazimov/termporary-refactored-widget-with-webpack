import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import App from "./App"
import ThemeContext from "./context"
import store from "./Redux/redux-store"
import reportWebVitals from "./reportWebVitals"

var divForReact = document.createElement("div")

divForReact.setAttribute("id", "widget-by-bookinglane")
document.getElementsByTagName("body")[0].appendChild(divForReact)
var head = document.getElementsByTagName("head")[0]

head.innerHTML += `<link
      rel="stylesheet"
      href="https://bookinglane-widgets.s3.us-east-2.amazonaws.com/Global-widget-files/widget.css"
    />`

var ThemeProviderAppBackgroundColor = window.ThemeProviderAppBackgroundColor

var fontColor = window.fontColor

var borderRadiusesForInnerElements = window.borderRadiusesForInnerElements

var borderRadiusesForWholeApp = window.borderRadiusesForWholeApp

var borderColorForInnerElements = window.borderColorForInnerElements

var borderColorForOuterApp = window.borderColorForOuterApp

var carsTypeColor = window.carsTypeColor

var hoverColor = window.hoverColor

var iconsColor = window.iconsColor

var inputsFontColor = window.inputsFontColor

var backAndNextButtonsColor = window.backAndNextButtonsColor
var innerTextOnHover = window.innerTextOnHover
var inputsBackground = window.inputsBackground
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
          hoverColor,
          iconsColor,
          backAndNextButtonsColor,
          innerTextOnHover,
          inputsFontColor,
          inputsBackground,
        }}
      >
        <App />
      </ThemeContext.Provider>
    </Provider>
  )
}

ReactDOM.render(<Main />, document.getElementById("widget-by-bookinglane"))

reportWebVitals()
