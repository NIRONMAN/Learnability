import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";
import { Pinecone } from "@pinecone-database/pinecone";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "@langchain/core/documents";
import { PineconeStore } from "@langchain/pinecone";
import { pull } from "langchain/hub";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";


const embeddings = new GoogleGenerativeAIEmbeddings({
  modelName: "embedding-001",
  apiKey: process.env.API_KEY5,
});

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  temperature: 0,
  maxRetries: 2,
  apiKey: process.env.API_KEY4,
});

async function setupPineconeIndex() {
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_KEY,
  });
  return pc.Index(
    "niroindex",
    "https://niroindex-kdau6u5.svc.aped-4627-b74a.pinecone.io"
  );
}

async function processPDF(pdf:string) {
  const result = await axios.post(`http://localhost:3000/api/pdfExtract`, {
    data: { objectUrl:
      pdf
     },
  });
  return result.data.context;
}

async function splitAndIndexDocuments(content: string, vectorstore: PineconeStore) {
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0,
  });
  const docOutput = await textSplitter.splitDocuments([
    new Document({ pageContent: content }),
  ]);
  await vectorstore.addDocuments(docOutput);
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
      const body = await req.json();
    const pineconeIndex = await setupPineconeIndex();
    const vectorstore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
      maxConcurrency: 5,
    });

    const pdfContent = await processPDF(body.pdf);
    await splitAndIndexDocuments(pdfContent, vectorstore);

    

    return NextResponse.json({ contentSet:true });
  } catch (error) {
    return NextResponse.json({ message: "There is an error", error });
  }
}