const mongoose = require('mongoose');
const db = mongoose.connection;
const League = require('./../models/League');
const Team = require('./../models/Team');
const TwitterAccount = require('./../models/TwitterAccount');

mongoose.connect('mongodb://localhost/sportsnucleus');

db.on('error', console.error.bind(console, 'connection error:'));

const leagues = [
  {
    name: 'Major League Baseball',
    canonical: 'mlb',
    website: 'https://www.mlb.com/',
    shortName: 'MLB'
  },
  {
    name: 'National Basketball Association',
    canonical: 'nba',
    website: 'https://www.nba.com/',
    shortName: 'NBA'
  },
  {
    name: 'National Hockey League',
    canonical: 'nhl',
    website: 'https://www.nhl.com/',
    shortName: 'NHL'
  },
  {
    name: 'Major League Soccer',
    canonical: 'mls',
    website: 'https://www.mlssoccer.com/',
    shortName: 'MLS'
  }
];

const teams = [
  {
    name: 'Los Angeles Dodgers',
    shortName: 'Dodgers',
    canonical: 'dodgers',
    website: 'https://www.mlb.com/dodgers',
    league: 'mlb'
  },
  {
    name: 'Los Angeles Lakers',
    shortName: 'Lakers',
    canonical: 'lakers',
    website: 'https://www.lakers.com',
    league: 'nba'
  }
];

const twitterAccounts = [
  {
    screenName: 'Dodgers',
    accountType: 'Team',
    team: 'dodgers'
  },
  {
    screenName: 'Lakers',
    accountType: 'Team',
    team: 'lakers'
  }
];

db.once('open', () => {
  League.remove({}, err => {
    if (err) return console.log(err);

    leagues.map(l => {
      console.log('league', l);

      const { name, canonical, website, shortName } = l;

      const league = League({
        name,
        canonical,
        website,
        shortName
      });

      league.save((err, league) => {
        if (err) return console.error(err);

        console.log('league created', league);
      });
    });
  });

  Team.remove({}, err => {
    teams.map(t => {
      console.log('team', t);

      const { name, canonical, website, shortName, league } = t;

      League.findOne({ canonical: league }, (err, league) => {
        if (err) return console.log(err);

        const team = Team({
          name,
          canonical,
          website,
          shortName,
          league: league._id
        });

        team.save((err, team) => {
          if (err) return console.log(err);

          league.teams.push(team);

          league.save((err, league) => {
            if (err) return console.log(err);

            console.log('team created', team);
          });
        });
      });
    });
  });

  TwitterAccount.remove({}, err => {
    twitterAccounts.map(t => {
      console.log('twitter account', t);
      const { screenName, accountType, team } = t;

      Team.find({}, (err, teams) => {
        console.log(teams);
      });

      Team.findOne({ canonical: team }, (err, team) => {
        if (err) return console.log(err);

        const twitterAccount = TwitterAccount({
          screenName,
          accountType,
          team: team._id
        });

        twitterAccount.save((err, twitterAccount) => {
          if (err) return console.log(err);

          team.twitterAccounts.push(twitterAccount);

          team.save((err, team) => {
            if (err) return console.log(err);

            console.log('twitter account created', twitterAccount);
          });
        });
      });
    });
  });
});
