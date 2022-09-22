class BaseModel {
  data: Record<string, unknown>;
  [key: string]: unknown;

  constructor(data = {}) {
    this.data = data;
    this._keysFromData();
  }

  get keys() {
    return Object.keys(this.data);
  }

  get entries() {
    return Object.entries(this.data);
  }

  _keysFromData() {
    this.entries.forEach(([key, value]) => (this[key] = value));
  }
}

export { BaseModel };
