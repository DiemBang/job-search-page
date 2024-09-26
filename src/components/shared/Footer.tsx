import { FooterVariation, FooterCardVariation, ButtonSize, ButtonVariation } from '@digi/arbetsformedlingen';
import {
    DigiButton,
  DigiFooter,
  DigiFooterCard,
} from '@digi/arbetsformedlingen-react';

export const AppFooter = () => {
  return (
    <>
      <DigiFooter afVariation={FooterVariation.LARGE}>
        <div slot="content-top">
          <div className="footer-contact">
            <DigiFooterCard afType={FooterCardVariation.BORDER}>
              <h3 className='footer-card-title'>Hitta Oss</h3>
              <address>
                Gatavägen 4<br />
                123 45 Ort
                <br />
                Stockholm
                <br />
                <a href="#">kontakt@diggilo.se</a>
                <br />
                <a href="#">+46 123456789</a>
              </address>
            </DigiFooterCard>
          </div>
          <div className="footer-links">
            <DigiFooterCard afType={FooterCardVariation.BORDER}>
              <h3 className='footer-card-title'>Snabblänkar</h3>
              <a href="#">Hem</a>
              <a href="#">Om Oss</a>
              <a href="#">Kontakta Oss</a>
              <a href="#">Sök Jobb</a>
            </DigiFooterCard>
          </div>
          <div className="footer-newsletter">
            <DigiFooterCard afType={FooterCardVariation.BORDER}>
              <h3 className='footer-card-title'>Nyhetsbrev</h3>
              <input type="email" />
              <DigiButton
	            afSize={ButtonSize.MEDIUM}
	            afVariation={ButtonVariation.SECONDARY}
	            afFullWidth={false}>
	                Anmäl Dig!
              </DigiButton>
            </DigiFooterCard>
          </div>
          <div>
            <DigiFooterCard afType={FooterCardVariation.ICON}>
              <h2>Diggilo</h2>
            </DigiFooterCard>
          </div>
        </div>
      </DigiFooter>
    </>
  );
};
