import { useEffect, useState } from "react";
import * as icons from "./images/icons";

function validate(position,boardState){
  if(position[0] < 0 || position[0] > 7 || position[1] < 0 || position[1] > 7) return -1;

  if(boardState[position[0]][position[1]]) return 1;

  return 0;
} 



function check(start,boardState){
    if((!start[0] && !start[1]) || !boardState[start[0]][start[1]]) return start;
    
    const piece = boardState[start[0]][start[1]].slice(2);
    let allowableTiles = [start];

    if(piece === "pawn"){
      for(const [dr,dc] of [[-1,-1],[-1,1]]){
        if(validate([start[0]+dr,start[1]+dc],boardState) !== 1 || boardState[start[0]+dr][start[1]+dc][0] === 'w') continue;
        allowableTiles.push([start[0]+dr,start[1]+dc]);
      }
      const moves = start[0] === 6 ? [[-1,0],[-2,0]] : [[-1,0]];
      for(const [dr,dc] of moves){
        if(validate([start[0]+dr,start[1]+dc],boardState) !== 0) break;
        allowableTiles.push([start[0]+dr,start[1]+dc]);
      }
    }

    else if (piece === "knight"){
      const moves = [[-2,1],[-2,-1],[2,1],[2,-1],[1,-2],[-1,-2],[1,2],[-1,2]];
      moves.forEach(([dr,dc])=>{
        if(validate([start[0]+dr,start[1]+dc],boardState) === 1 && boardState[start[0]+dr][start[1]+dc][0] === 'w') return;
        allowableTiles.push([start[0]+dr,start[1]+dc])
      })
    }

    else if (piece === "king"){
      const moves = [[0,-1],[-1,1],[0,1],[1,1],[1,0],[-1,-1],[-1,0],[1,-1]];
      moves.map(([dr,dc])=>(
        allowableTiles.push([start[0]+dr,start[1]+dc])
      ))
    }

    else if (piece === "rook"){
      const moves = [[-1,0],[0,1],[1,0],[0,-1]];
      for (const move of moves){
        let [nr,nc] = [start[0]+move[0],start[1]+move[1]];
        while(nr >= 0 && nr < 8 && nc >= 0 && nc < 8){
          if(boardState[nr][nc]) break;
          allowableTiles.push([nr,nc]);
          nr += move[0];
          nc += move[1]; 
        }
      }
    }

    else if (piece === "bishop"){
      const moves = [[-1,1],[-1,-1],[1,1],[1,-1]];
      for (const move of moves){
        let [nr,nc] = [start[0]+move[0],start[1]+move[1]];
        while(nr >= 0 && nr < 8 && nc >= 0 && nc < 8){
          if(boardState[nr][nc]) break;
          allowableTiles.push([nr,nc]);
          nr += move[0];
          nc += move[1]; 
        }
      }
    }

    else {
      let moves = [[-1,0],[0,1],[1,0],[0,-1]];
      for (const move of moves){
        let [nr,nc] = [start[0]+move[0],start[1]+move[1]];
        while(nr >= 0 && nr < 8 && nc >= 0 && nc < 8){
          if(boardState[nr][nc]) break;
          allowableTiles.push([nr,nc]);
          nr += move[0];
          nc += move[1]; 
        }
      }

      moves = [[-1,1],[-1,-1],[1,1],[1,-1]];
      for (const move of moves){
        let [nr,nc] = [start[0]+move[0],start[1]+move[1]];
        while(nr >= 0 && nr < 8 && nc >= 0 && nc < 8){
          if(boardState[nr][nc]) break;
          allowableTiles.push([nr,nc]);
          nr += move[0];
          nc += move[1]; 
        }
      }
    }

    return allowableTiles;
}


function Piece({onTilePiece}){
  // let source = "./images/icons/" + onTilePiece +".png";
  // console.log(source);

  if(onTilePiece){
    return(
    <img src={icons[onTilePiece]} className="icons"/>
    );
  }
  
}


function Tile({isWhite,onBoardPiece,onhandleClick,onActive}){
  if(isWhite){
    return(
      <div className={`tile-style-white ${onActive? 'active' : ''}`} onClick={onhandleClick}>
        <Piece onTilePiece = {onBoardPiece} />
      </div>
    );
  }else{
    return(
      <div className={`tile-style-wood ${onActive? 'active' : ''}`} onClick={onhandleClick}>
        <Piece onTilePiece = {onBoardPiece} />
      </div>
    );
  }
}

function Board(){
  const[start,setStart] = useState(Array(2).fill(null));
  const[boardState, setBoardState] = useState([
    ["b_rook","b_knight","b_bishop","b_queen","b_king","b_bishop","b_knight","b_rook"],
    ["b_pawn","b_pawn","b_pawn","b_pawn","b_pawn","b_pawn","b_pawn","b_pawn"],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    ["w_pawn","w_pawn","w_pawn","w_pawn","w_pawn","w_pawn","w_pawn","w_pawn"],
    ["w_rook","w_knight","w_bishop","w_queen","w_king","w_bishop","w_knight","w_rook"]
  ]);
  const [onGoing,setOnGoing] = useState(false);
  //build a helper function that returns allowable move from given start position
  let allowableTiles = check(start,boardState);
  //console.log(allowableTiles);
  const [turn,setTurn] = useState(0);

  function handleClick(position){
 
    if((onGoing && start[0] === position[0] && start[1] === position[1]) || (!onGoing && !boardState[position[0]][position[1]]) ){
      if(onGoing) {
        setStart(Array(2).fill(null));
        setOnGoing(!onGoing);
      }
      return;
    }

    if(!onGoing){
      setStart(position);
    }
    else{
      // care for the castling issue ( not resolved )
      if(boardState[position[0]][position[1]] != null && boardState[position[0]][position[1]][0] === boardState[start[0]][start[1]][0]){
        setOnGoing(!onGoing);
        setStart(Array(2).fill(null));
        return;
      }

       // build a helper function that determine if the move is allowed or not , if yes proceed , if not return
       //check(start,position,boardState)
       // OR
      // if position in the allowableTiles , proceed , else return
      if(allowableTiles.some(tile => {
        return tile[0] === position[0] && tile[1] === position[1];
      })){
        let newBoardState = boardState.slice();
        newBoardState[position[0]][position[1]] = boardState[start[0]][start[1]];
        newBoardState[start[0]][start[1]] = null;
        setBoardState(newBoardState);
        setTurn(turn + 1);
      }

    }
    setOnGoing(!onGoing);
  }


  let boardTemplate = [];
  let isWhite = true;

  for(let r = 0 ; r < 8 ; r++){
    let rowTemplate = [];
    for(let c = 0; c < 8 ; c++){
      rowTemplate.push(<Tile isWhite = {isWhite} onBoardPiece = {boardState[r][c]} onhandleClick = {() => handleClick([r,c])} onActive = { 
      onGoing && allowableTiles.some(tile => {return tile[0]===r && tile[1]===c})}/>);
      isWhite = !isWhite;
    }
    boardTemplate.push(rowTemplate);
    isWhite = !isWhite;
  }
  
  return(
    <>
      <div className = "turn">Turn: {turn}</div>
      <div className="board-style">
        {boardTemplate.map((row,index) => (
          <div className="board-row-style" key={8-index}>{row}</div>
        ))}
      </div>
    </>
  );
}

function App(){
  return(
    <Board/>
  );
}

export default App;

