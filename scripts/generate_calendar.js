const https = require('https');
const config = require('../config.json');
const fs = require('fs');

function getTime (date) {
  let h = date.getHours();
  let m = date.getMinutes();

  let period = (h < 12) ? 'AM' : 'PM'
  if (!h) {
    h = 12;
  } else {
    h -= 12 * (h > 12);
  }

  // precede with 0 if needed
  h = ('0' + h).slice(-2);
  m = ('0' + m).slice(-2);

  return `${h}:${m}${period}`;
}

var exports = {
  generate: function() {
    const url = `https://www.googleapis.com/calendar/v3/calendars/${config.calendarId}/events?key=${config.googleApiKey}`;

    https.get(url, (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => {
        let res = JSON.parse(data);
        let output = {};

        for (ev of res.items) {
          let start = new Date(ev.start.dateTime || ev.start.date);
          let end = new Date(ev.end.dateTime || ev.start.date);
          let day = start.getDate() + (start.getMonth() * 31); // assumes only jan/feb

          let time = '11:59PM'; // default if no time given
          if (ev.start.dateTime) {
            time = getTime(start) + ' - ' + getTime(end);
          }

          let entry = {
            type: 'lec',
            name: ev.summary,
            who: ev.description,
            when: time,
            where: ev.location,
            timestamp: start, // js-friendly time for sorting purposes
            links: []
          }

          if (day in output) {
            output[day].push(entry);
            output[day].sort((a, b) => a.timestamp - b.timestamp);
          } else {
            output[day] = [entry];
          }
        }

        fs.writeFileSync(__dirname + '/../src/views/content/schedule.json', JSON.stringify(output));
      });
    });
  }
}

module.exports = exports;
