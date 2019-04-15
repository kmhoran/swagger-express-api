interface IPrarmeter {
  name: string;
  foundIn: string;
  description: string;
  required: boolean;
  type: string;
  // format?: string;
}

export default class SwagRoute {
  public _path: string;
  public _method: string;
  public _parameters: IPrarmeter[];
  public SwagRoute({
    path,
    method,
    parameters
  }: {
    path: string;
    method: string;
    parameters: IPrarmeter[];
  }) {
    if (path) { this._path = path; }
    if (method) { this._method = method; }
    if (parameters) { this._parameters = parameters; } else { this._parameters = []; }
  }

  public path(p: string) {
    this._path = p;
    return this;
  }

  public mehthod(m: string) {
    this._method = m.toUpperCase();
    return this;
  }

  public addParameter(param: IPrarmeter) {
    this._parameters.push(param);
    return this;
  }

  public print() {
    console.log(`${this._method} ${this._path}`);
    this._parameters.forEach((p) => {
      console.log(p);
    });
    return this;
  }
}
