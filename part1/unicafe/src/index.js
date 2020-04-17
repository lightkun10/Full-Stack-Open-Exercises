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

  const total = good + neutral + bad
  const avg = isNaN((good - bad) / total) ? "" : (good - bad) / total
  const posPercent = isNaN(((good / total) * 100).toFixed(13)) ? "" : ((good / total) * 100).toFixed(13)

  if (total === 0) {
    return (
      <div className="container">

        <div className="feedbacks">
          <h1>give feedback</h1>
          <Button handleClick={() => voteGood()} text="good" />
          <Button handleClick={() => voteNeutral()} text="neutral" />
          <Button handleClick={() => voteBad()} text="bad" />
        </div>


        <div className="statistics">
          <h1>statistics</h1>
          <div>No feedback given</div>
        </div>

      </div>
    )
  }

  return (
    <div className="container">

      <div className="feedbacks">
        <h1>give feedback</h1>
        <Button handleClick={() => voteGood()} text="good" />
        <Button handleClick={() => voteNeutral()} text="neutral" />
        <Button handleClick={() => voteBad()} text="bad" />
      </div>


      <div className="statistics">
        <h1>statistics</h1>
        <Statistics text="good" stats={good} />
        <Statistics text="neutral" stats={neutral} />
        <Statistics text="bad" stats={bad} />

        <Statistics text="all" stats={total} />
        <Statistics text="average" stats={avg} />
        <Statistics text="positive" stats={posPercent} />
      </div>

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

const Statistics = ({ text, stats }) => {
  return (
    <div>
      {text} {stats}
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)