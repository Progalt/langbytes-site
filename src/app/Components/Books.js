import { useEffect, useState } from 'react';
import { PostDividor } from './Post';

const https = require('https');


function getBookInfo(isbn) {
    return new Promise((resolve, reject) => {
        const url = `https://openlibrary.org/isbn/${isbn}.json`;

        https.get(url, (response) => {
            let data = '';

            // A chunk of data has been received
            response.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received
            response.on('end', () => {
                if (response.statusCode === 200) {
                    const bookInfo = JSON.parse(data);
                    console.log(data);
                    resolve(bookInfo);
                } else {
                    reject(new Error(`Failed to fetch book information. Status code: ${response.statusCode}`));
                }
            });
        }).on("error", (error) => {
            reject(error);
        });
    });
}

function fetchAuthor(authorKey) {
    return fetch(`https://openlibrary.org${authorKey}.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch author information');
        }
        return response.json();
      });
  }

export function BookPage({ isbn }) {

    const [bookLoaded, setBookLoaded] = useState(false);
    const [bookTitle, setBookTitle] = useState("");
    const [authors, setAuthors] = useState([]);
    const [synopsis, setSynopsis] = useState("");
    
    let bookCover = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`

    useEffect(() => {
        getBookInfo(isbn)
          .then((bookInfo) => {
            setBookTitle(bookInfo.title);

           
           
                // Check if authors exist before fetching
            if (bookInfo.authors && bookInfo.authors.length > 0) {
                const authorPromises = bookInfo.authors.map(author => {
                return fetchAuthor(author.key);
                });
    
                Promise.all(authorPromises)
                .then(authorInfos => {
                    const authorNames = authorInfos.map(authorInfo => authorInfo.name);
                    setAuthors(authorNames);
                    setBookLoaded(true);
                })
                .catch((error) => {
                    console.error('Error fetching author information:', error);
                });
            }
            
            if (bookInfo.description) {
                setSynopsis(bookInfo.description.value);
            }
            
            setBookLoaded(true);
            
          })
          .catch((error) => {
            console.error('Error fetching book information:', error);
          });
      }, [isbn]);

    return (
        <>
        {bookLoaded ? (
            <div className="flex justify-center">
                <div className="flex w-[70%]">
                    <img style={{ borderRadius: '0.75rem' }}  src={bookCover} alt={`${bookTitle} Cover`}></img>
                    <div className="ml-8">
                        <h1 className="font-light text-4xl mb-6">{bookTitle}</h1>
                        <p><span className="font-light">By </span> <span className="italic font-bold">{authors.join(", ")}</span></p>
                        <p className="font-light">{synopsis}</p>
                    </div>
                </div>
            </div>
        ) : (
            <p>Loading book...</p>
        )}
        </>
    );
}