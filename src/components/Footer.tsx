import React from 'react';
import { UtensilsCrossed, Github, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <UtensilsCrossed className="h-8 w-8 text-orange-400" />
              <span className="ml-2 text-xl font-bold text-white">RecipeFinder</span>
            </div>
            <p className="text-gray-400 mb-4">
              Discover delicious recipes based on the ingredients you have. Save your favorites and become a better cook!
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<Github />} href="#" />
              <SocialLink icon={<Twitter />} href="#" />
              <SocialLink icon={<Instagram />} href="#" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/favorites" label="Favorites" />
              <FooterLink href="#" label="Popular Recipes" />
              <FooterLink href="#" label="Meal Planning" />
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
            <ul className="space-y-3">
              <FooterLink href="#" label="Breakfast" />
              <FooterLink href="#" label="Lunch" />
              <FooterLink href="#" label="Dinner" />
              <FooterLink href="#" label="Desserts" />
              <FooterLink href="#" label="Vegetarian" />
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} RecipeFinder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  icon: React.ReactNode;
  href: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon, href }) => {
  return (
    <a 
      href={href} 
      className="bg-gray-700 hover:bg-orange-500 text-white p-2 rounded-full transition-colors duration-300"
    >
      {icon}
    </a>
  );
};

interface FooterLinkProps {
  href: string;
  label: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, label }) => {
  return (
    <li>
      <a 
        href={href} 
        className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
      >
        {label}
      </a>
    </li>
  );
};

export default Footer;