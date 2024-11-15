const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
  ];
  
  const cellElements = document.querySelectorAll('[data-cell]');
  const boardElement = document.getElementById('board');
  const winningMessageElement = document.getElementById('winningMessage');
  const restartButton = document.getElementById('restartButton');
  const winningMessageTextElement = document.getElementById('winningMessageText');
  let isPlayerOTurn = false;
  
  startGame();
  
  restartButton.addEventListener('click', startGame);
  
  function startGame() {
	isPlayerOTurn = false;
	cellElements.forEach(cell => {
	  cell.classList.remove('x');
	  cell.classList.remove('circle');
	  cell.innerHTML = '';  // Clear any image or content in the cell
	  cell.removeEventListener('click', handleCellClick);
	  cell.addEventListener('click', handleCellClick, { once: true });
	});
	setBoardHoverClass();
	winningMessageElement.classList.remove('show');
  }
  
  function handleCellClick(e) {
	const cell = e.target;
	const currentClass = isPlayerOTurn ? 'circle' : 'x';
	placeMark(cell, currentClass);
	if (checkWin(currentClass)) {
	  endGame(false);
	} else if (isDraw()) {
	  endGame(true);
	} else {
	  swapTurns();
	  setBoardHoverClass();
	}
  }
  
  function endGame(draw) {
	if (draw) {
	  winningMessageTextElement.innerText = "It's a draw!";
	} else {
	  winningMessageTextElement.innerText = `The ${isPlayerOTurn ? "Law" : "Saw"} Wins!`;
	}
	winningMessageElement.classList.add('show');
  }
  
  function isDraw() {
	return [...cellElements].every(cell => {
	  return cell.classList.contains('x') || cell.classList.contains('circle');
	});
  }
  
  function placeMark(cell, currentClass) {
	const img = document.createElement('img');
  
	// Set the image source based on the current player
	if (currentClass === 'x') {
	  img.src = 'saw.jpg';  
	  img.alt = 'Saw';
	} else {
	  img.src = 'law.jpg';  
	  img.alt = 'Law';
	}
  
	
	img.style.width = '70%';  
	img.style.height = '70%'; 
  
	
	cell.innerHTML = '';  
	cell.appendChild(img);
	cell.classList.add(currentClass); 
  }
  
  function swapTurns() {
	isPlayerOTurn = !isPlayerOTurn;
  }
  
  function setBoardHoverClass() {
	boardElement.classList.remove('x');
	boardElement.classList.remove('circle');
	if (isPlayerOTurn) {
	  boardElement.classList.add('circle');
	} else {
	  boardElement.classList.add('x');
	}
  }
  
  function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some(combination => {
	  return combination.every(index => {
		return cellElements[index].classList.contains(currentClass);
	  });
	});
  }
  