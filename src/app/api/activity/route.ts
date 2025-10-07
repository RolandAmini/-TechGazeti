import { NextResponse } from "next/server";
import Activity from "@/models/Activity";
import connectDB from "@/utils/mongodb";

export async function GET() {
  await connectDB();
  const activities = await Activity.find().sort({ createdAt: -1 }).limit(10);
  return NextResponse.json(activities);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const newActivity = await Activity.create(body);
  return NextResponse.json(newActivity, { status: 201 });
}
