# xergbot

Adventures in Masto.js land

## Rate limits

To bump up the rate limit on your instance change the 300 to 99999 in [this file](https://github.com/mastodon/mastodon/blob/46ad7fea9d67631f54dd1ef45114a08cd2c5db73/config/initializers/rack_attack.rb#L49-L51) in your Mastodon installation and then restart the Mastodon services.

