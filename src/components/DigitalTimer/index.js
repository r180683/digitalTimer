// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {timeRunning: false, timeLimit: 25, minutes: 25, seconds: 0}

  tick = () => {
    const {minutes, seconds} = this.state
    if (seconds > 0) {
      this.setState({seconds: seconds - 1})
    } else {
      this.setState({minutes: minutes - 1, seconds: 59})
    }
  }

  startOrPauseBtnClick = () => {
    const {timeRunning, minutes, seconds} = this.state
    if ((minutes * 60 === seconds) === 0) {
      this.setState({minutes: 0, seconds: 0})
    }
    if (!timeRunning) {
      this.timerId = setInterval(this.tick, 1)
      this.setState(prevState => ({timeRunning: !prevState.timeRunning}))
    } else {
      clearInterval(this.timerId)
      this.setState(prevState => ({timeRunning: !prevState.timeRunning}))
    }
  }

  resetBtnClick = () => {
    clearInterval(this.timerId)
    this.setState({timeRunning: false, timeLimit: 25, minutes: 25, seconds: 0})
  }

  DecreaseTimeLimit = () => {
    const {timeLimit} = this.state
    this.setState({timeLimit: timeLimit - 1, minutes: timeLimit - 1})
  }

  IncreaseTimeLimit = () => {
    const {timeLimit} = this.state
    this.setState({timeLimit: timeLimit + 1, minutes: timeLimit + 1})
  }

  render() {
    const {timeRunning, timeLimit, minutes, seconds} = this.state
    const playPauseImgUrl = timeRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const playPauseUrlAlt = timeRunning ? 'pause icon' : 'play icon'
    const timeStatus = timeRunning ? 'Running' : 'Paused'
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return (
      <div className="app-container">
        <h1 className="dt-head">Digital Timer</h1>
        <div className="dt-container">
          <div className="timer-container">
            <div className="timer-running-container">
              <p className="timer">
                {stringifiedMinutes}:{stringifiedSeconds}
              </p>
              <p className="time-status">{timeStatus}</p>
            </div>
          </div>
          <div className="timer-options-container">
            <div className="start-reset-container">
              <button
                onClick={this.startOrPauseBtnClick}
                type="button"
                className="icon-btn "
              >
                <img
                  className="icon-image"
                  alt={playPauseUrlAlt}
                  src={playPauseImgUrl}
                />
              </button>
              <p className="icon-text">{timeRunning ? 'Pause' : 'Start'}</p>
              <button
                onClick={this.resetBtnClick}
                type="button"
                className="icon-btn "
              >
                <img
                  className="icon-image"
                  alt="reset"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
                />
              </button>
              <p className="icon-text">Reset</p>
            </div>
            <p className="set-timer-description">Set Timer limit</p>
            <div className="inc-dec-time-container">
              <button
                onClick={this.DecreaseTimeLimit}
                type="button"
                className="inc-button"
              >
                -
              </button>
              <button type="button" className="number-btn">
                {timeLimit}
              </button>
              <button
                onClick={this.IncreaseTimeLimit}
                type="button"
                className="inc-button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
