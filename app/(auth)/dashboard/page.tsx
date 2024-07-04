import React from 'react';

function Dashboard() {
  return (
    <div className="bg-teal-100 min-h-screen flex flex-col items-center">
      <header className="w-full flex justify-between items-center py-4 px-8 bg-white shadow-md">
        <div className="text-xl font-bold flex items-center">
          StudySite
        </div>
        <nav className="flex space-x-8">
          <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
          <a href="#" className="text-gray-700 hover:text-gray-900">About Us</a>
          <a href="#" className="text-gray-700 hover:text-gray-900">Contact</a>
        </nav>
        <div className="w-12"></div>
      </header>
      <main className="flex-grow flex flex-col items-center gap-5 justify-center text-center pt-12 px-4 bg-gradient-to-r from-blue-100 to-teal-100">
        <h1 className="text-4xl font-bold text-black mb-2">What do you want to do today?</h1>
        <div className="flex space-x-4">
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-600">Learn &rarr;</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600">Revision &rarr;</button>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
