import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { errors } from './errorReducer';
import {
  leagues,
  fetchLeaguesError,
  fetchingLeagues,
  fetchingLeague,
  league
} from './leaguesReducer';
import { teams, fetchTeamsError, fetchingTeams, fetchingTeam, team } from './teamsReducer';
import { auth, loggingInUser, registeringUser } from './authReducer';
import { profile } from './profileReducer';
import { bookmarks } from './bookmarksReducer';

export default combineReducers({
  form,
  errors,
  auth,
  loggingInUser,
  registeringUser,
  leagues,
  fetchLeaguesError,
  fetchingLeagues,
  fetchingLeague,
  league,
  teams,
  fetchTeamsError,
  fetchingTeams,
  fetchingTeam,
  team,
  profile,
  bookmarks
});
