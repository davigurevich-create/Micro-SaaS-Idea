import { NextRequest, NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  try {
    const redis = await getRedis();
    const raw = await redis.get(decodeURIComponent(key));
    return NextResponse.json({ value: raw ? JSON.parse(raw) : null });
  } catch (err) {
    console.error("GET /api/data failed", err);
    return NextResponse.json({ value: null, error: "unavailable" }, { status: 503 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  try {
    const body = await req.json();
    const redis = await getRedis();
    await redis.set(decodeURIComponent(key), JSON.stringify(body));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("PUT /api/data failed", err);
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });
  }
}
