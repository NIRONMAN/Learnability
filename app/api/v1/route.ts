import { GoogleGenerativeAI } from '@google/generative-ai';
import { GenerateTextResult, GoogleGenerativeAIStream, StreamingTextResponse } from 'ai';

export async function POST(req: Request, res: Response) {
    const body = await req.json();
    const prompt = body.data.prompt;
    const context = JSON.parse(body.data.context); 

    const fullPrompt = `${context}\n${prompt}`;

    const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const text = await model.generateContentStream(fullPrompt);
    return new StreamingTextResponse(GoogleGenerativeAIStream(text));
}
