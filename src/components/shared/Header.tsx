import {
  DigiHeader,
  DigiHeaderNavigation,
  DigiHeaderNavigationItem,
} from '@digi/arbetsformedlingen-react';

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
              <DigiHeaderNavigationItem>
                <a href="/">Hem</a>
              </DigiHeaderNavigationItem>
              <DigiHeaderNavigationItem>
                <a href="/">Om Oss</a>
              </DigiHeaderNavigationItem>
              <DigiHeaderNavigationItem>
                <a href="/">Kontakt</a>
              </DigiHeaderNavigationItem>
              <DigiHeaderNavigationItem>
                <a href="/">Sök Jobb</a>
              </DigiHeaderNavigationItem>
              <DigiHeaderNavigationItem>
                <a href="/">Logga In</a>
              </DigiHeaderNavigationItem>
            </DigiHeaderNavigation>
          </div>
        </div>
      </DigiHeader>
    </>
  );
};
