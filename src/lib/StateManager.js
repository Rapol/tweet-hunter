module.exports = class StateManager {
  constructor(state, blobClient) {
    this.state = state;
    this.blobClient = blobClient;
  }

  getSubreddits() {
    return Object.keys(this.state.subreddits);
  }

  static async buildStateManager(blobClient) {
    const stateBlob = await blobClient.getObject('state.json');
    return new StateManager(JSON.parse(stateBlob), blobClient);
  }
};
