import { useState } from "react";

function UserFeedbackContainer({
  increaseGoodValue,
  increaseNeutralValue,
  increaseBadValue,
}) {
  return (
    <div>
      <h1>Give Feedback</h1>
      <FeedbackButton increaseValue={increaseGoodValue} text={"Good"} />
      <FeedbackButton increaseValue={increaseNeutralValue} text={"Neutral"} />
      <FeedbackButton increaseValue={increaseBadValue} text={"Bad"} />
    </div>
  );
}

function FeedbackButton({ increaseValue, text }) {
  return <button onClick={increaseValue}>{text}</button>;
}

function Statistics({ goodValue, neutralValue, badValue }) {
  let totalValue = goodValue + neutralValue + badValue;

  if (totalValue) {
    let averageScore = (goodValue - badValue) / totalValue,
      positivePercentage = goodValue / totalValue;

    return (
      <div>
        <h1>Statistics</h1>
        <table>
          <StatisticLine text={"Good: "} value={goodValue} />
          <StatisticLine text={"Neutral: "} value={neutralValue} />
          <StatisticLine text={"Bad: "} value={badValue} />
          <StatisticLine text={"Total: "} value={totalValue} />
          <StatisticLine text={"Average: "} value={averageScore} />
          <StatisticLine text={"Positive: "} value={positivePercentage} />
        </table>
      </div>
    );
  }

  return (
    <div>
      <h1>Statistics</h1>
      <div>No feedback given</div>
    </div>
  );
}

function StatisticLine({ text, value }) {
  return <tr>{text + value}</tr>;
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseGoodValue = () => setGood(good + 1);
  const increaseNeutralValue = () => setNeutral(neutral + 1);
  const increaseBadValue = () => setBad(bad + 1);
  return (
    <div>
      <UserFeedbackContainer
        increaseGoodValue={increaseGoodValue}
        increaseNeutralValue={increaseNeutralValue}
        increaseBadValue={increaseBadValue}
      />
      <Statistics goodValue={good} neutralValue={neutral} badValue={bad} />
    </div>
  );
};

export default App;
