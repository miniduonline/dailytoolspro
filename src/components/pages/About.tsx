import React from 'react';
import { Users, Target, Award, Heart, Zap, Shield, Globe, Coffee } from 'lucide-react';

export const About: React.FC = () => {
  const teamMembers = [
    {
      name: 'Minidu Shashimal Aluthge',
      role: 'Founder & Lead Developer',
      description: 'Full-stack developer passionate about creating useful tools for everyone.',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  const values = [
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: 'Speed & Performance',
      description: 'Lightning-fast tools that work instantly without any delays or loading times.'
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: 'Privacy First',
      description: 'Your data stays on your device. We don\'t store or track your personal information.'
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-500" />,
      title: 'Accessibility',
      description: 'Free tools available to everyone, anywhere, on any device with an internet connection.'
    },
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: 'User-Centric',
      description: 'Built based on real user needs and feedback from our growing community.'
    }
  ];

  const milestones = [
    {
      year: '2024',
      title: 'Project Launch',
      description: 'Started Daily Tools Pro with the vision of creating essential web tools for everyone.'
    },
    {
      year: '2025',
      title: 'Growing Community',
      description: 'Reached 100+ daily users and expanded our tool collection based on user feedback.'
    },
    {
      year: 'Future',
      title: 'Continuous Innovation',
      description: 'Planning to add AI-powered tools and advanced features while keeping core tools free.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About Daily Tools Pro
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Empowering productivity through simple, powerful, and accessible web tools
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-cyan-400" />
                <span>100+ Daily Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-green-400" />
                <span>15+ Tools Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-yellow-400" />
                <span>Always Free Core Tools</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                At Daily Tools Pro, we believe that powerful productivity tools shouldn't be locked behind 
                paywalls or require complex software installations. Our mission is to democratize access 
                to essential digital tools by providing them for free, directly in your web browser.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  What We Stand For
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>Accessibility:</strong> Tools should be available to everyone, regardless of their budget or technical expertise.
                    </p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>Privacy:</strong> Your data belongs to you. We process everything locally when possible.
                    </p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>Simplicity:</strong> Complex tasks should have simple solutions that anyone can use.
                    </p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>Quality:</strong> Free doesn't mean compromising on functionality or user experience.
                    </p>
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 lg:p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Why We Built This
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  As developers and creators ourselves, we often found ourselves searching for simple tools 
                  to handle everyday tasks. Too often, we encountered:
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Expensive software for basic functions</li>
                  <li>• Tools that required account creation</li>
                  <li>• Privacy concerns with data handling</li>
                  <li>• Poor mobile experiences</li>
                  <li>• Cluttered interfaces with ads</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-300 mt-4">
                  Daily Tools Pro was born from the desire to solve these problems and create 
                  the tool hub we wished existed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white dark:bg-gray-800 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Core Values
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                These principles guide every decision we make and every tool we build
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Journey
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                From idea to reality - the story of Daily Tools Pro
              </p>
            </div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  <div className="flex-shrink-0 w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">
                      {milestone.year}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white dark:bg-gray-800 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Meet the Team
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                The passionate individuals behind Daily Tools Pro
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="bg-orange-50 dark:bg-orange-900/10 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Coffee className="h-16 w-16 text-orange-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Support Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Daily Tools Pro is a passion project that we maintain in our free time. 
              Your support helps us keep the lights on and continue developing new tools for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://buymeacoffee.com/miniduonline"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
              >
                <Coffee className="h-5 w-5" />
                <span>Buy Us Coffee</span>
              </a>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Every coffee helps us build better tools ☕
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Have questions, suggestions, or just want to say hello? We'd love to hear from you!
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};