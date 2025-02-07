import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import HTMLFlipBook from 'react-pageflip';
import { Document, Page, pdfjs } from 'react-pdf';
import flipAudio from './Images/AUDIO-2025-02-07-17-56-20.mp3'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// Page Component
const Pages = React.forwardRef((props, ref) => (
  <div className="demoPage" ref={ref}>
    {props.children}
  </div>
));

Pages.displayName = 'Pages';

export default function Documentation() {

  const flipSound = new Audio(flipAudio);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const file = queryParams.get('file'); // Get the file link from URL

  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function handleFlip(event) {
    flipSound.play().catch((e) => console.error("Audio play error:", e));
    setCurrentPage(event.data + 1);
  }

  return (
    <div className="flipbook-container">
      {file ? (
        <div className='view-download'>
          <a href={file} download className="btn">
            Download PDF
          </a>
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            {numPages && (
              <>
                <HTMLFlipBook
                  width={500}
                  height={707}
                  showCover={false}
                  mobileScrollSupport={true}
                  onFlip={handleFlip}
                  className='flipbook'  // Flipbook styling
                >
                  {[...Array(numPages).keys()].map((pNum) => (
                    <Pages key={pNum} number={pNum + 1} className="flipbook-page">
                      <Page
                        pageNumber={pNum + 1}
                        width={500}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                        className="pdf-page"  // Individual PDF Page styling
                      />
                    </Pages>
                  ))}
                </HTMLFlipBook>

                <div className="page-indicator">
                  Page {currentPage} / {numPages}
                </div>
              </>
            )}
          </Document>
        </div>

      ) : (
        <h3>No Document Selected</h3>
      )}
    </div>
  );
}
