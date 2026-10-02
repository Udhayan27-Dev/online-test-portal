import { useState } from 'react';
import examsData from './data/exams.json';
import Home from './components/Home';
import ExamPortal from './components/ExamPortal';
import Results from './components/Results';
import './index.css';

function App() {
  const [currentExam, setCurrentExam] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState({});
  const [visited, setVisited] = useState({});

  const startExam = (exam) => {
    setCurrentExam(exam);
    setAnswers({});
    setVisited({});
    setShowResults(false);
  };

  const submitExam = () => {
    setShowResults(true);
  };

  const goHome = () => {
    setCurrentExam(null);
    setShowResults(false);
    setAnswers({});
    setVisited({});
  };

  return (
    <div className="app-container">
      {!currentExam && (
        <Home exams={examsData} onSelectExam={startExam} />
      )}
      {currentExam && !showResults && (
        <ExamPortal
          exam={currentExam}
          answers={answers}
          setAnswers={setAnswers}
          visited={visited}
          setVisited={setVisited}
          onSubmit={submitExam}
          onBack={goHome}
        />
      )}
      {currentExam && showResults && (
        <Results 
          exam={currentExam} 
          answers={answers} 
          onGoHome={goHome} 
        />
      )}
    </div>
  );
}

export default App;
