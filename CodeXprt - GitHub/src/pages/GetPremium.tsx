import React from 'react';
import { Crown, User } from 'lucide-react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const reviews = [
  {
    name: 'Aishwarya Sharma',
    review: 'The Premium plan has been a game-changer for my coding skills. The unlimited code checks and custom paths have helped me learn at my own pace and focus on my weaknesses.',
  },
  {
    name: 'Rahul Verma',
    review: 'I love the Standard plan! The professional sessions are incredibly helpful, and the priority customer support is a lifesaver when I get stuck on a problem.',
  },
  {
    name: 'Priya Patel',
    review: 'The Premium plan is worth every penny. The ability to make unlimited roadmap changes has allowed me to adapt my learning to the ever-changing tech landscape.',
  },
  {
    name: 'Amit Singh',
    review: 'I started with the free plan and was amazed by the value. Upgrading to the Standard plan was a no-brainer, and I\'ve seen significant improvement in my skills.',
  },
  {
    name: 'Sneha Reddy',
    review: 'The custom paths in the Premium plan are fantastic. They\'ve helped me explore new technologies and build a portfolio that stands out.',
  },
];

const ReviewsSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="mt-12 px-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-left" style={{ marginTop: '60px' }}>What Our Users Say</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8">Listen to what out paid users has to say about our plans!</p>
      <Slider {...settings}>
        {reviews.map((review, index) => (
          <div key={index} className="p-6 rounded-2xl mx-2 my-2 border-2 border-yellow-500" style={{ marginLeft: '4px', marginRight: '4px' }}>
            <div className="flex items-center mb-4">
              <User className="text-gray-500 dark:text-gray-400 mr-2" size={32} />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{review.name}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{review.review}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const GetPremium = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
        <span style={{ marginRight: '10px' }}>Get</span>
        <span style={{ color: '#EBB309', marginRight: '10px' }}>CodeXprt</span>
        <span style={{ color: '#EBB309', marginRight: '5px' }}>Premium</span>
        <Crown color="#EBB309" size={32} />
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">Unlock exclusive features and enhance your learning experience.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Free Plan */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Free</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Get started with basic features.</p>
          <div className="text-4xl font-bold text-blue-500 mb-4">Free</div>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
            <li>Skill Analysis: Unlimited</li>
            <li>Code Checker: 3 times/day</li>
            <li>Custom Path: 1 per week</li>
            <li>Roadmap Changes: 1 per week</li>
            <li>Customer Support: 24/7</li>
          </ul>
          <button className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">Already Activated</button>
        </div>

        {/* Standard Plan */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center mb-2">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mr-2">Standard</h2>
            <span className="bg-yellow-500 text-white text-xs font-semibold rounded-full px-2 py-1">Popular</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Enhanced features for serious learners.</p>
          <div className="text-4xl font-bold text-blue-500 mb-4">₹ 399/month</div>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
            <li>Code Checker: 7 times/day</li>
            <li>Custom Path: 2 per week</li>
            <li>Roadmap Changes: 2 per week</li>
            <li>Professional Session: 1 per month</li>
            <li>Priority Customer Support: 24/7</li>
          </ul>
          <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">Get Started</button>
        </div>

        {/* Premium Plan */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Premium</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">The ultimate learning experience.</p>
          <div className="text-4xl font-bold text-blue-500 mb-4">₹ 899/month</div>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4">
            <li>Unlimited Code Checker</li>
            <li>Unlimited Custom Paths</li>
            <li>Unlimited Roadmap Changes</li>
            <li>Professional Session: Every 15 days</li>
            <li>Priority Customer Support: 24/7</li>
          </ul>
          <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">Get Started</button>
        </div>
      </div>
      <ReviewsSlider />
    </div>
  );
};

export default GetPremium;
