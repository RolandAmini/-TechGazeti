import { NextResponse } from "next/server";
import Follower from "@/models/Follower";
import connectDB from "@/utils/mongodb";

export async function GET() {
  try {
    await connectDB();
    const followers = await Follower.find().sort({ date: -1 }); // derniers d'abord
    return NextResponse.json(followers);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch followers" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newFollower = await Follower.create(body);
    return NextResponse.json(newFollower, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add follower" }, { status: 500 });
  }
}
