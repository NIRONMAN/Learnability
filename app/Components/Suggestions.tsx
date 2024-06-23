import React from 'react';
import { useSuggestions } from './SuggestionsContext';

const Suggestions: React.FC = () => {
    const { currentSuggestions } = useSuggestions();

    return (
        <div className="suggestions">
            {currentSuggestions ? (
                <div>
                    {currentSuggestions.totalQuestions !== undefined && (
                        <div>Total Questions: {currentSuggestions.totalQuestions}</div>
                    )}
                    {currentSuggestions.currentQuestion !== undefined && (
                        <div>Current Question: {currentSuggestions.currentQuestion}</div>
                    )}
                    {currentSuggestions.questionsInTopic !== undefined && (
                        <div>Questions in Topic: {currentSuggestions.questionsInTopic}</div>
                    )}
                    {currentSuggestions.questionsTackled !== undefined && (
                        <div>Questions Tackled: {currentSuggestions.questionsTackled}</div>
                    )}
                </div>
            ) : (
                <div>No suggestions available</div>
            )}
        </div>
    );
};

export default Suggestions;
