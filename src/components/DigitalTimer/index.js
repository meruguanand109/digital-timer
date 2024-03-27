import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    start: false,
    isButtonsEnable: true,
    minutes: 25,
    seconds: 0,
    startMinute: 25,
  }

  onClickStart = () => {
    const {start} = this.state
    if (start) {
      this.stopTimer()
    } else {
      this.startTimer()
    }
  }

  startTimer = () => {
    this.setState({start: true, isButtonsEnable: false})
    this.intervalId = setInterval(() => {
      const {minutes, seconds} = this.state
      if (seconds > 0) {
        this.setState({seconds: seconds - 1})
      } else if (minutes > 0) {
        this.setState({minutes: minutes - 1, seconds: 59})
      } else {
        this.stopTimer()
      }
    }, 1000)
  }

  stopTimer = () => {
    clearInterval(this.intervalId)
    this.setState({start: false})
  }

  onDecrement = () => {
    const {isButtonsEnable, minutes, startMinute} = this.state
    if (isButtonsEnable) {
      this.setState({minutes: minutes - 1, startMinute: startMinute - 1})
    }
  }

  onIncrement = () => {
    const {isButtonsEnable, minutes, startMinute} = this.state
    if (isButtonsEnable) {
      this.setState({minutes: minutes + 1, startMinute: startMinute + 1})
    }
  }

  onClickReset = () => {
    const {start, startMinute} = this.state
    this.stopTimer()
    this.setState({
      startMinute: 25,
      minutes: 25,
      seconds: 0,
      isButtonsEnable: true,
    })
  }

  render() {
    const {minutes, seconds, start, startMinute} = this.state
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    const timerStatus = start ? 'Running' : 'Paused'
    return (
      <div className="container">
        <h1 className="heading">Digital Timer</h1>
        <div className="card">
          <div className="clock-container">
            <div className="clock">
              <h1 className="time">
                {stringifiedMinutes}:{stringifiedSeconds}
              </h1>
              <p className="time-status">{timerStatus}</p>
            </div>
          </div>
          <div className="clock-controls-container">
            <div className="clock-controls">
              {start ? (
                <button className="clock-btn start" onClick={this.onClickStart}>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                    alt="pause icon"
                    className="icons"
                  />
                  Pause
                </button>
              ) : (
                <button className="clock-btn start" onClick={this.onClickStart}>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                    alt="play icon"
                    className="icons"
                  />
                  Start
                </button>
              )}
              <button className="clock-btn start" onClick={this.onClickReset}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="icons"
                />
                Reset
              </button>
            </div>
            <p className="control-p">Set Timer Limit</p>
            <div className="control-buttons">
              <button className="decrement" onClick={this.onDecrement}>
                -
              </button>
              <p className="set-btn">{startMinute}</p>
              <button className="decrement" onClick={this.onIncrement}>
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
