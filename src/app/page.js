"use client";

import { Post, PostQuote, PostSection, PostThumbnail } from "./Components/Post";
import SignInEmailPassword from "./Components/SignIn";
import { TaskSnippet } from "./Components/TaskSnippet";




export default function Home() {

  return (
    <main className="p-5 h-screen flex justify-center items-center">
      <TaskSnippet></TaskSnippet>
    </main>
  );
}
