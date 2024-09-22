"use client"
import React, { useState } from 'react';
import { Upload } from 'lucide-react';

export default function ChatInterface() {
    const [pdfFile, setPdfFile] = useState(null);
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const [question, setQuestion] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setPdfFile(file);
        } else {
            alert('Please select a PDF file.');
        }
    };

    const handleUpload = async () => {
        if (!pdfFile) {
            alert('Please select a PDF file first.');
            return;
        }

        setIsLoading(true);

        const reader = new FileReader();
        reader.onload = async (e) => {
            const base64Pdf = e.target.result;

            try {
                const response = await fetch('/api/Rag2', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ pdf: base64Pdf }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                if (data.contentSet) {
                    setIsUploaded(true);
                    setResponse('PDF uploaded successfully');
                } else {
                    setResponse('Failed to upload PDF');
                }
            } catch (error) {
                console.error('Error:', error);
                setResponse('Error occurred while uploading the PDF');
            } finally {
                setIsLoading(false);
            }
        };

        reader.readAsDataURL(pdfFile);
    };

    const handleAskQuestion = async () => {
        if (!isUploaded) {
            alert('Please upload a PDF first.');
            return;
        }

        if (!question.trim()) {
            alert('Please enter a question.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/Rag', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setResponse(data.message || 'No answer from server');
        } catch (error) {
            console.error('Error:', error);
            setResponse('Error occurred while processing the question');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <div className=' dark:text-white'>Hello there, <br></br>This mode is work in Progress toggle light mode for better visibility.<br></br>Upload a pdf here to see Retrival Augmented Generation Demo.Also you can ask it about the PPT.<br></br>Thanks for trying our Product.</div>
            <h1 className="text-2xl font-bold mb-4 text-center">PDF Q&A System</h1>
            <div className="mb-4">
                <label htmlFor="pdf-upload" className="block mb-2 font-semibold">
                    Upload PDF:
                </label>
                <div className="flex items-center">
                    <input
                        type="file"
                        id="pdf-upload"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <label
                        htmlFor="pdf-upload"
                        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600"
                    >
                        <Upload className="mr-2" />
                        {pdfFile ? pdfFile.name : 'Choose PDF'}
                    </label>
                </div>
            </div>
            <button
                onClick={handleUpload}
                disabled={!pdfFile || isLoading}
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed mb-4"
            >
                {isLoading ? 'Uploading...' : 'Upload PDF'}
            </button>
            {isUploaded && (
                <div className="mb-4">
                    <label htmlFor="question" className="block mb-2 font-semibold">
                        Ask a question:
                    </label>
                    <input
                        type="text"
                        id="question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Enter your question here"
                    />
                </div>
            )}
            {isUploaded && (
                <button
                    onClick={handleAskQuestion}
                    disabled={isLoading || !question.trim()}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Processing...' : 'Ask Question'}
                </button>
            )}
            {response && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                    <h2 className="font-semibold mb-2">Response:</h2>
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
}