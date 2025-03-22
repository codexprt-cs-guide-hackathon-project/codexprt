import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Copy, CheckCircle } from 'lucide-react';
import { Booking } from '../types';

const CustomPath = () => {
  const [learningGoals, setLearningGoals] = useState('');
  const [roadmap, setRoadmap] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const roadmapRef = useRef<HTMLDivElement>(null);
  const [bookingStates, setBookingStates] = useState({});
  const [professionalImages, setProfessionalImages] = useState<string[]>([
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu-vueFLYGFXdE6D7wIyatj2BSZ3pmjhrDhw&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDNkbrj0qGfTW8oeN-sf0OJt7iQNB9TAf2bQ&s',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjk4fHxtYWxlJTIwcHJvZmlsZXxlbnwwfHwwfHx8&auto=format&fit=crop&w=500&q=60',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1FR7SE9pf09zEGmHIHq_BX4g_mWghMmGxXQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmeS2JzcDrvfSWAJNdjkHmhP6jFSci4kVexA&s',
    'https://images.ctfassets.net/iuoxpp2nznvy/5KD9Wv37CoDCx6xOQjPCoo/e15c64bc88f27c71130fa0a0ac3a5a09/THUMBNAIL_GV_BOSTON_Gupta_Anika_0009_rt.jpg',
    'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmVhbCUyMGh1bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0MB88jmweMG1TI8NPou6rDlBiXradPpEp9w&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROTUhVoEQ2mwwWFf-FX_qZWKnvrUuas5Gzbg&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeuXRuNpoPeux_wf4fFN-zXY-mbwza38nkxA&s'
  ]);
  const [bookedProfessionals, setBookedProfessionals] = useState<any[]>([]);

  const professionals = [
    {
      name: 'Aarav Sharma',
      designation: 'Senior Software Engineer',
      company: 'Google',
      sessionPrice: 1500,
    },
    {
      name: 'Priya Verma',
      designation: 'Data Scientist',
      company: 'Microsoft',
      sessionPrice: 1200,
    },
    {
      name: 'Aryan Patel',
      designation: 'AI Researcher',
      company: 'OpenAI',
      sessionPrice: 1800,
    },
    {
      name: 'Diya Singh',
      designation: 'Software Architect',
      company: 'Amazon',
      sessionPrice: 1600,
    },
    {
      name: 'Rohan Kumar',
      designation: 'Machine Learning Engineer',
      company: 'Facebook',
      sessionPrice: 1400,
    },
    {
      name: 'Anika Gupta',
      designation: 'Data Analyst',
      company: 'Netflix',
      sessionPrice: 1100,
    },
    {
      name: 'Varun Reddy',
      designation: 'Product Manager',
      company: 'Apple',
      sessionPrice: 1700,
    },
    {
      name: 'Neha Joshi',
      designation: 'UX Designer',
      company: 'Airbnb',
      sessionPrice: 1300,
    },
    {
      name: 'Vikram Iyer',
      designation: 'Cloud Architect',
      company: 'Oracle',
      sessionPrice: 1900,
    },
    {
      name: 'Lakshmi Srinivasan',
      designation: 'Data Engineer',
      company: 'LinkedIn',
      sessionPrice: 2000,
    }
  ];

  useEffect(() => {
    const storedBookedProfessionals = localStorage.getItem('bookedProfessionals');
    if (storedBookedProfessionals) {
      setBookedProfessionals(JSON.parse(storedBookedProfessionals));
    }
  }, []);

  const formatRoadmap = (roadmapText: string) => {
    const sections = roadmapText.split(/(?=\n\s*\n)/);

    const formattedSections = sections.map((section, index) => {
      let formattedSection = section.trim();

      formattedSection = formattedSection.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

      formattedSection = formattedSection.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #3A83F6;">$1</a>');

      if (formattedSection.match(/^#+\s*.+/)) {
        const headingLevel = formattedSection.trim().split(' ')[0].length;
        const headingText = formattedSection.trim().substring(headingLevel).trim();
        switch (headingLevel) {
          case 1:
            return `<h1 key={index} className="text-3xl font-bold text-gray-900 dark:text-white my-4">${headingText}</h1><br/>`;
          case 2:
            return `<h2 key={index} className="text-2xl font-semibold text-gray-900 dark:text-white my-3">${headingText}</h2><br/>`;
          case 3:
            return `<h3 key={index} className="text-xl font-semibold text-gray-900 dark:text-white my-2">${headingText}</h3><br/>`;
          default:
            return `<h4 key={index} className="text-lg font-semibold text-gray-900 dark:text-white my-1">${headingText}</h4><br/>`;
        }
      } else {
        return `<p key={index} className="text-gray-800 dark:text-gray-300 my-2">${formattedSection}</p><br/>`;
      }
    });

    return formattedSections.join('');
  };

  const generateRoadmap = async () => {
    setIsLoading(true);
    setError('');
    setRoadmap('');

    const apiKey = 'PLACE_YOUR_API';

    if (!apiKey) {
      setError('Gemini API key is required.');
      setIsLoading(false);
      return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `Generate a well-formatted learning roadmap for the following topics: ${learningGoals}. The roadmap should include a structured daily learning plan, with each day range outlining specific tasks and learning objectives. For example, "Day 1-5: Learn core Java concepts". Include relevant resources (e.g., tutorials, documentation, videos) for each day range, and format them as hyperlinks in markdown. The hyperlinks should be blue.`;

    try {
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      const formattedText = formatRoadmap(responseText);
      setRoadmap(formattedText);
    } catch (e: any) {
      setError(`Error generating roadmap: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (roadmapRef.current) {
      const textToCopy = roadmapRef.current.innerText;

      try {
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            console.log('Text copied to clipboard');
          })
          .catch((err) => {
            console.error('Failed to copy text: ', err);
            fallbackCopyyTextToClipboard(textToCopy);
          });
      } catch (err) {
        console.error('Clipboard API not available: ', err);
        fallbackCopyTextToClipboard(textToCopy);
      }
    }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
  };

  const isProfessionalBooked = (professional: any) => {
    return bookedProfessionals.some(booked => booked.name === professional.name);
  };

  const bookSession = async (professional: any) => {
    setBookingStates(prevState => ({ ...prevState, [professional.name]: true }));
    setBookingSuccess(null);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setBookingStates(prevState => ({ ...prevState, [professional.name]: false }));
    setBookingSuccess({
      bookingId: '36945',
      meetingTime: '10:00 AM, Tomorrow',
      orderId: '67890',
    });

    const updatedBookedProfessionals = [...bookedProfessionals, professional];
    setBookedProfessionals(updatedBookedProfessionals);

    localStorage.setItem('bookedProfessionals', JSON.stringify(updatedBookedProfessionals));

    const newBooking: Booking = {
      bookingId: 'B' + Math.floor(Math.random() * 1000),
      professionalName: professional.name,
      meetingTime: '10:00 AM, Tomorrow',
      orderId: 'O' + Math.floor(Math.random() * 1000),
      charges: professional.sessionPrice,
    };

    const storedBookings = localStorage.getItem('bookingsData');
    let existingBookings: Booking[] = [];
    if (storedBookings) {
      existingBookings = JSON.parse(storedBookings);
    }

    const updatedBookings = [...existingBookings, newBooking];

    localStorage.setItem('bookingsData', JSON.stringify(updatedBookings));
  };

  useEffect(() => {
    if (roadmapRef.current) {
      roadmapRef.current.scrollTo(0, 0);
    }
  }, [roadmap]);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        <span style={{ color: '#3A83F6' }}>Code</span>
        <span style={{ color: '#A855F8' }}>Xprt</span>
        <span style={{ marginLeft: '10px' }}>Custom Path</span>
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Enter what you want to learn, and we'll generate a custom learning path for you!
      </p>

      <div className="flex flex-col space-y-4">
        <textarea
          className="w-full p-4 border rounded-md text-gray-800 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow shadow-sm"
          rows={4}
          placeholder="Enter what you want to learn (e.g., React, Node.js, Data Structures)..."
          value={learningGoals}
          onChange={(e) => setLearningGoals(e.target.value)}
        />

        <button
          className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
          onClick={generateRoadmap}
          disabled={isLoading}
        >
          {isLoading ? 'Generating Roadmap...' : 'Generate Roadmap'}
        </button>

        {error && <div className="text-red-500">{error}</div>}
      </div>

      {roadmap && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Generated Roadmap
          </h2>
          <div
            ref={roadmapRef}
            className="roadmap-container p-4 border rounded-md text-gray-800 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white shadow-sm overflow-auto"
            style={{ maxHeight: '400px' }}
            dangerouslySetInnerHTML={{ __html: roadmap }}
          />
          <button
            className="flex items-center py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors"
            onClick={copyToClipboard}
          >
            <Copy className="w-5 h-5 mr-2" />
            Copy Roadmap
          </button>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Book a session with a professional
        </h2>
				<p className="text-gray-600 dark:text-gray-300 mb-5">
        Need help with your roadmap? Book a session and get the best guidance!
      	</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {professionals.map((professional, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4">
              <img src={professionalImages[index]} alt={professional.name} className="w-16 h-16 rounded-full mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-left">{professional.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-left">Designation: {professional.designation}</p>
              <p className="text-gray-600 dark:text-gray-300 text-left">Company: {professional.company}</p>
              <p className="text-gray-600 dark:text-gray-300 text-left">Session Price: ₹{professional.sessionPrice}/-</p>
              <button
                className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors mt-4 ${
                  isProfessionalBooked(professional)
                    ? 'bg-green-500 hover:bg-green-600 focus:ring-green-500 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 text-white'
                }`}
                onClick={() => bookSession(professional)}
                disabled={bookingStates[professional.name] || isProfessionalBooked(professional)}
              >
                {isProfessionalBooked(professional) ? 'Booked' : bookingStates[professional.name] ? 'Booking...' : 'Book a Session'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {bookingSuccess && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 z-50" style={{ minWidth: '600px', minHeight: '300px', border: '2px solid rgba(52, 211, 16, 0.7)' }}>
          <div className="flex flex-col items-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
            <h2 className="text-4xl font-semibold text-gray-900 dark:text-white">Booking Successful!</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Booking ID: {bookingSuccess.bookingId}
              <br />
              Meeting Time: {bookingSuccess.meetingTime}
              <br />
              Order ID: {bookingSuccess.orderId}
            </p>
            <button
              className="py-3 px-5 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors"
              onClick={() => setBookingSuccess(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomPath;
