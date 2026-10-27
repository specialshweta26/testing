import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json({ error: "OPENAI_API_KEY is not configured" }, { status: 500 });
  }
  const { messages } = await request.json();
  const result = streamText({ model: openai("gpt-4o-mini"), messages });
  return result.toDataStreamResponse();
}
