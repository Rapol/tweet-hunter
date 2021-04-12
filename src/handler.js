const Tesseract = require('tesseract.js');
const StateManager = require('./lib/StateManager');
const SnooManager = require('./lib/SnooManager');
const TwitterManager = require('./lib/TwitterManager');
const localBlob = require('./lib/blobClient/localBlob');

module.exports.hello = async (event) => {
  const stateManager = await StateManager.buildStateManager(localBlob);
  const subreddits = stateManager.getSubreddits();
  const twitterManager = new TwitterManager({ ocrClient: Tesseract });
  // eslint-disable-next-line no-restricted-syntax
  for (const subreddit of subreddits) {
    const snooManager = new SnooManager({ subreddit, twitterManager, stateManager });
    // eslint-disable-next-line no-await-in-loop
    await snooManager.processPosts();
  }
};

module.exports.hello();
