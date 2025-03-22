import React, { useEffect, useState } from 'react';
import { 
  Code2, 
  Shield, 
  Smartphone, 
  Users, 
  Brain, 
  FileCode2, 
  FileText, 
  Calendar,
  MessageSquare,
  Bot,
  Gamepad,
  Cloud,
  Database,
  Terminal,
  Cpu,
  Globe,
  Award,
  TrendingUp,
  CheckCircle,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';


// Tailwind Config
const tailwindConfig = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
      colors: {
        primary: {
          900: '#1a103c',
          800: '#251454',
          700: '#2f1a6c',
          600: '#3b2184',
          500: '#47289c',
        },
        accent: {
          pink: '#FF49DB',
          purple: '#7928CA',
          blue: '#0070F3',
          cyan: '#00DFD8',
        },
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      },
    },
  },
  plugins: [],
};

function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleExploreRoadmapsClick = () => {
    navigate('/welcome');
  };

  const handleWelcomeClick = () => {
    navigate('/welcome');
  };

  const imageSources = [
    "https://www.simplilearn.com/ice9/free_resources_article_thumb/How-to-become-a-complete-Web-Development-Professional.jpg",
    "https://learn.microsoft.com/en-us/training/media/career-paths/developer/Azure%20Developer.png?auto=format&fit=crop&w=100&h=100",
    "https://bairesdev.mo.cloudinary.net/blog/2022/08/portrait-of-a-man-using-a-computer-in-a-modern-office-picture-id1344688156-1.jpg?tx=w_1920,q_auto",
    "https://t3.ftcdn.net/jpg/06/32/91/32/360_F_632913287_pyej35IPG2tnAcqVxlD5QGlsJKUAYMhP.jpg"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-primary-900 relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/90 to-primary-900"></div>
        
        <nav className="container mx-auto px-6 py-6 absolute top-0 left-0 right-0 z-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Code2 className="h-8 w-8 text-accent-purple" />
              <span className="ml-2 text-2xl font-bold text-white">CodeXprt</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#roadmaps" className="text-gray-300 hover:text-white transition-colors">Roadmaps</a>
              <a href="#tools" className="text-gray-300 hover:text-white transition-colors">Tools</a>
              <button 
                onClick={handleWelcomeClick}
                className="bg-accent-purple text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-all transform hover:scale-105"
              >
                Get Started
              </button>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-6 relative z-10 mt-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 slide-in" style={{ opacity: isVisible ? 1 : 0 }}>
              <h1 className="text-4xl md:text-7xl font-bold text-white leading-tight mb-6">
                Master Your <span className="gradient-text">Tech Journey</span> with Expert Guidance
              </h1>
              <p className="mt-8 text-xl text-gray-300 leading-relaxed mr-5">
                Choose from 20+ specialized roadmaps and unlock powerful tools to accelerate your tech career.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  onClick={handleExploreRoadmapsClick}
                  className="bg-accent-purple text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-700 transition-all transform hover:scale-105 animate-pulse-glow"
                >
                  Explore Roadmaps
                </button>
                <button 
                  onClick={handleWelcomeClick}
                  className="border-2 border-accent-purple text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-500/10 transition-all transform hover:scale-105"
                >
                  Sign Up
                </button>
              </div>
              <div className="mt-12 flex items-center space-x-8">
                <div className="flex -space-x-4">
                  {imageSources.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`User ${i}`}
                      className="w-10 h-10 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <div className="text-gray-300">
                  <span className="font-bold text-white">10,000+</span> developers trust us
                </div>
              </div>
            </div>
            <div className="md:w-1/2 mt-12 md:mt-0">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" 
                alt="Developer working"
                className="rounded-2xl shadow-2xl animate-float"
              />
              <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 hidden lg:block">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl animate-float" style={{animationDelay: '1s'}}>
                  <div className="flex items-center space-x-4">
                    <Award className="text-accent-cyan h-8 w-8" />
                    <div>
                      <h3 className="text-white font-bold">Industry Recognition</h3>
                      <p className="text-white font-medium">Top-rated learning platform</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </header>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '20+', label: 'Learning Paths', icon: <TrendingUp className="text-accent-purple" /> },
              { number: '50K+', label: 'Active Learners', icon: <Users className="text-accent-pink" /> },
              { number: '100+', label: 'Expert Mentors', icon: <Award className="text-accent-blue" /> },
              { number: '95%', label: 'Success Rate', icon: <CheckCircle className="text-accent-cyan" /> },
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:bg-gray-50 transition-all transform hover:-translate-y-2">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <h3 className="text-4xl font-bold text-primary-900 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmaps Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white" id="roadmaps">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent-purple font-semibold">LEARNING PATHS</span>
            <h2 className="text-4xl font-bold text-primary-900 mb-6">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-gray-600">
              Select from our curated roadmaps designed by industry experts to guide you through your tech journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Globe className="h-10 w-10" />, title: 'Web Development', desc: 'Master frontend and backend technologies with hands-on projects and expert guidance.', color: 'accent-blue' },
              { icon: <Shield className="h-10 w-10" />, title: 'Cyber Security', desc: 'Learn security principles, ethical hacking, and protect systems from threats.', color: 'accent-purple' },
              { icon: <Smartphone className="h-10 w-10" />, title: 'App Development', desc: 'Build professional mobile apps for iOS and Android platforms.', color: 'accent-pink' },
              { icon: <Gamepad className="h-10 w-10" />, title: 'Game Development', desc: 'Create immersive games using modern engines and programming principles.', color: 'accent-cyan' },
              { icon: <Cloud className="h-10 w-10" />, title: 'Cloud Computing', desc: 'Master cloud platforms and deploy scalable applications.', color: 'accent-blue' },
              { icon: <Database className="h-10 w-10" />, title: 'Data Science', desc: 'Analyze data and build machine learning models.', color: 'accent-purple' },
            ].map((path, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className={`text-${path.color} mb-6 transform transition-transform hover:scale-110`}>{path.icon}</div>
                <h3 className="text-2xl font-bold text-primary-900 mb-4">{path.title}</h3>
                <p className="text-gray-600 leading-relaxed">{path.desc}</p>
                <button className="mt-6 text-accent-purple font-semibold flex items-center hover:text-purple-700 group">
                  Learn more 
                  <span className="transform transition-transform group-hover:translate-x-2">→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white" id="features">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent-purple font-semibold">TOOLS & FEATURES</span>
            <h2 className="text-4xl font-bold text-primary-900 mb-6">
              Powerful Tools for Your Success
            </h2>
            <p className="text-xl text-gray-600">
              Access our suite of professional tools designed to accelerate your learning and career growth.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <FileCode2 />, title: 'Code Complexity Analyzer', desc: 'Optimize your code quality and performance with AI-powered analysis.', color: 'accent-blue' },
              { icon: <Users />, title: 'Collaborative Coding', desc: 'Code together in real-time with peers and get instant feedback.', color: 'accent-purple' },
              { icon: <FileText />, title: 'Resume Builder', desc: 'Create ATS-friendly resumes tailored for tech positions.', color: 'accent-pink' },
              { icon: <Brain />, title: 'Skill Analysis', desc: 'Get data-driven insights for your ideal career path.', color: 'accent-cyan' },
              { icon: <Calendar />, title: 'Expert Meetings', desc: 'Book 1-on-1 sessions with industry veterans.', color: 'accent-blue' },
              { icon: <Bot />, title: 'AI Assistant', desc: 'Get 24/7 support for your coding challenges.', color: 'accent-purple' },
              { icon: <Terminal />, title: 'Interactive Tutorials', desc: 'Learn by doing with our interactive coding environment.', color: 'accent-pink' },
              { icon: <Cpu />, title: 'Performance Metrics', desc: 'Track your progress and identify areas for improvement.', color: 'accent-cyan' },
              { icon: <MessageSquare />, title: 'Community Forum', desc: 'Connect with peers and share knowledge in our community.', color: 'accent-blue' },
            ].map((feature, index) => (
              <div key={index} 
                className="bg-white p-8 rounded-2xl border-2 border-gray-100 hover:border-accent-purple transition-all duration-300 transform hover:-translate-y-2 group">
                <div className={`text-${feature.color} mb-6 transform transition-transform hover:scale-110`}>{feature.icon}</div>
                <h3 className="text-xl font-bold text-primary-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-primary-900 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-accent-purple font-semibold">TESTIMONIALS</span>
            <h2 className="text-4xl font-bold text-white mb-6">
              What Our Students Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Full Stack Developer",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100",
                content: "CodeXprt transformed my career. The structured learning path and mentorship were invaluable."
              },
              {
                name: "Michael Chen",
                role: "Security Analyst",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100",
                content: "The cyber security roadmap was comprehensive and up-to-date with industry standards."
              },
              {
                name: "Emily Rodriguez",
                role: "Mobile Developer",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100",
                content: "The hands-on projects and code reviews helped me land my dream job in app development."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl hover:transform hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                  <div className="ml-4">
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300">{testimonial.content}</p>
                <div className="mt-4 flex text-accent-cyan">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-900 to-primary-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] opacity-5"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 gradient-text">
              Ready to Start Your Tech Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Join thousands of developers who are accelerating their careers with CodeXprt's comprehensive learning platform.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
              <button 
                onClick={handleWelcomeClick}
                className="bg-accent-purple text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-700 transition-all transform hover:scale-105 animate-pulse-glow w-full md:w-auto"
              >
                Get Started Now
              </button>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="border-2 border-accent-purple text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-500/10 transition-all transform hover:scale-105 w-full md:w-auto flex items-center justify-center gap-2"
              >
                <Code2 className="w-5 h-5" />
                GitHub
              </a>
            </div>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Satisfaction Rate', value: '98%' },
                { label: 'Course Completion', value: '92%' },
                { label: 'Career Transition', value: '85%' },
                { label: 'Salary Increase', value: '40%' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-12 md:mb-0 md:w-1/3">
              <div className="flex items-center mb-6">
                <Code2 className="h-8 w-8 text-accent-purple" />
                <span className="ml-2 text-2xl font-bold">CodeXprt</span>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-sm">
                Empowering developers to reach their full potential through structured learning paths and powerful tools.
              </p>
              <div className="mt-6 flex space-x-4">
                {['Twitter', 'LinkedIn', 'GitHub', 'YouTube'].map((social) => (
                  <a key={social} href="#" className="text-gray-400 hover:text-white transition-colors">
                    {social}
                  </a>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:w-2/3">
              <div>
                <h3 className="text-lg font-semibold mb-6 text-accent-purple">Roadmaps</h3>
                <ul className="space-y-4 text-gray-400">
                  <li className="hover:text-white transition-colors cursor-pointer">Web Development</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Cyber Security</li>
                  <li className="hover:text-white transition-colors cursor-pointer">App Development</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Game Development</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Cloud Computing</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Data Science</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-6 text-accent-pink">Tools</h3>
                <ul className="space-y-4 text-gray-400">
                  <li className="hover:text-white transition-colors cursor-pointer">Code Analyzer</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Resume Builder</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Skill Analysis</li>
                  <li className="hover:text-white transition-colors cursor-pointer">AI Assistant</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Community Forum</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Expert Network</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-6 text-accent-cyan">Company</h3>
                <ul className="space-y-4 text-gray-400">
                  <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Terms of Service</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Blog</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Careers</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400">
            <p>© 2024 CodeXprt. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(147, 51, 234, 0.7); }
          50% { box-shadow: 0 0 20px 10px rgba(147, 51, 234, 0.3); }
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }

        .slide-in {
          animation: slide-in 0.6s ease-out forwards;
        }

        .gradient-text {
          @apply bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500;
        }
      `}</style>
    </div>
  );
}

export default Home;
