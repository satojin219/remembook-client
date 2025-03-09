import { revalidatePath } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

type RevalidatePayload = {
  tag: string;
};

export async function POST(req: NextRequest) {
  const { tag } = (await req.json()) as RevalidatePayload;
  revalidatePath(tag);
  return NextResponse.json({ ok: true }, { status: 200 });
}
