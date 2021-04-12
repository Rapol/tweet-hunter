/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */

module.exports = class TwitterManager {
  constructor({ ocrClient }) {
    this.ocrClient = ocrClient;
  }

  _filterImagePosts(posts) {
    return posts.filter((p) => !p.is_self && p.url);
  }

  _findUser(text) {
    const [first, second] = text.split('\n');
    const userRegex = /(?<user>@[a-zA-Z0-9_]{1,15})/g;
    const array = [...second.matchAll(userRegex)];
    if (array.length) {
      return array[0].groups.user;
    }
    return null;
  }

  async _recognizeImages(urls) {
    return Promise.all(urls.map(async (url) => {
      const result = await this.ocrClient.recognize(url, 'eng');
      return result.data.text;
    }));
  }

  async findTwitterSource(urls) {
    const ocrResults = await this._recognizeImages(urls);
    return ocrResults.map((r) => ({ text: r, username: this._findUser(r) }));
    // eslint-disable-next-line no-restricted-syntax
  }
};
