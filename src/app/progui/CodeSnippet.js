import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { cn } from "./utils"

import darkTheme from 'react-syntax-highlighter/dist/esm/styles/hljs/dracula';
import lightTheme from 'react-syntax-highlighter/dist/esm/styles/hljs/gruvbox-light';

export default function CodeSnippet({ className, language = "", nobackground = false, light = false, children }) {

    let styles = cn(
        "rounded-xl px-4 py-2",
        nobackground === false ? " bg-background-hover" : "",
        language === "" ? "py-5 block overflow-x-auto" : "",
        className
    );
    
    // This uses react syntax highlighter internally at the moment
    // TODO: Create my own
    return (
        <div className={styles}>
            { language !== "" &&
                <SyntaxHighlighter language={language} customStyle={{
                    backgroundColor: "transparent",
                    paddingLeft: '0',
                }} style={light ? lightTheme : darkTheme}>
                    {children}
                </SyntaxHighlighter>
            }
            {
                language === "" &&
                <code className="whitespace-pre">{children}</code>
            }
        </div>
    )
}