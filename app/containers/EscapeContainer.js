import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import * as React from 'react';
import Mousetrap from 'mousetrap';
import routes from '../constants/routes';

export default ({ children }: { children: string }) => {
  const history: History = useHistory();

  Mousetrap.unbind('ctrl+alt+e');
  Mousetrap.bind('ctrl+alt+e', () => {
    if (history.location.pathname.includes(routes.GOOD_BYE)) {
      history.replace(routes.COMPLETION);
    } else {
      history.replace(routes.EXPERIMENT_ESCAPE);
    }
  });

  if (history.location.pathname.includes(routes.EXPERIMENT_CONTAINER)) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: 'flex' }}>
      <div
        style={{
          flexGrow: '0',
          flexShrink: '0',
          width: '50px',
          marginLeft: '10px'
        }}
      >
        <ul>
          <li>
            <h1>
              <Link to={routes.EXPERIMENT_ESCAPE}>
                <i className="fa fa-bars" />
              </Link>
            </h1>
          </li>
        </ul>
      </div>
      <div>{children}</div>
    </div>
  );
};
