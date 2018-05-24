import moment from 'moment';

const momentCustom = () =>
  moment.updateLocale('en', {
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: 'seconds',
      ss: '%ss',
      m: 'a minute',
      mm: '%dm',
      h: '1h',
      hh: '%dh',
      d: '1d',
      dd: '%dd',
      M: 'a month',
      MM: '%dM',
      y: 'a year',
      yy: '%dY'
    }
  });

export default momentCustom;
