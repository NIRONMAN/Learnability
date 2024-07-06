// // app/api/extract/route.ts
// import toWav from "audiobuffer-to-wav"
// import { NextRequest, NextResponse } from 'next/server';
// import ytdl from 'ytdl-core';
// import fetch from 'node-fetch';
// import fs from 'fs';
// import path from 'path';

// export async function POST(req: NextRequest) {
//   const url  = "https://youtube.com/shorts/mmK0vV_Efs0?si=yyrZHipZ0bAqCvoY"
//   try {
//     const info = await ytdl.getInfo(url);
//     const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
//     const audioUrl = audioFormats[0].url;
//     // const audioResponse = await fetch(audioUrl);
    
//     // console.log(audioFormats)
//     // // console.log(audioResponse.body)
//     // let audioBuffer = await audioResponse.buffer();

//     // // console.log(audioBuffer);

//     // const dir = path.resolve('public', 'audio');
//     // if (!fs.existsSync(dir)) {
  //     //   fs.mkdirSync(dir, { recursive: true });
  //     // }
  
  //     // const filePath = path.join(dir, 'audio.webm');
  //     // fs.writeFileSync(filePath,audioBuffer);
  
  //     // console.log("in req")
  //     // const newAudio=new File(audioBuffer,"audio.mp3")
  //     return NextResponse.json({ uri:audioUrl });
  //   } catch (error) {
    //     console.log(error)
    //     return NextResponse.json({ error: 'Failed to extract and download audio' }, { status: 500 });
    //   }
    // }
    
    
    
import { GoogleAIFileManager } from "@google/generative-ai/files";
import { NextRequest, NextResponse } from 'next/server';
import ytdl from 'ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/utils/firebase';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({
  // The Gemini 1.5 models are versatile and work with multimodal prompts
  model:"gemini-1.5-pro",
  generationConfig: { responseMimeType: "application/json" }, 
});

export async function POST(req: NextRequest) {
  const body = await req.json()
  const url = body.url;

  const ffmpegPath = path.resolve('bin', 'ffmpeg');
  ffmpeg.setFfmpegPath(ffmpegPath);

  try {
    const outputDir = path.resolve('./public/audio');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputFilePath = path.join(outputDir, 'audio.mp3');

    await new Promise((resolve, reject) => {
      const stream = ytdl(url, { filter: 'audioonly' });

      ffmpeg(stream)
        .audioBitrate(128)
        .toFormat('mp3')
        .on('end', () => {
          console.log('Download and conversion finished.');
          resolve(null);
        })
        .on('error', (err) => {
          console.error('Error:', err);
          reject(err);
        })
        .save(outputFilePath);
    });
    ///Now the gemini part


const fileManager = new GoogleAIFileManager(process.env.API_KEY);

const uploadResult = await fileManager.uploadFile(outputFilePath, {
  mimeType: "audio/mp3",
  displayName: "Sample youtube audio",
});

console.log(`Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`);
    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResult.file.mimeType,
          fileUri: uploadResult.file.uri
        }
      },
      { text: "Give the response in following schema and also exclude markdown just give plain text inside the respective value attribute of the key: "+JSON.stringify({
        title:"A suitable title which sums up the contents in the audio",
        context:"summary of the audio in full detail."
        
      })},
    ]);

    ///
    
    fs.unlinkSync(outputFilePath)
    await fileManager.deleteFile(uploadResult.file.name);
console.log(`Deleted ${uploadResult.file.displayName}`);
    // console.log(JSON.parse(result.response.candidates[0].content.parts[0].text))
    return NextResponse.json({ result:JSON.parse(result.response.candidates[0].content.parts[0].text) });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to extract and download audio' }, { status: 500 });
  }
}
