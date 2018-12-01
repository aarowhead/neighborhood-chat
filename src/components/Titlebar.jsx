import React from 'react'
import { PageHeader } from 'react-bootstrap';

class TitleBar extends React.Component {
  render() {
    return (
      <PageHeader>
        Neighborhood Chat <small>Grandview Neighborhood</small>
      </PageHeader>
    );
  }
}

export { TitleBar };
