class DataWrapper {
  data: {
    [key: string]: any;
  };
  [key: string]: any;

  constructor(data = {}) {
    this.data = data;
    this._keysFromData();
  }

  get keys() {
    return Object.keys(this.data);
  }

  _keysFromData() {
    Object.keys(this.data).forEach((key) => (this[key] = this.data[key]));
  }
}

export { DataWrapper };
