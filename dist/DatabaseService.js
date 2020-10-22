"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = exports.Response = exports.responseSchema = void 0;
const Mongoose = require("mongoose");
const mongooseSettings = {
    useNewUrlParser: true,
    // useFindAndModify: true,
    useUnifiedTopology: true,
};
exports.responseSchema = new Mongoose.Schema({
    information: String
});
exports.Response = Mongoose.model("Response", exports.responseSchema);
class DatabaseService {
    constructor() {
        this.uri = "mongodb://trading:secret@127.0.0.1:27017/";
        this.initConncetion = () => Mongoose.connect(this.uri, mongooseSettings);
        this.openConnection = () => this.database.once('open', () => console.log("db connection open"));
        this.saveResponse = (response) => new exports.Response({ information: response }).save();
        this.initConncetion();
        this.database = Mongoose.connection;
        this.openConnection();
    }
    static getInstance() {
        if (this.databaseService === undefined)
            this.databaseService = new DatabaseService;
        return this.databaseService;
    }
    findResponse(responseCallback) {
        exports.Response.findOne({}, function (err, response) { responseCallback(response); }).exec();
    }
}
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=DatabaseService.js.map