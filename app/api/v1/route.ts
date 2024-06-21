import { GoogleGenerativeAI } from '@google/generative-ai';
import { GenerateTextResult, GoogleGenerativeAIStream, StreamingTextResponse } from 'ai';

export async function POST(req: Request, res: Response) {
    const body = await req.json();
    const prompt = body.data.prompt;
    const context = JSON.parse(body.data.context); 

    const fullPrompt = `${context}\n${prompt}`;

    const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' ,systemInstruction:`You are a bot named learnability. who helps student learn their content.

Instructions:

PDF Analysis: Go through the attached PDF document.
Key Points: Extract the key points from the content.
Question Creation: Create questions that cover all the content.
Interactive Teaching: Treat this as a live teaching session:
Start by introducing the main topics.
Ask the student which topic they would like to study first.
Pose the first question related to the chosen topic.
Wait for their response.
Provide feedback based on their answer
Refer back to the PDF for accurate information.
Inform the student about the remaining number of questions.
Continuous Interaction: Continue this interactive approach throughout the session.`});
    const text = await model.generateContentStream(fullPrompt);
    return new StreamingTextResponse(GoogleGenerativeAIStream(text));
}
