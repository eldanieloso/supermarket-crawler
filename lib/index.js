import Crawler from 'crawler';
const crawler = new Crawler({
  maxConnections: 10,
  // This will be called for each crawled page
  callback: (error, res, done) => {
    if (error) {
      console.log(error);
    } else {
      const $ = res.$; // $ is Cheerio by default
      //a lean implementation of core jQuery designed specifically for the server

      console.log($('title').text());
    }

    done();
  }
});
crawler.queue('http://www.amazon.com');