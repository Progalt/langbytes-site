
import { TaskSnippet } from "./Components/TaskSnippet";
import { IoPerson } from "react-icons/io5";

export default function Home() {

  return (
      <main className="p-5 w-full h-screen flex flex-col justify-center items-center">
        <div className="w-[60%]">
            <TaskSnippet></TaskSnippet>
        </div>
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <div className="w-12 h-12 bg-indigo-500 rounded-full flex justify-center items-center">
            <IoPerson className="text-2xl"/>
          </div>
        </div>
      </main>
  );
}
