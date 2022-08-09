import { MongoClient, MongoClientOptions } from "mongodb";

export default class MongoService {
    static client: MongoClient = new MongoClient(process.env.MONGODB_URI as string);

    static isConnected = false;
    static connectionOptions: MongoClientOptions;
    static certFile: string = (process.env.NODE_ENV == 'prod') ? (process.env.CERT_FILE as string) : (process.env.DEV_CERT_FILE as string);

    static async connect(){
        if(!MongoService.isConnected){
            MongoService.connectionOptions = {
                tlsCertificateKeyFile: MongoService.certFile,
                serverSelectionTimeoutMS: 5000
            }
            MongoService.client = new MongoClient(process.env.MONGODB_URI as string, MongoService.connectionOptions);

            await MongoService.client.connect();
            console.log('MongoDB connected');
        }
    }

    static async getInstance(){
        if(!MongoService.isConnected){
            await MongoService.connect();
        }
        return MongoService.client;
    }
}