import mongoose from 'mongoose'

const uri = 'mongodb+srv://mahdirasooli:project1234@cluster0.sr4dt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' 

export const connectDB = async () => {
    try {

        mongoose.connect(uri)
        console.log('DB connected');

    } catch (error) {
        console.log('Error');
    }
}

