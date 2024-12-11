import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const videoPath = path.join(process.cwd(), "app", "assets", "videos", slug + ".mp4");

  const headers = {
    "Content-Type": "video/mp4",
    "Content-Length": String(fs.statSync(videoPath).size),
    "Accept-Ranges": "bytes",
  };

  const stream = fs.createReadStream(videoPath);
  const buffer = await streamToBuffer(stream);

  return new NextResponse(buffer, { headers });
}

// Helper function to convert stream to buffer
function streamToBuffer(stream: fs.ReadStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk) => {
      if (typeof chunk === "string") {
        chunk = Buffer.from(chunk);
      }
      chunks.push(chunk);
    });
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}
