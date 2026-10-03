import React from 'react';

const Results = ({ exam, answers, onGoHome }) => {
  let score = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  const results = exam.questions.map(q => {
    const isAnswered = answers[q.id] !== undefined && answers[q.id] !== null;
    const isCorrect = isAnswered && answers[q.id] === q.answer;
    
    if (isAnswered) {
      if (isCorrect) {
        correctCount++;
        score++;
      } else {
        incorrectCount++;
      }
    } else {
      unansweredCount++;
    }

    return {
      ...q,
      isAnswered,
      isCorrect,
      selected: answers[q.id]
    };
  });

  const percentage = Math.round((score / exam.questions.length) * 100);

  return (
    <div className="results-portal fade-in">
      <header className="results-header">
        <div className="score-card">
          <h2>Your Final Score</h2>
          <div className="score-value">
            <span className="score-earned">{score}</span>
            <span className="score-total">/ {exam.questions.length}</span>
          </div>
          <div className="score-percentage">{percentage}% Score</div>
        </div>
        <button className="back-btn" onClick={onGoHome}>Return to Exams</button>
      </header>

      <div className="results-summary">
        <div className="summary-chip correct">
          <span className="chip-label">Correct</span>
          <span className="chip-value">{correctCount}</span>
        </div>
        <div className="summary-chip incorrect">
          <span className="chip-label">Incorrect</span>
          <span className="chip-value">{incorrectCount}</span>
        </div>
        <div className="summary-chip unanswered">
          <span className="chip-label">Unanswered</span>
          <span className="chip-value">{unansweredCount}</span>
        </div>
      </div>

      <div className="results-list">
        <h3>Detailed Breakdown</h3>
        {results.map((q, idx) => {
          let cardStatusClass = 'unanswered-card';
          let statusBadge = 'Unanswered';
          if (q.isAnswered) {
            if (q.isCorrect) {
              cardStatusClass = 'correct-card';
              statusBadge = 'Correct';
            } else {
              cardStatusClass = 'incorrect-card';
              statusBadge = 'Incorrect';
            }
          }

          return (
            <div key={q.id} className={`result-card ${cardStatusClass}`}>
              <div className="result-card-header">
                <span className="result-q-number">Question {idx + 1}</span>
                <span className={`result-status-badge badge-${statusBadge.toLowerCase()}`}>
                  {statusBadge}
                </span>
              </div>
              <p className="result-q-text">{q.text}</p>
              
              <div className="result-options">
                {Object.entries(q.options).map(([key, value]) => {
                  let optionClass = 'res-option';
                  
                  if (key === q.answer) {
                    optionClass += ' res-correct-answer';
                  } else if (key === q.selected && !q.isCorrect) {
                    optionClass += ' res-wrong-answer';
                  }

                  return (
                    <div key={key} className={optionClass}>
                      <span className="res-key">{key}</span>
                      <span className="res-value">{value}</span>
                      {key === q.answer && <span className="res-icon correct-icon">✓</span>}
                      {key === q.selected && !q.isCorrect && <span className="res-icon wrong-icon">✗</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Results;

