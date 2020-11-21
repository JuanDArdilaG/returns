import { IError } from "./Failed.js";

interface IResponse {
  data: any;
  errors: Array<IError>;
  metadata: any;
  hasErrors: () => boolean;
}

class Response {
  static mongooseerrors = {
    "11000": "duplicate key error",
  };

  // Variables used to store the errors and the metadata before success response
  private static _tempErrors: Array<IError> = new Array<IError>();
  private static _tempMetaData: any;

  static error(error: IError): void {
    this._tempErrors.push(error);
  }

  static addMeta(key: string | number, value: any) {
    this._tempMetaData[key] = value;
  }

  static failed(finalError: IError | null = null): IResponse {
    if (finalError) {
      this.error(finalError);
    }
    const { tempE } = this.cleanup();

    return {
      data: null,
      errors: tempE,
      metadata: null,
      hasErrors: (): boolean => tempE.length > 0,
    };
  }

  //**
  // Function used to return Response Object and cleanup temp variables
  //**
  static success(data: any): IResponse {
    const { tempE, tempM } = this.cleanup();
    return {
      data,
      errors: tempE,
      metadata: tempM,
      hasErrors: (): boolean => tempE.length > 0,
    };
  }

  private static cleanup() {
    const tempE = this._tempErrors;
    const tempM = this._tempMetaData;
    this._tempErrors = new Array<IError>();
    this._tempMetaData = {};

    return {
      tempE,
      tempM,
    };
  }
}

export default Response;
export { IResponse };

interface IMongooseError {
  name: string;
  code: string | number;
}
