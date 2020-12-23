import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const voteGood = () => setGood(good + 1)
  const voteNeutral = () => setNeutral(neutral + 1)
  const voteBad = () => setBad(bad + 1)

  return (
    <div className="container">

      <div className="feedbacks">
        <h1>give feedback</h1>
        <Button handleClick={() => voteGood()} text="good" />
        <Button handleClick={() => voteNeutral()} text="neutral" />
        <Button handleClick={() => voteBad()} text="bad" />
      </div>


      <div className="statistics-section">
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>

    </div>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const avg = isNaN((good - bad) / total) ? "" : (good - bad) / total
  const posPercent = isNaN(((good / total) * 100).toFixed(13)) ? "" : ((good / total) * 100).toFixed(13)

  if (total === 0) {
    return (
      <div className="statistics">no feedback given</div>
    )
  }

  return (
    <div className="statistics">
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />

      <Statistic text="all" value={total} />
      <Statistic text="average" value={avg} />
      <Statistic text="positive" value={posPercent} />
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistic = ({ text, value }) => {
  return (
    <div>
      {text} {value}
    </div>
  )
}


ReactDOM.render(<App />,
  document.getElementById('root')
)