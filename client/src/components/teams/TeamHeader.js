import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Container } from 'semantic-ui-react';

const TeamHeader = ({ team }) => {
  return (
    <Segment>
      <Container>
        <h2>{team.name}</h2>

        <div>
          <a href={team.website} target="_blank">
            {team.website}
          </a>
        </div>
      </Container>
    </Segment>
  );
};

TeamHeader.propTypes = {
  team: PropTypes.object.isRequired
};

export default TeamHeader;
