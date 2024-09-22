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





export async function POST(req: NextRequest, res: NextResponse) {
  try {
      const {question} = await req.json();
    
    const pineconeIndex = await setupPineconeIndex();
    const vectorstore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
      maxConcurrency: 5,
    });

    
    const retriever = vectorstore.asRetriever({ k: 8 });
    const ragPrompt = await pull<ChatPromptTemplate>("rlm/rag-prompt");

    const ragChain = RunnableSequence.from([
      {
        context: RunnableSequence.from([
            retriever,
            (documents) => documents.map(doc => doc.pageContent).join('\n\n')
          ]),
        question: new RunnablePassthrough(),
      },
      ragPrompt,
      llm,
      new StringOutputParser(),
    ]);

    const answer = await ragChain.invoke(question);

    return NextResponse.json({ message: answer });
  } catch (error) {
    return NextResponse.json({ message: "There is an error", error });
  }
}