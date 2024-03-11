
import { TaskSnippet } from "./Components/TaskSnippet";


export default function Home() {

  return (
      <main className="p-5 h-screen flex flex-col justify-center items-center">
        <div className="w-[60%]">
          <TaskSnippet></TaskSnippet>

        </div>
      </main>
  );
}
