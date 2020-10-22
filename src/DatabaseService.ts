import Mongoose = require("mongoose");

const mongooseSettings = {
    useNewUrlParser: true,
    // useFindAndModify: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
}

export interface IResponse extends Mongoose.Document {
    information: string,
}

export const responseSchema = new Mongoose.Schema({ 
    information: String
})

export const Response = Mongoose.model<IResponse>("Response", responseSchema);

export class DatabaseService {

    private static databaseService: DatabaseService;

    private constructor() {
        this.initConncetion();
        this.database = Mongoose.connection;
        this.openConnection();
    }
    
    public static getInstance() {
        if (this.databaseService === undefined) 
            this.databaseService = new DatabaseService;
        return this.databaseService;
    }

    private readonly database: Mongoose.Connection;
    private readonly uri = "mongodb://trading:secret@127.0.0.1:27017/";
    
    private initConncetion = () => Mongoose.connect(this.uri, mongooseSettings);
    private openConnection = () => this.database.once('open', () => console.log("db connection open"));

    

    public saveResponse = (response: string) => new Response({ information: response }).save();

    public findResponse(responseCallback: (response: IResponse | null) => void) { 
        Response.findOne({}, function(err, response: IResponse | null) { responseCallback(response) }).exec();
    }
    
}