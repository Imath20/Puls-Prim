
// Set up SVG dimensions
const width = window.innerWidth;
const height = window.innerHeight;
const center = { x: width / 2, y: height / 2 };

const zoom = d3.zoom()
    .scaleExtent([0.1, 10]) // Min/max zoom levels
    .filter(event => {
        // Prevent default wheel behavior
        if (event.type === 'wheel') {
          event.preventDefault();
        }
        // Allow all other events
        return true;
    })
    .on("zoom", (event) => {
        // Apply transform to the entire SVG
        // console.log('yes')
        // gridGroup.attr("transform", `scale(${event.transform.k})`)
        gridGroup.attr("transform", event.transform);
            // .attr("width", `${window.innerWidth}px`)
            // .attr("height", `${window.innerHeight}px`)
    });

// Apply zoom to SVG
svg.call(zoom);