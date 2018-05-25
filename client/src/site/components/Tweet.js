import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Card, Image, Icon, Popup } from 'semantic-ui-react';
import momentCustom from './../utils/momentCustom';

momentCustom();

const Tweet = ({ tweet }) => {
  const {
    team: { name }
  } = tweet;

  const timeSince = moment
    .utc(tweet.published)
    .startOf('minutes')
    .fromNow();

  const tweetLink = `https://twitter.com/i/web/status/${tweet.tweet_id}`;

  return (
    <Card raised fluid>
      {tweet.image_url && (
        <Image
          href={tweetLink}
          src={tweet.image_url}
          centered
          alt="tweet"
          target="_blank"
          rel="noopener noreferrer"
        />
      )}

      <Card.Content>
        <Image floated="right" size="mini" src={tweet.profile_image_url} rounded bordered />

        <Card.Header>
          <a href={tweetLink} target="_blank" rel="noopener noreferrer">
            {tweet.text}
          </a>
        </Card.Header>

        <Card.Meta>
          <Icon name="twitter" color="blue" />
          <em>{timeSince}</em>
        </Card.Meta>

        <Card.Description>
          <div>{name}</div>
          <div>
            <a href={`https://www.twitter.com/${tweet.screen_name}`}>@{tweet.screen_name}</a>
          </div>
        </Card.Description>
      </Card.Content>

      <Card.Content extra>
        <div className="card-extra-content">
          <Popup
            inverted
            size="mini"
            trigger={
              <a href={`https://twitter.com/intent/tweet?in_reply_to=${tweet.tweet_id}`}>
                <Icon link fitted inverted color="black" name="reply" />
              </a>
            }
            content="Reply to tweet"
          />

          <Popup
            inverted
            size="mini"
            trigger={
              <a href={`https://twitter.com/intent/like?tweet_id=${tweet.tweet_id}`}>
                <Icon link fitted inverted color="black" name="empty heart" />
              </a>
            }
            content="Like tweet"
          />

          <Popup
            inverted
            size="mini"
            trigger={
              <a href={`https://twitter.com/intent/retweet?tweet_id=${tweet.tweet_id}`}>
                <Icon link fitted inverted color="black" name="retweet" />
              </a>
            }
            content="Retweet"
          />

          <Popup
            inverted
            size="mini"
            trigger={
              <a
                href={`mailto:?subject=Check out this tweet &body=${
                  tweet.text
                } ${tweetLink} via http://www.sportsnucleus.io`}>
                <Icon link fitted inverted color="black" name="mail outline" />
              </a>
            }
            content="Share via email"
          />
        </div>
      </Card.Content>
    </Card>
  );
};

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired
};

export default Tweet;
