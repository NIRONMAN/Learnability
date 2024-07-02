import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { GenerateTextResult, GoogleGenerativeAIStream, StreamingTextResponse } from 'ai';

export async function POST(req: Request, res: Response) {
    const body = await req.json();
    const systemPrompt=body.data.systemPrompt;
    const prompt = body.data.prompt;
    const context = body.data.context; 

    const fullPrompt = `${context}\n${prompt}`;

    const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
    const safetySetting = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category:HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_NONE
        },
        {
            category:HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE
        }
      ];
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' ,systemInstruction:systemPrompt,safetySettings:safetySetting,});
    const text = await model.generateContentStream(fullPrompt);
    return new StreamingTextResponse(GoogleGenerativeAIStream(text));
}