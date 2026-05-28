import './BusinessGoals.scss';

const goals = [
  "Balance guest experience with sustainable business value",
  "Enable a scalable, ML-driven AR platform across attractions",
  "Drive engagement and reduce friction during wait-time experiences",
  "Support extensibility across attractions, stories, and digital channels",
];

const BusinessGoals = () => {
  return (
    <section className="business-goals-pin">
      <div className="business-goals">
        <h2 className="business-goals__title">Business Goals</h2>
        <p className="business-goals__intro">
          The business goals for AR Storyteller aim to balance "magic" and
          measurable value while delivering immersive guest experiences with
          scalable and sustainable outcomes.
        </p>
        <ul className="business-goals__list">
          {goals.map((goal) => (
            <li key={goal}>{goal}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BusinessGoals;
