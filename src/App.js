import { useEffect, useState } from 'react';
import './App.scss';
import { navLinks, offers } from './data';

import logo from './assets/svg/logo.svg';
import menuIcon from './assets/svg/menu.svg';
import closeIcon from './assets/svg/close.svg';
import orbit from './assets/svg/orbit.svg';
import planetYellow from './assets/svg/planet-yellow.svg';
import planetOrange from './assets/svg/planet-orange.svg';
import planetWhite from './assets/svg/planet-white.svg';
import earth from './assets/img/earth.png';
import rocket from './assets/img/rocket.png';

const MOBILE_QUERY = '(max-width: 768px)';

function Earth() {
  return (
    <div className="earth" aria-hidden="true">
      <img className="earth__orbit" src={orbit} alt="" />
      <img className="earth__planet" src={earth} alt="" width="293" height="325" />
      <img className="earth__rocket" src={rocket} alt="" width="63" height="82" />
      <img className="earth__moon earth__moon--yellow" src={planetYellow} alt="" />
      <img className="earth__moon earth__moon--orange" src={planetOrange} alt="" />
      <img className="earth__moon earth__moon--white" src={planetWhite} alt="" />
    </div>
  );
}

function OfferCard({ id, title, text, textCompact, wide }) {
  return (
    <article className={`offer-card offer-card--${id}${wide ? ' offer-card--wide' : ''}`}>
      <h3 className="offer-card__title">{title}</h3>
      <p className="offer-card__text">
        {textCompact ? (
          <>
            <span className="offer-card__text-full">{text}</span>
            <span className="offer-card__text-compact">{textCompact}</span>
          </>
        ) : (
          text
        )}
      </p>
      <button className="button button--outline offer-card__button" type="button">
        Learn more
      </button>
    </article>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    const handleChange = (event) => {
      if (!event.matches) setIsMenuOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };

    mediaQuery.addEventListener('change', handleChange);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="page" id="top">
      <header className="header">
        <div className="container header__inner">
          <a className="header__logo" href="#top" aria-label="GO — home">
            <img src={logo} alt="GO logo" />
          </a>

          <button
            className="burger header__burger"
            type="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="main-nav"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <img src={isMenuOpen ? closeIcon : menuIcon} alt="" aria-hidden="true" />
          </button>

          <nav className={`nav header__nav${isMenuOpen ? ' nav--open' : ''}`} id="main-nav" aria-label="Main navigation">
            <ul className="nav__list">
              {navLinks.map(({ id, label, href }) => (
                <li className="nav__item" key={id}>
                  <a className="nav__link" href={href} onClick={closeMenu}>
                    {label}
                  </a>
                </li>
              ))}
              <li className="nav__item">
                <button className="nav__cart" type="button" aria-label="Cart" onClick={closeMenu} />
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="banner">
          <div className="container banner__inner">
            <div className="banner__content">
              <h1 className="banner__title">
                Discover the vast expanses of <span className="banner__accent">space</span>
              </h1>
              <p className="banner__subtitle">
                Where the possibilities are <span className="banner__highlight">endless!</span>
              </p>
              <button className="button button--filled banner__button" type="button">
                Learn more
              </button>
            </div>
            <Earth />
          </div>
        </section>

        <section className="container offers" id="offers">
          <h2 className="section-title offers__title">Offers</h2>
          <div className="offers__grid">
            {offers.map((offer) => (
              <OfferCard key={offer.id} {...offer} />
            ))}
          </div>
        </section>

        <section className="container info">
          <h2 className="section-title info__title">Embark on a space journey</h2>
          <p className="info__text">
            Travelling into space is one of the most exciting and unforgettable adventures that can
            change your life forever. And if you have ever dreamed of exploring stars, planets and
            galaxies, then our company is ready to help you realize this dream. We offer a unique
            experience that will allow you to go on a space journey and see all the secrets of the
            universe. We guarantee that every moment in space will be filled with incredible
            impressions, excitement and new discoveries. Our team of professionals takes care of
            your safety and comfort so that you can fully enjoy your adventure in space. We offer
            various options for space excursions.
          </p>

          <input className="info__toggle" type="checkbox" id="info-toggle" />
          <div className="info__more">
            <div className="info__more-inner">
              <p className="info__text info__text--more">
                Choose a short orbital flight to watch the sunrise over the Earth, a week on board
                a space station with a view of the planet from above, or a long expedition around
                the Moon. Before the flight, every traveller completes a training program with
                experienced instructors, and during the journey our crew is always nearby. Spacious
                cabins, panoramic windows and weightlessness are waiting for you — all you need is
                the desire to make the first step towards the stars.
              </p>
            </div>
          </div>
          <label className="info__read-more" htmlFor="info-toggle">
            <span className="info__read-more-label info__read-more-label--closed">Read more</span>
            <span className="info__read-more-label info__read-more-label--opened">Read less</span>
          </label>
        </section>
      </main>

      <footer className="footer">
        <img className="footer__rocket" src={rocket} alt="" width="36" height="47" />
        <p className="footer__text">Exciting space adventure!</p>
      </footer>
    </div>
  );
}

export default App;
