import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavigationBar.css';

type Props = {
  next: string,
  title: string,
  onNext: () => void,
  backRoute: string
};

type BackButtonProps = {
  backRoute: string
};

const BackButton = ({ backRoute }: BackButtonProps) => (
  <div data-tid="backButton">
    <Link to={backRoute}>
      <i className="fa fa-arrow-left" />
    </Link>
  </div>
);

export default ({ next, onNext, title, backRoute }: Props) => {
  if (next) {
    return (
      <div className={styles.container}>
        <div>{backRoute ? <BackButton backRoute={backRoute} /> : ''}</div>
        <div className={styles.expander} />
        <div>
          <Link to={next}>
            <span>{title}</span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div>{backRoute ? <BackButton backRoute={backRoute} /> : ''}</div>
      <div className={styles.expander} />
      <div>
        {onNext ? (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <a onClick={onNext} className={styles.nextPage}>
            {title}
          </a>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
