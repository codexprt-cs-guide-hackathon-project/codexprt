import React, { useState } from 'react';

const SkillAnalysis = () => {
  const [skills, setSkills] = useState<string[]>(['']);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<
    { role: string; skills: string[] }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  const roles = [
    { role: 'Web Developer', skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'TypeScript'] },
    { role: 'Data Scientist', skills: ['Python', 'Statistics', 'Machine Learning', 'Data Analysis', 'SQL', 'R'] },
    { role: 'Mobile App Developer', skills: ['Java', 'Kotlin', 'Swift', 'React Native', 'Flutter'] },
    { role: 'Backend Developer', skills: ['Node.js', 'Express', 'Python', 'Django', 'PostgreSQL', 'MongoDB', 'REST APIs'] },
    { role: 'Frontend Developer', skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Vue.js', 'Angular'] },
    { role: 'DevOps Engineer', skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Ansible'] },
    { role: 'Data Analyst', skills: ['SQL', 'Excel', 'Tableau', 'Data Visualization', 'Power BI'] },
    { role: 'Software Engineer', skills: ['C++', 'Java', 'Python', 'Data Structures', 'Algorithms', 'System Design'] },
    { role: 'AI Engineer', skills: ['Python', 'TensorFlow', 'Keras', 'Deep Learning', 'NLP', 'Computer Vision'] },
    { role: 'Cloud Engineer', skills: ['AWS', 'Azure', 'Google Cloud', 'Cloud Computing', 'Serverless', 'IAM'] },
    { role: 'UX Designer', skills: ['User Research', 'Wireframing', 'Prototyping', 'UI Design', 'Interaction Design'] },
    { role: 'Product Manager', skills: ['Market Analysis', 'Product Strategy', 'Roadmapping', 'Agile', 'Stakeholder Management'] },
    { role: 'Security Engineer', skills: ['Penetration Testing', 'Vulnerability Assessment', 'Security Auditing', 'Cryptography', 'Network Security'] },
    { role: 'Database Administrator', skills: ['SQL Server', 'MySQL', 'PostgreSQL', 'Database Tuning', 'Backup and Recovery'] },
    { role: 'Network Engineer', skills: ['Cisco', 'Juniper', 'Routing', 'Switching', 'Network Security'] },
    { role: 'Technical Writer', skills: ['Technical Documentation', 'API Documentation', 'User Manuals', 'Content Creation'] },
    { role: 'Project Manager', skills: ['Project Planning', 'Risk Management', 'Budgeting', 'Team Leadership'] },
    { role: 'Business Analyst', skills: ['Requirements Gathering', 'Process Modeling', 'Data Analysis', 'Stakeholder Analysis'] },
    { role: 'QA Engineer', skills: ['Test Planning', 'Test Execution', 'Automation Testing', 'Bug Reporting'] },
    { role: 'Technical Support Engineer', skills: ['Troubleshooting', 'Customer Service', 'Technical Documentation'] },
    { role: 'Data Engineer', skills: ['ETL', 'Data Modeling', 'Big Data', 'Spark', 'Hadoop'] },
    { role: 'Machine Learning Engineer', skills: ['Scikit-learn', 'TensorFlow', 'PyTorch', 'Model Deployment'] },
    { role: 'Full Stack Developer', skills: ['React', 'Node.js', 'Express', 'MongoDB', 'SQL'] },
    { role: 'Game Developer', skills: ['Unity', 'C#', 'Unreal Engine', 'Game Design'] },
    { role: 'Blockchain Developer', skills: ['Solidity', 'Ethereum', 'Web3.js', 'Smart Contracts'] },
    { role: 'AR/VR Developer', skills: ['ARKit', 'ARCore', 'Unity', 'VR Development'] },
    { role: 'Embedded Systems Engineer', skills: ['C', 'C++', 'Microcontrollers', 'IoT'] },
    { role: 'Robotics Engineer', skills: ['ROS', 'Python', 'Robotics', 'AI'] },
    { role: 'Bioinformatician', skills: ['Bioinformatics', 'Genomics', 'R', 'Python'] },
    { role: 'Statistician', skills: ['Statistics', 'Data Analysis', 'R', 'SAS'] },
  ];

  const allSkills = Array.from(new Set(roles.flatMap(role => role.skills))).sort();

  const handleAddSkill = () => {
    setSkills([...skills, '']);
  };

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };

  const handleSkillSelect = (skill: string) => {
    setSkills([...skills, skill]);
  };

  const handleRemoveSkill = (index: number) => {
    if (skills.length > 1) {
      const newSkills = [...skills];
      newSkills.splice(index, 1);
      setSkills(newSkills);
    }
  };

  const handleAnalyze = async () => {
    if (skills.length === 0 || skills.every(skill => skill.trim() === '')) {
      setError('Please enter at least one skill to analyze.');
      return;
    }

    setError(null);
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Basic skill matching logic
    const matchedRoles = roles.filter((role) =>
      skills.some((skill) =>
        role.skills.some((roleSkill) =>
          roleSkill.toLowerCase() === skill.toLowerCase()
        )
      )
    );

    setResults(matchedRoles);
    setLoading(false);
  };

  const roleIcons: { [key: string]: string } = {
    'Web Developer': 'fa-globe',
    'Data Scientist': 'fa-chart-bar',
    'Mobile App Developer': 'fa-mobile-alt',
    'Backend Developer': 'fa-server',
    'Frontend Developer': 'fa-desktop',
    'DevOps Engineer': 'fa-cogs',
    'Data Analyst': 'fa-table',
    'Software Engineer': 'fa-laptop-code',
    'AI Engineer': 'fa-brain',
    'Cloud Engineer': 'fa-cloud',
    'UX Designer': 'fa-paint-brush',
    'Product Manager': 'fa-tasks',
    'Security Engineer': 'fa-shield-alt',
    'Database Administrator': 'fa-database',
    'Network Engineer': 'fa-network-wired',
    'Technical Writer': 'fa-book',
    'Project Manager': 'fa-project-diagram',
    'Business Analyst': 'fa-chart-line',
    'QA Engineer': 'fa-check-square',
    'Technical Support Engineer': 'fa-headset',
    'Data Engineer': 'fa-database',
    'Machine Learning Engineer': 'fa-robot',
    'Full Stack Developer': 'fa-code',
    'Game Developer': 'fa-gamepad',
    'Blockchain Developer': 'fa-chain',
    'AR/VR Developer': 'fa-vr-cardboard',
    'Embedded Systems Engineer': 'fa-microchip',
    'Robotics Engineer': 'fa-robot',
    'Bioinformatician': 'fa-dna',
    'Statistician': 'fa-calculator',
  };

  const roleColors = [
    'bg-red-100 dark:bg-red-700',
    'bg-green-100 dark:bg-green-700',
    'bg-blue-100 dark:bg-blue-700',
    'bg-yellow-100 dark:bg-yellow-700',
    'bg-purple-100 dark:bg-purple-700',
    'bg-pink-100 dark:bg-pink-700',
    'bg-indigo-100 dark:bg-indigo-700',
    'bg-teal-100 dark:bg-teal-700',
    'bg-orange-100 dark:bg-orange-700',
    'bg-lime-100 dark:bg-lime-700',
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
				<span style={{ color: '#3A83F6' }}>Code</span>
					  <span style={{ color: '#A855F8' }}>Xprt</span>
					  <span style={{ marginLeft: '10px' }}>Smart Skill Analysis</span>
        </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Ready to unlock your career potential? Discover roles that match your skills with our smart AI model!
      </p>
			<p className="text-gray-600 dark:text-gray-300">
        Typer your skill or select skill from the dropdown below. Enter one skill at a time and click the "+" button to add another skill.
      </p>
      <div className="flex items-center space-x-4">
        <p className="text-gray-600 dark:text-gray-300">
          Select a skill:
        </p>
        <select
          onChange={(e) => {
            handleSkillSelect(e.target.value);
            e.target.value = ''; // Reset the select after selection
          }}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Choose a skill</option>
          {allSkills.map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center">
              <input
                type="text"
                placeholder="Write your skill"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {skills.length > 1 && (
                <button
                  onClick={() => handleRemoveSkill(index)}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  X
                </button>
              )}
              {index === skills.length - 1 && (
                <button
                  onClick={handleAddSkill}
                  className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  +
                </button>
              )}
            </div>
          ))}
          {error && (
            <p className="text-red-500">{error}</p>
          )}

          <button
            onClick={handleAnalyze}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Analyze
          </button>

          {loading && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-2 mt-5" style={{ marginTop: '30px' }}>
              <h2 className="font-semibold text-gray-900 dark:text-white text-xl">
                Possible Roles:
              </h2>
              {results.map((result, index) => (
                <div key={index} className={`rounded-lg p-4 ${roleColors[index % roleColors.length]} animate-slide-in-bottom`}>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                    <i className={`fas ${roleIcons[result.role]} mr-2`}></i>
                    {result.role}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Skills: {result.skills.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillAnalysis;
