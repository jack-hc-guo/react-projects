import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    const active = {
      fontWeight: 'bold'
    };

    const inactive = {
      fontWeight: 'normal'
    };
    return (
      <button
        className="square" 
        onClick={props.onClick}
        style={props.winningSquare ? active : inactive}>
        {props.value}
      </button>
    );
}

class Board extends React.Component {
  renderSquare(i) {
    let winningSquare = this.props.winner && this.props.winner.includes(i) ? true : false; 
    return( 
      <Square 
            value={ this.props.squares[i] }
            winningSquare={winningSquare}
            onClick = {() => this.props.onClick(i)}
      />
    );
  }

  render() {
    let board = [];
    const maxRow = this.props.maxRow;
    const maxCol = this.props.maxCol; 

    for(let r = 0; r < maxRow; r++ ){
      let row = [];
      for(let c = 0; c < maxCol; c++){
          row.push(<span key={(r * maxRow) + c}>{this.renderSquare((r * maxRow) + c)}</span>);
      }
      board.push(<div className="board-row">{row}</div>);
    }

    return (
      <div>
      {board}
      </div>
      );
    }
  }


class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        moves: Array(2).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
      ascending: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const row = Math.floor(i/3)+1;
    const col = Math.floor(i%3)+1;
    const move = [row, col];

    this.setState({
      history: history.concat([{
        squares: squares,
        moves: move,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });

  }

  sortHandleClick(){
    this.setState({
      ascending: !this.state.ascending,
    });

  }

  render() {
    const active = {
      fontWeight: 'bold'
    };

    const inactive = {
      fontWeight: 'normal'
    };

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const ascending = this.state.ascending;
    
    const moves = history.map((step, move) => {
      const desc = move ? `Go to move # ${move} -- (${step.moves[0]}, ${step.moves[1]})`: `Go to game start`;
      return (
        <li key={move}> 
          <button style={this.state.stepNumber === move ? active : inactive} onClick = {() => this.jumpTo(move)}>{desc}</button>
        </li>
        );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner.winner;
    } else {
      if (this.state.stepNumber === 9){
        status = 'No winner. The game is a tie';
      }
      else{
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      
    }


    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            winner={winner && winner.winningSquares}
            maxRow={this.props.boardSize}
            maxCol={this.props.boardSize}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{ascending ? moves : moves.reverse()}</ol>
        </div>
        <div className="sort-reverse">
          <button onClick={() => this.sortHandleClick()}>Sort by Desc</button>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return {winner: squares[a],
          winningSquares: lines[i]
        };
    }
  }
  return null;
}

class FrontPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      boardSize: null
      };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event){
    this.setState({
      boardSize: event.target.value
    });
  }

  handleSubmit(event) {
    alert('A value was submitted: ' + this.state.boardSize);
    event.preventDefault();
  }

  render(){
    return(
      <div>
      <div className="board-size">
      <form onSubmit={this.handleSubmit}>
        <label>
          Board Dimension:
          <input type="text" value={this.state.boardSize} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
      <div className="board-game">
        <Game 
          boardSize={this.state.boardSize}
        />
      </div>
      </div>
      )
  }
}
// ========================================

ReactDOM.render(
  <FrontPage />,
  document.getElementById('root')
);
