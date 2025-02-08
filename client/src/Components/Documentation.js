import React, { useEffect, useRef, useState } from 'react';
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
  const flipbookRef = useRef(null);

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

  const [dimensions, setDimensions] = useState({ width: 500, height: 707 });

  useEffect(() => {
    function updateDimensions() {
      const screenWidth = window.innerWidth;

      if (screenWidth > 800) {
        // Use default dimensions for larger screens
        setDimensions({ width: 500, height: 707 });
      } else {
        // Calculate dimensions for smaller screens based on A4 aspect ratio
        const responsiveWidth = screenWidth * 0.9; // 90% of the screen width
        const responsiveHeight = responsiveWidth * 1.414; // A4 aspect ratio
        setDimensions({ width: responsiveWidth, height: responsiveHeight });
      }
    }

    // Update dimensions initially and on window resize
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const flipToNextPage = () => {
    if (currentPage < numPages) {
      flipbookRef.current.pageFlip().flipNext(['top']);
      setCurrentPage(currentPage + 1);
    }
  };

  const flipToPrevPage = () => {
    if (currentPage > 1) {
      flipbookRef.current.pageFlip().flipPrev(['top']);
      setCurrentPage(currentPage - 1);
    }
  };


  console.log(flipbookRef.current); // Check if the reference is valid




  return (
    <div className="flipbook-container">
      {file ? (
        <div className='view-download'>
          <a href={file} download className="btn">
            Download PDF
          </a>
          <div className="page-navigation">
          <button onClick={flipToPrevPage} disabled={currentPage === 1} className="btn" style={{ marginRight: '10px' }}>
              Prev Page
            </button>
            <button onClick={flipToNextPage} disabled={currentPage === numPages} className="btn">
              Next Page
            </button>
          </div>

          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            {numPages && (
              <>
                <HTMLFlipBook
                ref={flipbookRef}
                  width={dimensions.width}
                  height={dimensions.height}
                  showCover={false}
                  mobileScrollSupport={true}
                  onFlip={handleFlip}
                  className='flipbook'  // Flipbook styling
                  
                >
                  {[...Array(numPages).keys()].map((pNum) => (
                    <Pages key={pNum} number={pNum + 1} className="flipbook-page">
                      <Page
                        pageNumber={pNum + 1}
                        width={dimensions.width}
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
