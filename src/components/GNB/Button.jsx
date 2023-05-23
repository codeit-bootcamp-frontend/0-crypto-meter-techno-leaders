import { Mobile, TabletAbove } from '/src/components/GNB/MediaQuery';
import classNames from 'classnames/bind';
import styles from '/src/components/GNB/Button.module.css';

const cn = classNames.bind(styles);

function Button({
  isSearchLogVisible,
  handleClick,
  name,
  propStyle,
  source = null,
}) {
  return (
    <>
      <Mobile>
        <button
          className={cn('button', isSearchLogVisible && 'active')}
          style={{ ...propStyle }}
          onClick={handleClick}
        >
          {source ? (
            <img src={source} />
          ) : (
            <p className={cn('button-name')}>{name}</p>
          )}
        </button>
      </Mobile>
      <TabletAbove>
        <button
          className={cn('button', isSearchLogVisible && 'active')}
          style={{ ...propStyle }}
          onClick={handleClick}
        >
          {source && <img src={source} />}
          <p className={cn('button-name')}>{name}</p>
        </button>
      </TabletAbove>
    </>
  );
}

export default Button;
