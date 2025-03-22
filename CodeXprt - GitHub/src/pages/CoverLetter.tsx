import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileText, Loader2, Copy, CheckCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'PLACE_YOUR_API';
const genAI = new GoogleGenerativeAI(API_KEY);

interface FormData {
  name: string;
  age: string;
  qualifications: string;
  experience: string;
  company: string;
  position: string;
}

function CoverLetter() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    qualifications: '',
    experience: '',
    company: '',
    position: ''
  });
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const coverLetterRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const generateCoverLetter = async () => {
    if (!formData.name || !formData.company || !formData.position) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      
      const prompt = `Generate a highly professional cover letter content for a job application. Focus on creating compelling body paragraphs that showcase the candidate's qualifications and enthusiasm.

Details:
- Candidate: ${formData.name} (${formData.age} years old)
- Position: ${formData.position}
- Company: ${formData.company}
- Experience: ${formData.experience} years
- Qualifications: ${formData.qualifications}

The response should be formal, engaging, and highlight specific qualifications and enthusiasm for the role. Focus on creating impactful content that demonstrates value to the employer.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const mainContent = response.text();

      // Format the complete cover letter with proper headers and footers
      const today = formatDate(new Date());
      const formattedLetter = `${formData.name}
${formData.qualifications.split(',')[0]}
Phone: [Your Phone Number]
Email: [Your Email]

${today}

Hiring Manager
${formData.company}
[Company Address]
[City, State ZIP]

Dear Hiring Manager,

Dear Hiring Manager,

${mainContent}

Sincerely,
${formData.name}`;

      setCoverLetter(formattedLetter);
      toast.success('Cover letter generated successfully!');
    } catch (error) {
      toast.error('Failed to generate cover letter. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (coverLetterRef.current) {
      const textToCopy = coverLetterRef.current.innerText;
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          setCopySuccess(true);
          toast.success('Cover letter copied to clipboard!');
          setTimeout(() => setCopySuccess(false), 3000);
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
          toast.error('Failed to copy cover letter. Please try again.');
        });
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 animate-fade-in"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Toaster position="top-right" />
      <div className="w-full">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          <span style={{ color: '#3A83F6' }}>Code</span>
          <span style={{ color: '#A855F8' }}>Xprt</span>
          <span style={{ marginLeft: '10px' }}>Cover Letter Generator</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="25"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Qualifications</label>
              <textarea
                name="qualifications"
                value={formData.qualifications}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="B.Tech in Computer Science, Relevant certifications..."
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Years of Experience</label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name *</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Google"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Position *</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Senior Software Engineer"
              />
            </div>

            <button
              onClick={generateCoverLetter}
              disabled={loading}
              className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors w-full"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </div>
              ) : (
                'Generate Cover Letter'
              )}
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-300">Generated Cover Letter</h2>
              <button
                onClick={copyToClipboard}
                disabled={!coverLetter}
                className={`flex items-center gap-2 text-purple-600 hover:text-purple-700 ${!coverLetter ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Copy className="w-4 h-4" />
                Copy
              </button>
              {copySuccess && (
                <span className="text-green-500">
                  <CheckCircle className="w-4 h-4" />
                </span>
              )}
            </div>
            <div
              ref={coverLetterRef}
              className="bg-white dark:bg-gray-700 p-6 rounded-lg min-h-[300px] border border-gray-200 dark:border-gray-700 font-mono text-sm whitespace-pre-wrap"
            >
              <p className="text-gray-800 dark:text-gray-300">{coverLetter || 'Your cover letter will appear here...'}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CoverLetter;
