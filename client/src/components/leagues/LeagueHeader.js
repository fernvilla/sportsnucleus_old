import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Container } from 'semantic-ui-react';

const LeagueHeader = ({ league }) => {
  return (
    <Segment>
      <Container>
        <h2>{league.name}</h2>

        <div>
          <a href={league.website} target="_blank">
            {league.website}
          </a>
        </div>
      </Container>
    </Segment>
  );
};

LeagueHeader.propTypes = {
  league: PropTypes.object.isRequired
};

export default LeagueHeader;
