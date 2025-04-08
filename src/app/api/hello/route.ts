import { NextResponse } from 'next/server';

export async function GET() {
  console.log("Hello from the API!");
  return NextResponse.json({ message: "Hello from the API!" });
} 