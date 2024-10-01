import { connectDB } from "@/lib/config/db";
import ToDoModel from "@/lib/model/ToDoModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
    await connectDB()
}

LoadDB();

export async function GET(req) {
    const todos = await ToDoModel.find({})
    return NextResponse.json({data:todos,msg:'GET method'})
}

export async function POST(req) {

    const {title,description} = await req.json();
    await ToDoModel.create({
        title,
        description
    })
    return NextResponse.json({msg:'Todo created'});
}


export async function DELETE(req) {
    const mongoId = await req.nextUrl.searchParams.get('mongoId')
    await ToDoModel.findByIdAndDelete(mongoId)
    return NextResponse.json({msg:'Todo Deleted'})
}

export async function PUT(req) {
    const mongoId = await req.nextUrl.searchParams.get('mongoId')
    await ToDoModel.findByIdAndUpdate(mongoId,{iscompleted:true})
    return NextResponse.json({msg:'Todo Completed'})
}