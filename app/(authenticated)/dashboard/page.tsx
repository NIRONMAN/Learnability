"use client";
import { loadUserFromCookies } from "@/app/GlobalRedux/Features/auth/authSlice";
import { setPdf } from "@/app/GlobalRedux/Features/counter/counterSlice";
import { addSession } from "@/app/GlobalRedux/Features/sessions/sessionsSlice";
import {
  setContextType,
  setIsContextSet,
  setLearningMode,
  updateString,
  updateURL,
} from "@/app/GlobalRedux/Features/string/stringSlice";
import { RootState } from "@/app/GlobalRedux/store";
import learningSystemPrompt from "@/lib/learningSystemPrompt";
import revisionSystemPrompt from "@/lib/revisionSystemPrompt";
import { createSession, uploadPdfToFirebase } from "@/utils/functions";
import { PaperClipOutlined } from "@ant-design/icons";
import { Button, Input, Spin, Upload, message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import removeMarkdown from "markdown-to-text"
const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isLoadingCookie } = useSelector(
    (state: RootState) => state.auth
  );
  const userId = user?.userId;
  const pdfObject = useSelector((state: RootState) => state.counter.file);
  const learningMode = useSelector(
    (state: RootState) => state.string.learningMode
  );
  const contextType = useSelector(
    (state: RootState) => state.string.contextType
  );
  const isContextSet = useSelector(
    (state: RootState) => state.string.isContextSet
  );
  const [localurl, setLocalUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [localContext, setLocalContext] = useState({
    context: "",
    title: "",
  });
  const [opacity, setOpacity] = useState("");
  const [step, setStep] = useState(1);

  useEffect(() => {
    setOpacity("opacity-0")
    const timer = setTimeout(() => {
      setOpacity("opacity-100");
    }, 1000);

    return () => clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    if (!isLoadingCookie && !user) {
      router.replace("/signup-login");
    }
  }, [isLoadingCookie, user, router]);

  

  const handleNavigation = useCallback(async () => {
    if (!userId || !isContextSet) return;

    setIsLoading(true);
    try {
      const sessionId = await createSession(
        {
          fileUrl: localurl,
          sessionType: learningMode,
          contextType: contextType,
          context: localContext.context,
          sessionTitle: removeMarkdown(localContext.title),
          messages: [],
        },
        userId
      );

      dispatch(addSession({ id: sessionId, title: localContext.title }));

      const pathname = `/${learningMode}`;
      const query = { sessionId };
      const queryString = new URLSearchParams(query).toString();
      router.push(`${pathname}?${queryString}`);
    } catch (error) {
      console.error("Failed to create session:", error);
      message.error("Failed to create session. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [
    userId,
    isContextSet,
    localurl,
    learningMode,
    contextType,
    localContext,
    dispatch,
    router,
  ]);

  useEffect(() => {
    handleNavigation();
  }, [isContextSet, handleNavigation]);

  const handleFinalClick = async () => {
    setIsLoading(true);
    try {
      if (contextType === "ytlink") {
        if (localurl) {
          const res = await axios.post("/api/extract", { url: localurl });
          setLocalContext({
            context: res.data.result.context,
            title: res.data.result.title,
          });
        } else {
          throw new Error("No URL provided");
        }
      } else if (contextType === "pdf") {
        const res = await axios.post("/api/pdfExtract", {
          data: { objectUrl: pdfObject },
        });
        setLocalContext({ context: res.data.context, title: res.data.text });
      }
      dispatch(setIsContextSet());
    } catch (error) {
      console.error("Error processing content:", error);
      message.error("Failed to process content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const uploadHandler = async (info: any) => {
    const { file } = info;
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const pdfData = e.target?.result as string;
        dispatch(setPdf(pdfData));
      };
      reader.readAsDataURL(file.originFileObj);
      if (learningMode === "learn") {
        const url = await uploadPdfToFirebase(pdfObject, file.name);
        setLocalUrl(url);
      }
      setStep(4)
    } catch (error) {
      console.error("Error uploading file:", error);
    }

  };

  return (
    <div className="bg-[#363062] flex flex-col justify-center items-center text-[#F5E8C7] h-full ">
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <div className={`opacity-0 transition-opacity duration-1000 ease-in-out ${opacity}`}>
          {step === 1 && (
            <div
              className={`justify-center items-center`}
            >
              <h1 className={` text-4xl font-bold p-4`}>
                What do you want to do today?
              </h1>
              <div className="w-full flex justify-around mb-4">
                <Button
                  onClick={() => {dispatch(setLearningMode("learn"))
                    setStep(2)
                  }}
                  size="large"
                >
                  Learn
                </Button>
                <Button
                  onClick={() => {dispatch(setLearningMode("revise"))
                    setStep(2)
                  }}
                  size="large"
                >
                  Revise
                </Button>
                <Button size="large" 
                onClick={()=>{
                  dispatch(setLearningMode("diagram"))
                  setStep(2)
                }}
                >
                  Create a Mindmap
                </Button>
              </div>
            </div>
          )}
          
         {step===2&&<div className={` justify-center items-center opacity-0 transition-opacity duration-1000 ease-in-out ${opacity}`} >
          <h1 className="mb-2 text-2xl font-bold">Add the resource here</h1>
          <div className="mb-4 flex justify-around">
            <Button
              onClick={() => {dispatch(setContextType("pdf"))
                setStep(3)
              }}
              className="mr-2"
            >
              PDF
            </Button>
            <Button onClick={() => {dispatch(setContextType("ytlink"))
              setStep(3)
            }}>
              YT Link
            </Button>
          </div>
          </div>}
          {
            step===3&&<>
            {(contextType === "pdf") && (
              <div className={`opacity-0 transition-opacity duration-1000 ease-in-out ${opacity}`}>
            <Upload
              accept="application/pdf"
              onChange={uploadHandler}
              showUploadList={false}
              >
              <Button
                icon={
                  <PaperClipOutlined
                  style={{ color: "black", fontSize: "1rem" }}
                  />
                }
                >
                Open a PDF
              </Button>
            </Upload>
                </div>
          )}
          {(contextType === "ytlink") && (
            <div className={"p-4 w-full flex justify-center items-center gap-2"+`opacity-0 transition-opacity duration-1000 ease-in-out ${opacity}`}>
              <Input
                className="w-2/3"
                onChange={(e) => setLocalUrl(e.target.value)}
                placeholder="Enter YouTube URL"
              />
              <Button onClick={() => {dispatch(updateURL(localurl))
                setStep(4)
              }}>
                Submit
              </Button>
            </div>
          )}
            </>
          }
          {step===4&&<div className={"w-full flex justify-center items-center flex-col "+`opacity-0 transition-opacity duration-1000 ease-in-out ${opacity}`}>
            <h1 className=" text-2xl font-bold font-serif">Let's Start</h1>
            <Button onClick={handleFinalClick} className="mt-4">
            Here
          </Button>
          </div>}
        </div>
      )}
    </div>
  );
};

export default Page;
