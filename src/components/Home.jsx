import React from 'react';

const Home = ({ exams, onSelectExam }) => {
  return (
    <div className="home-container fade-in">
      <header className="home-header">
        <h1>Online Test Portal</h1>
        <p>Select an exam to begin your assessment.</p>
      </header>
      
      <div className="exam-grid">
        {exams.map((exam) => (
          <div key={exam.id} className="exam-card" onClick={() => onSelectExam(exam)}>
            <div className="exam-card-content">
              <h2>{exam.title}</h2>
              <span className="exam-meta">{exam.questions.length} Questions</span>
            </div>
            <div className="exam-card-action">
              <span>Start Exam</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
