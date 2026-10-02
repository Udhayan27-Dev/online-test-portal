import React from 'react';

const Results = ({ exam, answers, onGoHome }) => {
  let score = 0;
  
  const results = exam.questions.map(q => {
    const isCorrect = answers[q.id] === q.answer;
    if (isCorrect) score++;
    
    return {
      ...q,
      isCorrect,
      selected: answers[q.id]
    };
  });

  return (
    <div className="results-portal fade-in">
      <header className="results-header">
        <div className="score-card">
          <h2>Your Score</h2>
          <div className="score-value">
            <span className="score-earned">{score}</span>
            <span className="score-total">/ {exam.questions.length}</span>
          </div>
        </div>
        <button className="back-btn" onClick={onGoHome}>Return to Exams</button>
      </header>

      <div className="results-list">
        <h3>Detailed Breakdown</h3>
        {results.map((q, idx) => (
          <div key={q.id} className={`result-card ${q.isCorrect ? 'correct-card' : 'incorrect-card'}`}>
            <div className="result-q-number">Question {idx + 1}</div>
            <p className="result-q-text">{q.text}</p>
            
            <div className="result-options">
              {Object.entries(q.options).map(([key, value]) => {
                let optionClass = 'res-option';
                
                if (key === q.answer) {
                  optionClass += ' res-correct-answer'; // Always show the correct answer
                } else if (key === q.selected && !q.isCorrect) {
                  optionClass += ' res-wrong-answer'; // Highlight the wrong selection
                }

                return (
                  <div key={key} className={optionClass}>
                    <span className="res-key">{key}</span>
                    <span className="res-value">{value}</span>
                    {key === q.answer && <span className="res-icon">✓</span>}
                    {key === q.selected && !q.isCorrect && <span className="res-icon">✗</span>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
