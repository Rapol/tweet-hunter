/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
const Snoowrap = require('snoowrap');

module.exports = class SnooManager {
  constructor({ subreddit, twitterManager, stateManager }) {
    this.snooClient = new Snoowrap({
      userAgent: 'node',
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
      username: process.env.REDDIT_USERNAME,
      password: process.env.REDDIT_PASSWORD,
    });
    this.subredditName = subreddit;
    this.subreddit = this.snooClient.getSubreddit(this.subredditName);
    this.twitterManager = twitterManager;
    this.stateManager = stateManager;
  }

  _filterImagePosts(posts) {
    return posts.filter((p) => !p.is_self && p.url);
  }

  async processPosts() {
    const result = await this.subreddit.getHot({ limit: 1 });
    // fitler if we have processed this post by using stateManager
    const imagePosts = await this._filterImagePosts(result);
    const ocrResults = await this.twitterManager.findTwitterSource(imagePosts.map(((p) => p.url)));
    console.log(ocrResults);
    // eslint-disable-next-line no-restricted-syntax
  }
};
