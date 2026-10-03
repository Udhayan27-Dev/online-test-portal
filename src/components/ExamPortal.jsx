import React, { useState, useEffect } from 'react';

const ExamPortal = ({ exam, answers, setAnswers, visited, setVisited, onSubmit, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mobileGridPage, setMobileGridPage] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    setMobileGridPage(Math.floor(currentIndex / 5));
  }, [currentIndex]);

  const currentQuestion = exam.questions[currentIndex];

  useEffect(() => {
    // Mark current question as visited
    if (currentQuestion && !visited[currentQuestion.id]) {
      setVisited(prev => ({ ...prev, [currentQuestion.id]: true }));
    }
  }, [currentIndex, currentQuestion, visited, setVisited]);

  const handleOptionSelect = (optionKey) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: optionKey
    });
  };

  const handleNext = () => {
    if (currentIndex < exam.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const answeredCount = exam.questions.filter(q => answers[q.id] !== undefined && answers[q.id] !== null).length;
  const unansweredCount = exam.questions.length - answeredCount;

  const handleOpenSubmitModal = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = () => {
    setShowConfirmModal(false);
    onSubmit();
  };

  const getStatusClass = (question) => {
    if (exam.questions[currentIndex].id === question.id) return 'status-current';
    if (answers[question.id]) return 'status-saved';
    if (visited[question.id]) return 'status-not-saved';
    return 'status-not-attended';
  };

  return (
    <div className="exam-portal fade-in">
      <header className="exam-header">
        <div className="exam-header-left">
          <button className="back-btn" onClick={onBack}>&larr; Back to Exams</button>
          <h2>{exam.title}</h2>
        </div>
        <div className="exam-header-right">
          <button 
            className="submit-btn enabled"
            onClick={handleOpenSubmitModal}
          >
            Submit Exam
          </button>
        </div>
      </header>

      <div className="exam-content">
        <div className="main-question-area">
          <div className="question-card">
            <div className="question-number">Question {currentIndex + 1} of {exam.questions.length}</div>
            <h3 className="question-text">{currentQuestion.text}</h3>
            
            <div className="options-list">
              {Object.entries(currentQuestion.options).map(([key, value]) => {
                const isSelected = answers[currentQuestion.id] === key;
                return (
                  <div 
                    key={key} 
                    className={`option-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleOptionSelect(key)}
                  >
                    <span className="option-key">{key}</span>
                    <span className="option-value">{value}</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="exam-actions">
            <button 
              className="nav-btn prev-btn" 
              onClick={handlePrev} 
              disabled={currentIndex === 0}
            >
              Previous
            </button>
            <button 
              className="nav-btn next-btn" 
              onClick={handleNext} 
              disabled={currentIndex === exam.questions.length - 1}
            >
              Next
            </button>
          </div>
        </div>

        <aside className="exam-sidebar">
          <div className="status-legend">
            <div className="legend-item"><span className="indicator status-current"></span> Current</div>
            <div className="legend-item"><span className="indicator status-saved"></span> Saved</div>
            <div className="legend-item"><span className="indicator status-not-saved"></span> Not Saved</div>
            <div className="legend-item"><span className="indicator status-not-attended"></span> Not Attended</div>
          </div>
          <div className="sidebar-grid-wrapper">
            <button 
              className="mobile-grid-nav" 
              onClick={() => setMobileGridPage(Math.max(0, mobileGridPage - 1))}
              disabled={mobileGridPage === 0}
            >
              &lt;
            </button>
            <div className="question-grid">
              {exam.questions.map((q, idx) => {
                const isVisibleOnMobile = Math.floor(idx / 5) === mobileGridPage;
                return (
                  <div 
                    key={q.id} 
                    className={`grid-cell ${getStatusClass(q)} ${isVisibleOnMobile ? 'mobile-visible' : 'mobile-hidden'}`}
                    onClick={() => setCurrentIndex(idx)}
                  >
                    {q.id}
                  </div>
                );
              })}
            </div>
            <button 
              className="mobile-grid-nav" 
              onClick={() => setMobileGridPage(Math.min(Math.ceil(exam.questions.length / 5) - 1, mobileGridPage + 1))}
              disabled={mobileGridPage === Math.ceil(exam.questions.length / 5) - 1}
            >
              &gt;
            </button>
          </div>
        </aside>
      </div>

      {showConfirmModal && (
        <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
          <div className="modal-content fade-in" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Submit Exam</h3>
              <button className="modal-close-btn" onClick={() => setShowConfirmModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <p className="modal-desc">Are you sure you want to submit your exam?</p>
              <div className="modal-stats">
                <div className="modal-stat-card total">
                  <span className="stat-label">Total Questions</span>
                  <span className="stat-value">{exam.questions.length}</span>
                </div>
                <div className="modal-stat-card answered">
                  <span className="stat-label">Answered</span>
                  <span className="stat-value">{answeredCount}</span>
                </div>
                <div className="modal-stat-card unanswered">
                  <span className="stat-label">Unanswered</span>
                  <span className="stat-value">{unansweredCount}</span>
                </div>
              </div>
              {unansweredCount > 0 && (
                <div className="modal-warning">
                  ⚠️ You have <strong>{unansweredCount}</strong> unanswered question{unansweredCount > 1 ? 's' : ''}. You can still resume your exam to answer them.
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="modal-btn cancel-btn" onClick={() => setShowConfirmModal(false)}>
                Resume Exam
              </button>
              <button className="modal-btn submit-confirm-btn" onClick={handleConfirmSubmit}>
                Confirm & Reveal Marks
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamPortal;

