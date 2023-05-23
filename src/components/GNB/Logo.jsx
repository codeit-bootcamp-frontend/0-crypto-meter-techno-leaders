import { useMediaQuery } from 'react-responsive';
import imgLogo from '/src/assets/images/imgLogo.svg';
import textLogo from '/src/assets/images/textLogo.svg';
import { Mobile, TabletAbove } from '/src/components/GNB/MediaQuery';
import classNames from 'classnames/bind';
import styles from '/src/components/GNB/Logo.module.css';

const cn = classNames.bind(styles);

function Logo() {
  const isMobile = useMediaQuery({
    query: '(max-width:767px)',
  });

  return (
    <a href="/">
      <div className={cn('logo-container')}>
        <Mobile>
          <img src={imgLogo} />
        </Mobile>
        <TabletAbove>
          <img src={imgLogo} /> <img src={textLogo} />
        </TabletAbove>
      </div>
    </a>
  );
}

export default Logo;
