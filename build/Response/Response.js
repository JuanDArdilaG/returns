class Response {
    static error(error) {
        this._tempErrors.push(error);
    }
    static addMeta(key, value) {
        this._tempMetaData[key] = value;
    }
    static failed(finalError = null) {
        if (finalError) {
            this.error(finalError);
        }
        const { tempE } = this.cleanup();
        return {
            data: null,
            errors: tempE,
            metadata: null,
            hasErrors: () => tempE.length > 0,
        };
    }
    static success(data) {
        const { tempE, tempM } = this.cleanup();
        return {
            data,
            errors: tempE,
            metadata: tempM,
            hasErrors: () => tempE.length > 0,
        };
    }
    static cleanup() {
        const tempE = this._tempErrors;
        const tempM = this._tempMetaData;
        this._tempErrors = new Array();
        this._tempMetaData = {};
        return {
            tempE,
            tempM,
        };
    }
}
Response.mongooseerrors = {
    "11000": "duplicate key error",
};
Response._tempErrors = new Array();
export default Response;
//# sourceMappingURL=Response.js.map