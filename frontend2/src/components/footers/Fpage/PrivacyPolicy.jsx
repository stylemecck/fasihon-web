import { useState } from 'react';
import { 
  FiChevronDown, 
  FiChevronUp, 
  FiShield,
  FiUser,
  FiMail,
  FiGlobe
} from 'react-icons/fi';

const PrivacyPolicy = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      id: 'data-collection',
      title: 'Data We Collect',
      icon: <FiUser className="mr-2" />,
      content: `We collect information to provide better services to all our users...`
    },
    {
      id: 'data-use',
      title: 'How We Use Data',
      icon: <FiShield className="mr-2" />,
      content: `The information we collect helps us personalize our services...`
    },
    {
      id: 'data-sharing',
      title: 'Information Sharing',
      icon: <FiGlobe className="mr-2" />,
      content: `We do not share personal information with companies...`
    },
    {
      id: 'your-rights',
      title: 'Your Rights',
      icon: <FiMail className="mr-2" />,
      content: `You have the right to access, correct, or delete your personal data...`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 mt-[8%]">
      {/* Hero Section */}
      <div className="py-20 text-white bg-gradient-to-r from-gray-600 to-black">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Privacy Policy</h1>
            <p className="text-xl opacity-90">Last Updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 mb-12 md:grid-cols-4">
          {sections.map((section) => (
            <a 
              key={section.id}
              href={`#${section.id}`}
              className="flex items-center p-4 transition-shadow bg-white rounded-lg shadow-sm hover:shadow-md"
            >
              {section.icon}
              <span className="font-medium">{section.title}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        {/* Summary Card */}
        <div className="p-6 mb-12 bg-white border border-blue-100 shadow-lg rounded-xl">
          <h2 className="mb-4 text-2xl font-bold">Key Points</h2>
          <ul className="pl-6 space-y-3 text-gray-600 list-disc">
            <li>We never sell your personal information</li>
            <li>You control your data preferences</li>
            <li>Transparent data practices</li>
            <li>GDPR & CCPA compliant</li>
          </ul>
        </div>

        {/* Interactive Sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div 
              key={section.id}
              id={section.id}
              className="transition-shadow bg-white rounded-lg shadow-sm hover:shadow-md"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="flex items-center justify-between w-full p-6 text-left"
              >
                <div className="flex items-center">
                  {section.icon}
                  <h3 className="text-xl font-semibold">{section.title}</h3>
                </div>
                {openSection === section.id ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              <div className={`px-6 pb-6 ${openSection === section.id ? 'block' : 'hidden'}`}>
                <p className="leading-relaxed text-gray-600">
                  {section.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="p-8 mt-12 text-center bg-blue-50 rounded-xl">
          <h2 className="mb-4 text-2xl font-bold">Questions About Privacy?</h2>
          <p className="mb-6 text-gray-600">Contact our Data Protection Officer</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a 
              href="mailto:privacy@company.com" 
              className="flex items-center justify-center px-6 py-3 transition bg-white rounded-lg shadow-sm hover:shadow-md"
            >
              <FiMail className="mr-2" /> privacy@company.com
            </a>
            <a 
              href="/contact" 
              className="flex items-center justify-center px-6 py-3 text-white transition bg-gray-800 rounded-lg hover:bg-blue-700"
            >
              Contact Form
            </a>
          </div>
        </div>

        {/* Consent Management */}
        <div className="p-6 mt-12 bg-white shadow-sm rounded-xl">
          <h2 className="mb-4 text-2xl font-bold">Your Privacy Choices</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
              <span>Analytics Cookies</span>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
              <span>Marketing Cookies</span>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;