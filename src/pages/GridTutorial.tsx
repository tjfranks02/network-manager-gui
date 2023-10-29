/**
 * Just trying to understand CSS grid because I know nothing about it
 */
const GridTutorial = () => {
  return (
    <div>
      {/* 6 rows in a regular grid */}
      <div style={{ display: "grid" }}>
        <div style={{ backgroundColor: "blue"}}>Div 1</div>
        <div style={{ backgroundColor: "pink"}}>Div 2</div>
        <div style={{ backgroundColor: "red"}}>Div 3</div>
        <div style={{ backgroundColor: "lightblue"}}>Div 4</div>
        <div style={{ backgroundColor: "brown"}}>Div 5</div>
        <div style={{ backgroundColor: "yellow"}}>Div 6</div>
      </div>
      <br />
      <br />

      {/* 6 columns of equal width */}
      <div style={{ 
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr"  
      }}>
        <div style={{ backgroundColor: "blue"}}>Div 1</div>
        <div style={{ backgroundColor: "pink"}}>Div 2</div>
        <div style={{ backgroundColor: "red"}}>Div 3</div>
        <div style={{ backgroundColor: "lightblue"}}>Div 4</div>
        <div style={{ backgroundColor: "brown"}}>Div 5</div>
        <div style={{ backgroundColor: "yellow"}}>Div 6</div>
      </div>
      <br />
      <br />
      
      {/* 3 columns */}
      <div style={{ 
        display: "grid",
        gridTemplateColumns: "20% 50% 30%"  
      }}>
        <div style={{ backgroundColor: "blue"}}>Div 1</div>
        <div style={{ backgroundColor: "pink"}}>Div 2</div>
        <div style={{ backgroundColor: "red"}}>Div 3</div>
        <div style={{ backgroundColor: "lightblue"}}>Div 4</div>
        <div style={{ backgroundColor: "brown"}}>Div 5</div>
        <div style={{ backgroundColor: "yellow"}}>Div 6</div>
      </div>
      <br />
      <br />

      {/* Fractional units specify a certain proportion of the screen */}
      <div style={{ 
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr"  
      }}>
        <div style={{ backgroundColor: "blue"}}>Div 1</div>
        <div style={{ backgroundColor: "pink"}}>Div 2</div>
        <div style={{ backgroundColor: "red"}}>Div 3</div>
        <div style={{ backgroundColor: "lightblue"}}>Div 4</div>
        <div style={{ backgroundColor: "brown"}}>Div 5</div>
        <div style={{ backgroundColor: "yellow"}}>Div 6</div>
      </div>
      <br />
      <br />

      {/* 4 columns, 2 rows with 1 incomplete */}
      <div style={{ 
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)"
      }}>
        <div style={{ backgroundColor: "blue"}}>Div 1</div>
        <div style={{ backgroundColor: "pink"}}>Div 2</div>
        <div style={{ backgroundColor: "red"}}>Div 3</div>
        <div style={{ backgroundColor: "lightblue"}}>Div 4</div>
        <div style={{ backgroundColor: "brown"}}>Div 5</div>
        <div style={{ backgroundColor: "yellow"}}>Div 6</div>
      </div>
      <br />
      <br />

      {/* With gaps defined between elements */}
      <div style={{ 
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        rowGap: "10px",
        columnGap: "50px"
      }}>
        <div style={{ backgroundColor: "blue"}}>Div 1</div>
        <div style={{ backgroundColor: "pink"}}>Div 2</div>
        <div style={{ backgroundColor: "red"}}>Div 3</div>
        <div style={{ backgroundColor: "lightblue"}}>Div 4</div>
        <div style={{ backgroundColor: "brown"}}>Div 5</div>
        <div style={{ backgroundColor: "yellow"}}>Div 6</div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default GridTutorial;