import { Link } from 'react-router-dom';
import { LockKeyhole, Shield, Folder, Search, Sun, Moon, Users, Lock, ArrowRight, CheckCircle2, Sparkles, Github, Twitter, Linkedin } from 'lucide-react';
import { useThemeStore } from '../store/theme';

export function Landing() {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="container mx-auto px-5 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <div className="bg-violet-100 dark:bg-violet-900/30 p-1.5 sm:p-2 rounded-lg sm:rounded-xl">
              <LockKeyhole className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-violet-600 dark:text-violet-400" />
            </div>
            <span className="text-base sm:text-lg lg:text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400">
              SecureNotes
            </span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-6">
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
              ) : (
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
              )}
            </button>
            <Link
              to="/login"
              className="text-xs sm:text-sm lg:text-base text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 font-medium"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-violet-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm lg:text-base hover:bg-violet-700 shadow-sm hover:shadow transition-all duration-200 font-medium whitespace-nowrap"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 sm:px-6 lg:px-16 pt-8 sm:pt-12 lg:pt-24 pb-12 sm:pb-16 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-left space-y-6 sm:space-y-8">
            <div className="inline-flex items-center space-x-2 bg-violet-100 dark:bg-violet-900/30 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-violet-600 dark:text-violet-400 transform hover:scale-105 transition-transform cursor-default">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-medium">Secure by Design</span>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight">
                Secure Your Digital Life with{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400">SecureNotes</span>
              </h1>
              <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                The most secure way to store and organize your notes, passwords, and sensitive information.
                All your data is encrypted and accessible only to you.
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <Link
                to="/signup"
                className="bg-violet-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-medium hover:bg-violet-700 shadow-sm hover:shadow-md transition-all duration-200 inline-flex items-center justify-center space-x-3 hover:translate-y-[-2px] active:translate-y-[0px]"
              >
                <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Start Securing Your Notes</span>
              </Link>
              <Link
                to="/login"
                className="group text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-2 transition-colors duration-200 inline-flex items-center justify-center space-x-2"
              >
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-3xl opacity-10 blur-3xl"></div>
            <div className="relative bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl transform hover:scale-[1.02] transition-transform">
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-slate-100 dark:bg-slate-700 h-14 rounded-xl animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {[
              { value: '100%', label: 'End-to-End Encrypted' },
              { value: '10k+', label: 'Active Users' },
              { value: '99.9%', label: 'Uptime' },
              { value: '4.9/5', label: 'User Rating' }
            ].map((stat, index) => (
              <div key={index} className="text-center transform hover:scale-105 transition-transform">
                <div className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 mb-2 sm:mb-3">{stat.value}</div>
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {[
            { icon: Shield, title: 'End-to-End Encryption', desc: 'Your data is encrypted before it leaves your device, ensuring maximum security.' },
            { icon: Folder, title: 'Smart Organization', desc: 'Keep your notes organized with folders, tags, and powerful search capabilities.' },
            { icon: Search, title: 'Quick Search', desc: 'Find any note instantly with our powerful search functionality.' }
          ].map((feature, index) => (
            <div key={index} className="group relative p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="bg-violet-100 dark:bg-violet-900/30 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform transition-transform group-hover:scale-110 group-hover:rotate-3">
                <feature.icon className="w-8 h-8 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it Works */}
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">How SecureNotes Works</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Your security is our top priority. Here's how we keep your notes safe and accessible.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {[
            { step: 1, title: 'Create Your Account', desc: 'Sign up with your email and create a strong master password.' },
            { step: 2, title: 'Add Your Notes', desc: 'Write and organize your notes with our intuitive interface.' },
            { step: 3, title: 'Access Anywhere', desc: 'Your encrypted notes are available on any device, anytime.' }
          ].map((item, index) => (
            <div key={index} className="relative p-8 group">
              <div className="absolute top-0 left-8 w-12 h-12 bg-violet-100 dark:bg-violet-900/30 rounded-2xl flex items-center justify-center text-violet-600 dark:text-violet-400 font-bold text-lg transform transition-transform group-hover:scale-110 group-hover:rotate-3">
                {item.step}
              </div>
              <div className="pt-16">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-5 sm:px-6 lg:px-11 py-24 mb-12">
        <div className="bg-gradient-to-r from-violet-500 to-purple-500 rounded-3xl p-1">
          <div className="bg-white dark:bg-slate-800 rounded-[1.4rem] p-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Ready to Secure Your Notes?
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-10">
                Join thousands of users who trust SecureNotes with their digital information.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-medium hover:from-violet-700 hover:to-purple-700 shadow-sm hover:shadow-md transition-all duration-200 inline-flex items-center space-x-3 hover:translate-y-[-2px] active:translate-y-[0px] w-full sm:w-auto justify-center"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-violet-100 dark:bg-violet-900/30 p-2 rounded-xl">
                  <LockKeyhole className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                </div>
                <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400">
                  SecureNotes
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                Secure, organize, and access your notes from anywhere. Your privacy is our priority.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/features" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/security" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
                    Security
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Support</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/help" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {new Date().getFullYear()} SecureNotes. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link to="/privacy" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}