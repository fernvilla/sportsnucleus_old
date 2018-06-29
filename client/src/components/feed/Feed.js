import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Segment } from 'semantic-ui-react';
import Masonry from 'react-masonry-component';
import { Tweet, Loader } from './../../components';
import momentCustom from './../../utils/momentCustom';
import Filter from './Filter';

momentCustom();

const Feed = ({ items, isLoading, hideFilter }) => {
  const renderFeed = () => {
    if (isLoading) return <Loader />;

    if (!items.length) return <div> Nothing to see here...</div>;

    return items.map(item => <Tweet tweet={item} key={item._id} />);
  };

  return (
    <div>
      {!hideFilter && <Filter />}

      <Segment basic>
        <Container>
          <Masonry
            options={{
              itemSelector: '.card',
              percentPosition: true,
              transitionDuration: 0
            }}>
            <Card.Group itemsPerRow={4} stackable doubling>
              {renderFeed()}
            </Card.Group>
          </Masonry>
        </Container>
      </Segment>
    </div>
  );
};

Feed.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hideFilter: PropTypes.bool
};

Feed.defaultProps = {
  hideFilter: false
};

export default Feed;
