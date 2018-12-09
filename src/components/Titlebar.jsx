import React from 'react'
import { PageHeader } from 'react-bootstrap';

class TitleBar extends React.Component {
  render() {
    return (
      <div>
        <div>
          <PageHeader>
            Neighborhood Chat <small>Fort Utah Neighborhood</small>
          </PageHeader>
        </div>
      </div>
    );
  }
}

export { TitleBar };
