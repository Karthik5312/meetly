import { NextResponse } from 'next/server';
import path from 'path';
import { writeFile } from 'fs/promises';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('video') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = new Uint8Array(await file.arrayBuffer()); // ✅ Fix: Convert to Uint8Array

    // Define upload path
    const uploadDir = path.join(process.cwd(), 'public', 'upload');
    const filePath = path.join(uploadDir, file.name);

    // Save the file
    await writeFile(filePath, bytes); // ✅ Fix: Pass Uint8Array

    return NextResponse.json({ message: 'File uploaded successfully', filePath });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
