import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
// import LazyLoad from 'react-lazyload';
import { Card, Image, Icon } from 'semantic-ui-react';
import momentCustom from './../utils/momentCustom';

momentCustom();

export default class Tweet extends Component {
  static propTypes = {
    tweet: PropTypes.object.isRequired
  };

  render() {
    const { tweet } = this.props;
    console.log(tweet);
    const {
      team: { canonical, name }
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
          {/*<Image floated="right" size="mini" src={tweet.profile_image_url} rounded bordered />*/}

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
            <a
              href={`https://twitter.com/intent/tweet?in_reply_to=${tweet.tweet_id}`}
              title="Reply">
              <Icon link fitted inverted color="black" name="reply" />
            </a>

            <a href={`https://twitter.com/intent/like?tweet_id=${tweet.tweet_id}`} title="Like">
              <Icon link fitted inverted color="black" name="empty heart" />
            </a>

            <a
              href={`https://twitter.com/intent/retweet?tweet_id=${tweet.tweet_id}`}
              title="Retweet">
              <Icon link fitted inverted color="black" name="retweet" />
            </a>
          </div>
        </Card.Content>
      </Card>
    );
  }
}
