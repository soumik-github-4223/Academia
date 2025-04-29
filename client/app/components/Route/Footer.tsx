import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-white">About</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="#our-story" className="hover:underline hover:text-white">
                Our Story
              </a>
            </li>
            <li>
              <a
                href="#privacy-policy"
                className="hover:underline hover:text-white"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:underline hover:text-white">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a href="#courses" className="hover:underline hover:text-white">
                Courses
              </a>
            </li>
            <li>
              <a
                href="#my-account"
                className="hover:underline hover:text-white"
              >
                My Account
              </a>
            </li>
            <li>
              <a
                href="#dashboard"
                className="hover:underline hover:text-white"
              >
                Course Dashboard
              </a>
            </li>
          </ul>
        </div>

        {/* Social Links Section */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-white">Social Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-white"
              >
                YouTube
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-white"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://github.com/soumik-github-4223/Academia"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-white"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info Section */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-white">Contact Info</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Call Us: 1-885-665-2022</li>
            <li>Address: 7011 Vermont Ave, Los Angeles, CA 90044</li>
            <li>
              Mail Us:{" "}
              <a
                href="mailto:soumiksaha9444@gmail.com"
                className="hover:underline hover:text-white"
              >
                soumiksaha9444@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Academia. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;