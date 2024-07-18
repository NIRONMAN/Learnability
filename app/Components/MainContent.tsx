import React from 'react';

const MainContent: React.FC = () => {
  return (
    <div className="flex flex-col items-center mt-10 text-center">
      <h1 className="text-4xl font-bold text-white">Learnability</h1>
      <h2 className="text-2xl text-white mb-6">Ability to learn</h2>
      <p className="text-white mb-10">Quickly upload your PDFs to receive detailed summaries and practice questions.</p>
      <button className="bg-gray-700 text-white px-6 py-2 rounded-full hover:bg-gray-500">Get Started</button>
    </div>
  );
};

export default MainContent;
