import React, { useState } from 'react';
import { usePDF } from 'react-to-pdf';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PlusCircle, MinusCircle, Github, Linkedin, Mail, Phone, Download } from 'lucide-react';
import { motion } from 'framer-motion'; // Import motion
// Types
interface ResumeData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  education: Education[];
  certificates: Certificate[];
  projects: Project[];
  experience: Experience[];
  skills: string[];
  achievements: string[];
}

interface Education {
  institution: string;
  degree: string;
  field: string;
  year: string;
  gpa?: string;
}

interface Certificate {
  name: string;
  issuer: string;
  date: string;
}

interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string[];
}

// Modified Gemini API integration to handle markdown-formatted responses
async function enhanceResume(resumeData: ResumeData) {
  const genAI = new GoogleGenerativeAI('PLACE_YOUR_API');
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
    Enhance this resume content while maintaining truthfulness and original information. 
    Improve language, make achievements more impactful, and optimize for ATS systems.
    Return only a JSON object with no markdown formatting, no backticks, and no explanations.
    The JSON must have exactly this structure:
    {
      "enhancedResume": {
        // Enhanced resume data with the same structure as input
      },
      "atsScore": number between 0 and 100
    }

    Resume to enhance:
    ${JSON.stringify(resumeData, null, 2)}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    try {
      // Remove any markdown formatting or backticks if present
      const cleanedText = text.replace(/\`\`\`json|\`\`\`|\`/g, '').trim();
      const parsedResponse = JSON.parse(cleanedText);
      
      if (!parsedResponse.enhancedResume || typeof parsedResponse.atsScore !== 'number') {
        throw new Error('Invalid response structure');
      }
      
      return parsedResponse;
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError);
      return {
        enhancedResume: resumeData,
        atsScore: 70
      };
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return {
      enhancedResume: resumeData,
      atsScore: 70
    };
  }
}

// Resume Component
function Resume({ data, enhancedData, atsScore }: { data: ResumeData; enhancedData?: ResumeData; atsScore?: number }) {
  const displayData = enhancedData || data;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-800 shadow-lg" id="resume">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
					  <span style={{ color: '#3A83F6' }}>Code</span>
					  <span style={{ color: '#A855F8' }}>Xprt</span>
					  <span style={{ marginLeft: '10px' }}>Resume Builder</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-6">
        Craft a professional resume that highlights your skills and experience.
      </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold border-b-2 border-gray-300 dark:border-gray-700 mb-3 text-gray-900 dark:text-gray-100">Experience</h2>
        {displayData.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{exp.position}</h3>
              <span className="text-gray-600 dark:text-gray-300">{exp.startDate} - {exp.endDate}</span>
            </div>
            <div className="text-gray-700 dark:text-gray-300 mb-2">{exp.company}</div>
            <ul className="list-disc list-inside">
              {exp.description.map((desc, i) => (
                <li key={i} className="text-gray-600 dark:text-gray-300">{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold border-b-2 border-gray-300 dark:border-gray-700 mb-3 text-gray-900 dark:text-gray-100">Education</h2>
        {displayData.education.map((edu, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{edu.institution}</h3>
              <span className="text-gray-600 dark:text-gray-300">{edu.year}</span>
            </div>
            <div className="text-gray-700 dark:text-gray-300">{edu.degree} in {edu.field}</div>
            {edu.gpa && <div className="text-gray-600 dark:text-gray-300">GPA: {edu.gpa}</div>}
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold border-b-2 border-gray-300 dark:border-gray-700 mb-3 text-gray-900 dark:text-gray-100">Projects</h2>
        {displayData.projects.map((project, index) => (
          <div key={index} className="mb-3">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {project.name}
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 ml-2 text-sm">
                  (View Project)
                </a>
              )}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-1">{project.description}</p>
            <p className="text-gray-700 dark:text-gray-300 text-sm">Technologies: {project.technologies.join(', ')}</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold border-b-2 border-gray-300 dark:border-gray-700 mb-3 text-gray-900 dark:text-gray-100">Skills</h2>
        <p className="text-gray-700 dark:text-gray-300">{displayData.skills.join(', ')}</p>
      </div>

      {displayData.achievements.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold border-b-2 border-gray-300 dark:border-gray-700 mb-3 text-gray-900 dark:text-gray-100">Achievements</h2>
          <ul className="list-disc list-inside">
            {displayData.achievements.map((achievement, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300">{achievement}</li>
            ))}
          </ul>
        </div>
      )}

      {atsScore !== undefined && (
        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded">
          <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">ATS Score</h2>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${atsScore}%` }}
              ></div>
            </div>
            <span className="ml-4 font-semibold text-gray-900 dark:text-gray-100">{atsScore}%</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Main ResumeBuilder Component
const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [enhancedData, setEnhancedData] = useState<ResumeData | null>(null);
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const { toPDF, targetRef } = usePDF({
    filename: 'resume.pdf'
  });

  const [formData, setFormData] = useState<ResumeData>({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    education: [{ institution: '', degree: '', field: '', year: '' }],
    certificates: [{ name: '', issuer: '', date: '' }],
    projects: [{ name: '', description: '', technologies: [] }],
    experience: [{ company: '', position: '', startDate: '', endDate: '', description: [''] }],
    skills: [],
    achievements: []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field: keyof ResumeData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value.split(',').map(item => item.trim())
    }));
  };

  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const handleProjectChange = (index: number, field: keyof Project, value: string) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === index ? { ...proj, [field]: field === 'technologies' ? value.split(',').map(t => t.trim()) : value } : proj
      )
    }));
  };

  const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: field === 'description' ? value.split('\n') : value } : exp
      )
    }));
  };

  const addItem = (field: 'education' | 'certificates' | 'projects' | 'experience') => {
    const emptyItems = {
      education: { institution: '', degree: '', field: '', year: '' },
      certificates: { name: '', issuer: '', date: '' },
      projects: { name: '', description: '', technologies: [] },
      experience: { company: '', position: '', startDate: '', endDate: '', description: [''] }
    };

    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], emptyItems[field]]
    }));
  };

  const removeItem = (field: 'education' | 'certificates' | 'projects' | 'experience', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResumeData(formData);
    
    try {
      const enhanced = await enhanceResume(formData);
      setEnhancedData(enhanced.enhancedResume);
      setAtsScore(enhanced.atsScore);
    } catch (error) {
      console.error('Error enhancing resume:', error);
      setEnhancedData(null);
      setAtsScore(null);
    }
    
    setLoading(false);
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 animate-fade-in"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto py-6 px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
					  <span style={{ color: '#3A83F6' }}>Code</span>
					  <span style={{ color: '#A855F8' }}>Xprt</span>
					  <span style={{ marginLeft: '10px' }}>Resume Builder</span>
        </h1>
				<p className="text-gray-600 dark:text-gray-300 mt-2">
        Craft a professional resume that highlights your skills and experience.
      </p>
      </div>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {!resumeData ? (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
                <input
                  type="url"
                  name="linkedin"
                  placeholder="LinkedIn URL"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="input-field"
                />
                <input
                  type="url"
                  name="github"
                  placeholder="GitHub URL"
                  value={formData.github}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Education</h2>
                <button
                  type="button"
                  onClick={() => addItem('education')}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <PlusCircle className="w-6 h-6" />
                </button>
              </div>
              {formData.education.map((edu, index) => (
                <div key={index} className="relative grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => removeItem('education', index)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  >
                    <MinusCircle className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                    className="input-field"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                    className="input-field"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Field of Study"
                    value={edu.field}
                    onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                    className="input-field"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Year"
                    value={edu.year}
                    onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Experience</h2>
                <button
                  type="button"
                  onClick={() => addItem('experience')}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <PlusCircle className="w-6 h-6" />
                </button>
              </div>
              {formData.experience.map((exp, index) => (
                <div key={index} className="relative grid grid-cols-1 gap-4 p-4 border rounded dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => removeItem('experience', index)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  >
                    <MinusCircle className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                    className="input-field"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Position"
                    value={exp.position}
                    onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                    className="input-field"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Start Date"
                      value={exp.startDate}
                      onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                      className="input-field"
                      required
                    />
                    <input
                      type="text"
                      placeholder="End Date"
                      value={exp.endDate}
                      onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>
                  <textarea
                    placeholder="Description (separate points with new lines)"
                    value={exp.description.join('\n')}
                    onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                    className="input-field min-h-[100px]"
                    required
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Projects</h2>
                <button
                  type="button"
                  onClick={() => addItem('projects')}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <PlusCircle className="w-6 h-6" />
                </button>
              </div>
              {formData.projects.map((proj, index) => (
                <div key={index} className="relative grid grid-cols-1 gap-4 p-4 border rounded dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => removeItem('projects', index)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                  >
                    <MinusCircle className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    placeholder="Project Name"
                    value={proj.name}
                    onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                    className="input-field"
                    required
                  />
                  <textarea
                    placeholder="Project Description"
                    value={proj.description}
                    onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                    className="input-field"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Technologies (comma-separated)"
                    value={proj.technologies.join(', ')}
                    onChange={(e) => handleProjectChange(index, 'technologies', e.target.value)}
                    className="input-field"
                    required
                  />
                  <input
                    type="url"
                    placeholder="Project Link (optional)"
                    value={proj.link || ''}
                    onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                    className="input-field"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Skills & Achievements</h2>
              <textarea
                placeholder="Skills (comma-separated)"
                value={formData.skills.join(', ')}
                onChange={(e) => handleArrayChange('skills', e.target.value)}
                className="input-field"
                required
              />
              <textarea
                placeholder="Achievements (comma-separated)"
                value={formData.achievements.join(', ')}
                onChange={(e) => handleArrayChange('achievements', e.target.value)}
                className="input-field"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              Generate Resume
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <>
                <div className="flex justify-end">
                  <button
                    onClick={() => toPDF()}
                    className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download PDF
                  </button>
                </div>
                <div ref={targetRef}>
                  <Resume
                    data={resumeData}
                    enhancedData={enhancedData}
                    atsScore={atsScore !== null ? atsScore : undefined}
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      setResumeData(null);
                      setEnhancedData(null);
                      setAtsScore(null);
                    }}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                  >
                    Create New Resume
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </motion.div>
  );
}

export default ResumeBuilder;

const inputStyle = {
  base: "w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow shadow-sm",
  error: "border-red-500 focus:ring-red-500"
};
