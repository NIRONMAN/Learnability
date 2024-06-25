import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

interface CreateTypes {
    sessionId?: string;
    messages: any;
}

// Create a new session
const createSession = async (sessionData: CreateTypes): Promise<string | null> => {
    try {
        const sessionCollectionRef = collection(db, "sessions");
        const sessionDocRef = await addDoc(sessionCollectionRef, sessionData);
       
        return sessionDocRef.id;
    } catch (error) {
        console.log("Error creating session:", error);
        return null;
    }
};

// Get session data based on session ID
const getSession = async (sessionId: string): Promise<any> => {
    try {
        const docSnap = await getDoc(doc(db, "sessions", sessionId));
        if (docSnap.exists()) {
            // console.log("this is data")
            // console.log(docSnap.data().messages)
            return docSnap.data().messages ;
        } else {
            console.log("History not found");
            return undefined;
        }
    } catch (error) {
        console.log("Error getting session:", error);
        return undefined;
    }
};

// Update an existing session
const updateSession = async (sessionData: CreateTypes): Promise<boolean> => {
    if (!sessionData.sessionId) {
        console.log("Session ID is required for updating");
        return false;
    }

    try {
        const sessionRef = doc(db, 'sessions', sessionData.sessionId);
        await updateDoc(sessionRef, {
            messages: sessionData.messages
        });
        return true;
    } catch (error) {
        console.log("Error updating session:", error);
        return false;
    }
};

//Fucntions for hsitory
interface historyProp{
    sessionId:string
    title:string
}
const updateHistory = async (array: historyProp[]): Promise<boolean> => {
    try {
      const historyRef = doc(db, "history4Context", "historyDoc"); // Refer to a specific document within the collection
      await setDoc(historyRef, { history: array }, { merge: true }); // Wrap the array in an object
      return true;
    } catch (error) {
      console.error("Error updating history:", error);
      return false;
    }
  };

const getHistory=async ():Promise<any>=>{
    const docSnap=await getDoc(doc(db,"history4Context","historyDoc"));
    if(docSnap.exists()){
        console.log(docSnap.data())
        return docSnap.data().history
    }
    else{
        return null
    }
}
export { createSession, getSession, updateSession,updateHistory,getHistory };
export type { CreateTypes };
