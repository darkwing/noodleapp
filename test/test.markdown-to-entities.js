/*global describe:true it:true */
'use strict';

var markdownToEntities = require('../lib/markdown-to-entities');

describe('markdown-to-entities', function() {
  describe('parse', function() {
    it('returns correct text and entities', function(done) {
      var POST_TEXT = '@test blah.app id_rsa.pub You can find #News at [The Washington Post](http://www.washingtonpost.com/), http://news.google.ca , [The New York Times](http://nytimes.com/), or www.bing.com/news/ .';
      var EXPECTED_RESULT = {
        text: '@test blah.app id_rsa.pub You can find #News at The Washington Post, http://news.google.ca , The New York Times, or www.bing.com/news/ .',
        entities: {
          links: [
            {
              pos: 48,
              len: 19,
              url: 'http://www.washingtonpost.com/'
            },
            {
              pos: 69,
              len: 21,
              url:'http://news.google.ca'
            },
            {
              pos: 93,
              len: 18,
              url: 'http://nytimes.com/'
            },
            {
              pos: 116,
              len: 18,
              url: 'http://www.bing.com/news/'
            }
          ]
        }
      };

      var result = markdownToEntities.parse(POST_TEXT);

      // Don't test the order, since it doesn't matter.
      result.entities.links.sort(function(a, b) {
        return a.pos - b.pos;
      });

      result.should.eql(EXPECTED_RESULT);

      done();
    });
  });
});
