import {
  DigiHeader,
  DigiHeaderNavigation,
  DigiHeaderNavigationItem,
} from '@digi/arbetsformedlingen-react';

const navigationItems = [
  { href: '/', text: 'Hem' },
  { href: '/', text: 'Om Oss' },
  { href: '/', text: 'Kontakt' },
  { href: '/', text: 'Sök Jobb' },
  { href: '/', text: 'Sparade Annonser' },
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
                  <a href={item.href}>{item.text}</a>
                </DigiHeaderNavigationItem>
              ))}
            </DigiHeaderNavigation>
          </div>
        </div>
      </DigiHeader>
    </>
  );
};
