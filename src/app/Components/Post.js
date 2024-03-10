
import React from "react";

export function PostSection({ header, children }) {
    return (
        <div id={header} className="mt-4">
            { header !== undefined &&
                <h1 className="font-light text-3xl mb-2"><span className="text-slate-500"># </span>{header}</h1>
            }
            {children}
        </div>
    );
}

export function PostImage({ src, subtext }) {
    return (
        <div>
            
        </div>
    );
}

export function PostQuote( { children, speaker }) {
    return (
        <div className="m-5 mt-8 flex">
            <p className="font-bold text-5xl text-slate-500 mt-[-0.1em] mr-2">&ldquo;</p>
            <p className="font-light text-2xl text-white">{children}</p>
            <p className="font-bold text-5xl text-slate-500 mt-3 ml-2">&rdquo;</p>
            {
                speaker !== undefined && 
                <p className="mt-[0.8em] ml-2 font-light italic"> - {speaker}</p>
            }
        </div>
    )
}

export function PostDividor() {
    return <hr className="mt-7 mb-7 border-slate-800 border-t-2" />
}

export function Post({title, topic, publishDate, author, readTime, children }) {

    const handleScroll = (e) => {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    };

    const contentsContent = React.Children.map(children, (child, index) => {
        if (child.type === PostSection) {
            const header = child.props.header;
            return (
                <li key={header}>
                    <div className="flex items-center ml-12">
                        <p className="text-slate-500 mr-3 font-bold ">{index + 1}. </p>
                        <a onClick={handleScroll} href={`#${header}`} className="contents-link text-lg hover:translate-x-2 transition duration-300">{header}</a>
                    </div>
                </li>
            );
        }
        return null;
      });
    

    return (
        <div className="flex mt-10 justify-center">
            <section className=" max-w-4xl w-[70%]">
                <div className="flex items-center mb-5">
                    <h2 className="text-sm font-bold mr-5">{topic}</h2>
                    { 
                        publishDate !== undefined && 
                        <h2 className="text-sm font-light mr-5">Published on {publishDate}</h2>
                    }
                    {
                        readTime !== undefined &&
                        <h2 className="text-sm font-light">
                            <span className="font-bold">{readTime}</span> read
                        </h2>
                    }
                </div>
                <h1 className="text-5xl font-light mb-5">{title}</h1>
                <div className="text-right">
                    <h2 className="font-light">By <span className="font-bold">{author}</span></h2>
                </div>
                
                {
                    contentsContent.length > 1 && 
                    <div id="contents" className="mt-6">
                       <PostDividor />
                        <div className="flex items-center">
                            <h2 className="text-3xl font-light mb-2"><span className="text-slate-500"># </span>Contents</h2>
                        </div>
                        
                        <nav>
                            <ul className="contents-list">
                                {contentsContent}
                            </ul>
                        </nav>
                        <PostDividor />
                    </div>
                }
                <div className="mt-5">
                    {children}
                </div>
            </section>
           
        </div>
    );
}       

export function PostThumbnail({ title, topic, date, author, onClick }) {
    return (
        <div className="mb-5 mt-5 w-full border-2 border-slate-800 rounded-lg p-2 pl-4 pr-4 hover:scale-[102%] transition duration-300 ease-in-out hover:cursor-pointer" onClick={onClick}>
            <div className="flex mb-2">
                <h2 className="font-bold mr-3">{topic}</h2>
                {
                    date !== undefined && 
                    <h2 className="font-light">Published on {date}</h2>
                }
            </div>
            <h1 className="text-2xl font-light">{title}</h1>
            <div className="text-right">
                    <h2 className="font-light">By <span className="font-bold">{author}</span></h2>
                </div>
        </div>
    );

}