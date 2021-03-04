import mongoose from 'mongoose';
import '../config/config'

const dbConnection = async() : Promise<void> => {
    try {
        await mongoose.connect(String(process.env.URL_DB), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
        });
        
        console.log('DB connection success');
    } catch (error) {
        console.log(error);
        throw new Error("Error to initialized database");
    };
};

export default dbConnection;