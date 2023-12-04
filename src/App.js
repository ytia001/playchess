import { useEffect, useState } from "react";
import * as icons from "./images/icons";


function Piece({onTilePiece}){
  // let source = "./images/icons/" + onTilePiece +".png";
  // console.log(source);

  if(onTilePiece){
    return(
    <img src={icons[onTilePiece]} className="icons"/>
    );
  }
  
}


function Tile({isWhite,onBoardPiece,onhandleClick}){

  if(isWhite){
    return(
      <div className="tile-style-white" onClick={onhandleClick}>
        <Piece onTilePiece = {onBoardPiece} />
      </div>
    );
  }else{
    return(
      <div className="tile-style-wood" onClick={onhandleClick}>
        <Piece onTilePiece = {onBoardPiece} />
      </div>
    );
  }
}

function Board(){
  const[start,setStart] = useState(null);
  const[end, setEnd] = useState(null);
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

  function handleClick(position){
    console.log(position.r);
    console.log(position.c);
  }

  let boardTemplate = [];
  let isWhite = true;

  for(let r = 0 ; r < 8 ; r++){
    let rowTemplate = [];
    for(let c = 0; c < 8 ; c++){
      rowTemplate.push(<Tile isWhite = {isWhite} onBoardPiece = {boardState[r][c]} onhandleClick = {() => handleClick({r,c})} />);
      isWhite = !isWhite;
    }
    boardTemplate.push(rowTemplate);
    isWhite = !isWhite;
  }
  
  return(
    <div className="board-style">
      {boardTemplate.map((row,index) => (
        <div className="board-row-style" key={8-index}>{row}</div>
      ))};
    </div>
  );
}

function App(){
  return(
    <Board/>
  );
}

export default App;

