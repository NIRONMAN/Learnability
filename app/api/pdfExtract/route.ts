// pages/api/extract-text.ts
import { NextRequest, NextResponse } from 'next/server';
import pdf from 'pdf-parse';

// type Data = {
//   text: string;
//   error?: string;
// };

export async function POST(req: NextRequest, res: NextResponse) {
    
    const body=await req.json();
    const  objectUrl  =  body.data.objectUrl;
    console.log()
    
    if (!objectUrl) {
        NextResponse.json({ text: '', error: 'Object URL is required' });
        return;
    }

  try {
    const base64Regex = /^data:application\/pdf;base64,/;
  let pdfBuffer: Buffer;

  if (base64Regex.test(objectUrl)) {
    const base64Data = objectUrl.replace(base64Regex, '');
    pdfBuffer = Buffer.from(base64Data, 'base64');
  } else {
    throw new Error('Invalid data URL');
  }
  
  const data=await pdf(pdfBuffer)
  console.log(data)
   

    const extractedText = data.text;
    return NextResponse.json({ text: extractedText });
  } catch (error) {
    console.log(error)
    NextResponse.json({ text: '', error: error.message });
  }
}


