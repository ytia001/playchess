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


  function handleClick(position){
    if((onGoing && start[0] === position[0] && start[1] === position[1]) || (!onGoing && !boardState[position[0]][position[1]]) ){
      if(onGoing) setOnGoing(!onGoing);
      return;
    }

    if(!onGoing){
      setStart(position);
    }
    else{
      // build a helper function that determine if the move is allowed or not , if yes proceed , if not return
      if(boardState[position[0]][position[1]] != null && boardState[position[0]][position[1]][0] === boardState[start[0]][start[1]][0]){
        setOnGoing(!onGoing);
        return;
      }


      let newBoardState = boardState.slice();
      newBoardState[position[0]][position[1]] = boardState[start[0]][start[1]];
      newBoardState[start[0]][start[1]] = null;
      setBoardState(newBoardState);
    }
    setOnGoing(!onGoing);
  }


  let boardTemplate = [];
  let isWhite = true;

  for(let r = 0 ; r < 8 ; r++){
    let rowTemplate = [];
    for(let c = 0; c < 8 ; c++){
      rowTemplate.push(<Tile isWhite = {isWhite} onBoardPiece = {boardState[r][c]} onhandleClick = {() => handleClick([r,c])} onActive = { onGoing && start[0] ===r && start[1] === c? true : false}/>);
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

