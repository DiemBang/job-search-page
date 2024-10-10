import {
  DigiHeader,
  DigiHeaderNavigation,
  DigiHeaderNavigationItem,
} from '@digi/arbetsformedlingen-react';
import { Link } from 'react-router-dom';

const navigationItems = [
  { href: '/', text: 'Hem' },
  { href: '/', text: 'Om Oss' },
  { href: '/search', text: 'Sök Jobb' },
  { href: '/savedAds', text: 'Sparade Annonser' },
];

export const AppHeader = () => {
  return (
    <>
      <DigiHeader
        afSystemName="Diggilo"
        afHideSystemName={false}
        afMenuButtonText="Meny"
      >
        <div slot="header-content">
          <div slot="header-navigation">
            <DigiHeaderNavigation>
              {navigationItems.map((item, index) => (
                <DigiHeaderNavigationItem key={index}>
                  <Link to={item.href}>{item.text}</Link>
                </DigiHeaderNavigationItem>
              ))}
            </DigiHeaderNavigation>
          </div>
        </div>
      </DigiHeader>
    </>
  );
};
