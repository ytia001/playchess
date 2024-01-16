import { useEffect, useState } from "react";
import * as icons from "./images/icons";
//import axios from 'axios';

function validate(position,boardState){
  if(position[0] < 0 || position[0] > 7 || position[1] < 0 || position[1] > 7) return -1;

  if(boardState[position[0]][position[1]]) return 1;

  return 0;
} 


function check(start,boardState){
    if((!start[0] && !start[1]) || !boardState[start[0]][start[1]]) return start;
    const piece = boardState[start[0]][start[1]].slice(2);
    let allowableTiles = [start];

    if(piece === 'p'){
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

    else if (piece === 'n'){
      const moves = [[-2,1],[-2,-1],[2,1],[2,-1],[1,-2],[-1,-2],[1,2],[-1,2]];
      moves.forEach(([dr,dc])=>{
        if(validate([start[0]+dr,start[1]+dc],boardState) === 1 && boardState[start[0]+dr][start[1]+dc][0] === 'w') return;
        allowableTiles.push([start[0]+dr,start[1]+dc])
      })
    }

    else if (piece === 'k'){
      const moves = [[0,-1],[-1,1],[0,1],[1,1],[1,0],[-1,-1],[-1,0],[1,-1]];
      moves.map(([dr,dc])=>(
        allowableTiles.push([start[0]+dr,start[1]+dc])
      ))
    }

    else if (piece === 'r'){
      const moves = [[-1,0],[0,1],[1,0],[0,-1]];
      for (const move of moves){
        let [nr,nc] = [start[0]+move[0],start[1]+move[1]];
        while(nr >= 0 && nr < 8 && nc >= 0 && nc < 8){
          if(validate([nr,nc],boardState) === 1){
            if(boardState[nr][nc][0] === 'b'){
              allowableTiles.push([nr,nc]);
            }
            break;
          }
          allowableTiles.push([nr,nc]);
          nr += move[0];
          nc += move[1]; 
        }
      }
    }

    else if (piece === 'b'){
      const moves = [[-1,1],[-1,-1],[1,1],[1,-1]];
      for (const move of moves){
        let [nr,nc] = [start[0]+move[0],start[1]+move[1]];
        while(nr >= 0 && nr < 8 && nc >= 0 && nc < 8){
          if(validate([nr,nc],boardState) === 1){
            if(boardState[nr][nc][0] === 'b'){
              allowableTiles.push([nr,nc]);
            }
            break;
          }
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
          if(validate([nr,nc],boardState) === 1){
            if(boardState[nr][nc][0] === 'b'){
              allowableTiles.push([nr,nc]);
            }
            break;
          }
          allowableTiles.push([nr,nc]);
          nr += move[0];
          nc += move[1]; 
        }
      }

      moves = [[-1,1],[-1,-1],[1,1],[1,-1]];
      for (const move of moves){
        let [nr,nc] = [start[0]+move[0],start[1]+move[1]];
        while(nr >= 0 && nr < 8 && nc >= 0 && nc < 8){
          if(validate([nr,nc],boardState) === 1){
            if(boardState[nr][nc][0] === 'b'){
              allowableTiles.push([nr,nc]);
            }
            break;
          }
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
    ["b_r","b_n","b_b","b_q","b_k","b_b","b_n","b_r"],
    ["b_p","b_p","b_p","b_p","b_p","b_p","b_p","b_p"],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    ["w_p","w_p","w_p","w_p","w_p","w_p","w_p","w_p"],
    ["w_r","w_n","w_b","w_q","w_k","w_b","w_n","w_r"]
  ]);
  const [onGoing,setOnGoing] = useState(false);
  //build a helper function that returns allowable move from given start position
  let allowableTiles = check(start,boardState);
  // state that records the turn
  const [turn,setTurn] = useState(0);
  // state that records the overall chess piece movement for each turn
  const [moves,setMoves] = useState('');  
  
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
      if(allowableTiles.some(tile => tile[0] === position[0] && tile[1] === position[1] )){

        let newBoardState = boardState.slice();
        newBoardState[position[0]][position[1]] = boardState[start[0]][start[1]];
        newBoardState[start[0]][start[1]] = null;
        setBoardState(newBoardState);
        setTurn((prevTurn) => prevTurn + 1);
        let strMoves =  String.fromCharCode(97 + start[1]) + ('8'-start[0]).toString() + String.fromCharCode(97+ position[1]) + (8-position[0]).toString();
        
        //Use the callback version of setMoves to ensure the state is updated before making the request
        //setMoves( moves.slice() + " " + strMoves);
        //setMoves(prevMoves => prevMoves + " " + strMoves);

        // Fetch computer move using BACKEND API (STOCKFISH) + OPPONENT MOVE
        const nextMoveRequest = async (currentMoves) =>{
          let toSend = moves.slice() + " " + currentMoves;
          console.log("toSend:",toSend);
          try{
           const nextMoves = await fetch('http://127.0.0.1:5000/stockfish-api',{
             method: 'POST',
             headers: {
               'Content-Type': 'application/json',
              },
             body : JSON.stringify({'move':toSend})
           })
       
           if(nextMoves.ok){
             const data = await nextMoves.json();
             const toMove = data['nextMove'];

             // change to start(x,y) & end(x,y) positions and update the boardState
             const start = [8-Number(toMove[1]),toMove[0].charCodeAt(0)-97]
             const end = [8-Number(toMove[3]),toMove[2].charCodeAt(0)-97]
             let newBoardState = boardState.slice();
             newBoardState[end[0]][end[1]] = boardState[start[0]][start[1]];
             newBoardState[start[0]][start[1]] = null;
             console.log("start: ",start);
             console.log("end:", end)
             setBoardState(newBoardState);     
             setMoves(toSend + " " + toMove);
             setTurn((prevTurn) => prevTurn + 1);
           }else{
             console.error('Failed to request data. Status:', nextMoves.status);
           }
         } catch(error){
           console.error('Error requesting next move',error);
         }
       
        };
        
        nextMoveRequest(strMoves);    
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

