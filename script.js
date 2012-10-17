(function() {
  var countWord, detectIfNewWordIsHorizontalOrVertical, getHorizontalWord, getVerticalWord, getWordMultipliers, i, j, letterinTheMatrix;
  this.newLetters = [];
  letterinTheMatrix = (function() {
    function letterinTheMatrix(value, i, j) {
      this.value = value;
      this.i = i;
      this.j = j;
    }
    letterinTheMatrix.prototype.equals = function(letter) {
      return letter.value === this.value && letter.i === this.i && letter.j === this.j;
    };
    return letterinTheMatrix;
  })();
  this.map = {
    A: 1,
    B: 3,
    C: 3,
    D: 2,
    E: 1,
    F: 4,
    G: 2,
    H: 4,
    I: 1,
    J: 8,
    K: 10,
    L: 1,
    M: 2,
    N: 1,
    O: 1,
    P: 3,
    Q: 8,
    R: 1,
    S: 1,
    T: 1,
    U: 1,
    V: 4,
    W: 10,
    X: 10,
    Y: 10,
    Z: 10
  };
  this.matrix = [];
  for (i = 0; i <= 14; i++) {
    matrix[i] = [];
    for (j = 0; j <= 14; j++) {
      matrix[i][j] = -1;
    }
  }
  this.compute = function() {
    var i, j, letter, onGoingContent, tile, _i, _j, _len, _len2;
    this.newLetters = [];
    for (i = 0; i <= 14; i++) {
      for (j = 0; j <= 14; j++) {
        tile = document.querySelector("#coord-" + i + "-" + j + " > div");
        if (tile !== null) {
          if (matrix[i][j] === -1) {
            newLetters.push(new letterinTheMatrix(tile.innerHTML, i, j));
            matrix[i][j] = tile.innerHTML;
          }
        }
      }
    }
    onGoingContent = "";
    switch (detectIfNewWordIsHorizontalOrVertical()) {
      case "horizontal":
        onGoingContent += "Horizontal : " + (countWord(getHorizontalWord(newLetters[0]))) + " <br>";
        for (_i = 0, _len = newLetters.length; _i < _len; _i++) {
          letter = newLetters[_i];
          if (getVerticalWord(letter) !== void 0) {
            onGoingContent += "Vertical : " + (countWord(getVerticalWord(letter))) + " <br>";
          }
        }
        break;
      case "vertical":
        onGoingContent += "Vertical : " + (countWord(getVerticalWord(newLetters[0]))) + " <br>";
        for (_j = 0, _len2 = newLetters.length; _j < _len2; _j++) {
          letter = newLetters[_j];
          if (getHorizontalWord(letter) !== void 0) {
            onGoingContent += "Horizontal : " + (countWord(getHorizontalWord(letter))) + " <br>";
          }
        }
        break;
      case "onlyOneLetter":
        if (getHorizontalWord(newLetters[0]) !== void 0) {
          onGoingContent += "Horizontal : " + (countWord(getHorizontalWord(newLetters[0]))) + " <br>";
        }
        if (getVerticalWord(newLetters[0]) !== void 0) {
          onGoingContent += "Vertical : " + (countWord(getVerticalWord(newLetters[0]))) + " <br>";
        }
        break;
      case "unknown":
        onGoingContent = "unknown";
    }
    return document.getElementById("onGoing").innerHTML = onGoingContent;
  };
  countWord = function(listofLetters) {
    var letter, newletter, result, score, temp, valueOfLetter, _i, _j, _len, _len2;
    result = "";
    score = 0;
    for (_i = 0, _len = listofLetters.length; _i < _len; _i++) {
      letter = listofLetters[_i];
      temp = letter.value;
      if (letter.value !== ' ') {
        result += temp;
        valueOfLetter = map[temp];
        for (_j = 0, _len2 = newLetters.length; _j < _len2; _j++) {
          newletter = newLetters[_j];
          if (letter.equals(newletter)) {
            switch (document.getElementById("coord-" + letter.i + "-" + letter.j).className) {
              case "blue-pane":
                valueOfLetter = map[temp] * 3;
                break;
              case "cyan-pane":
                valueOfLetter = map[temp] * 2;
            }
          }
        }
      } else {
        valueOfLetter = 0;
      }
      score += valueOfLetter;
    }
    return "" + result + " : " + score + " * " + (getWordMultipliers(listofLetters)) + " = " + (score * getWordMultipliers(listofLetters));
  };
  getWordMultipliers = function(listofLetters) {
    var letter, multiplier, newletter, _i, _j, _len, _len2;
    multiplier = 1;
    for (_i = 0, _len = listofLetters.length; _i < _len; _i++) {
      letter = listofLetters[_i];
      for (_j = 0, _len2 = newLetters.length; _j < _len2; _j++) {
        newletter = newLetters[_j];
        if (letter.equals(newletter)) {
          switch (document.getElementById("coord-" + letter.i + "-" + letter.j).className) {
            case "pink-pane":
              multiplier *= 2;
              break;
            case "red-pane":
              multiplier *= 3;
          }
        }
      }
    }
    return multiplier;
  };
  getHorizontalWord = function(letter) {
    var cursor, result;
    result = [];
    cursor = letter.j;
    while (matrix[letter.i][cursor] !== -1 && cursor !== 0) {
      cursor--;
    }
    if (matrix[letter.i][cursor] === -1) {
      cursor++;
    }
    while (matrix[letter.i][cursor] !== -1) {
      result.push(new letterinTheMatrix(matrix[letter.i][cursor], letter.i, cursor));
      cursor++;
      if (cursor === 15) {
        break;
      }
    }
    if (result.length > 1) {
      return result;
    }
  };
  getVerticalWord = function(letter) {
    var cursor, result;
    result = [];
    cursor = letter.i;
    while (matrix[cursor][letter.j] !== -1 && cursor !== 0) {
      cursor--;
    }
    if (matrix[cursor][letter.j] === -1) {
      cursor++;
    }
    while (matrix[cursor][letter.j] !== -1) {
      result.push(new letterinTheMatrix(matrix[cursor][letter.j], cursor, letter.j));
      cursor++;
      if (cursor === 15) {
        break;
      }
    }
    if (result.length > 1) {
      return result;
    }
  };
  detectIfNewWordIsHorizontalOrVertical = function() {
    var coordList, letterinTheMatrix, _i, _j, _len, _len2;
    if (newLetters.length === 1) {
      return "onlyOneLetter";
    }
    coordList = [];
    for (_i = 0, _len = newLetters.length; _i < _len; _i++) {
      letterinTheMatrix = newLetters[_i];
      coordList.push(letterinTheMatrix.i);
    }
    if (coordList.every(function(x) {
      return x === coordList[0];
    })) {
      return "horizontal";
    }
    coordList = [];
    for (_j = 0, _len2 = newLetters.length; _j < _len2; _j++) {
      letterinTheMatrix = newLetters[_j];
      coordList.push(letterinTheMatrix.j);
    }
    if (coordList.every(function(x) {
      return x === coordList[0];
    })) {
      return "vertical";
    }
    return "unknown";
  };
  this.drag = function(target, event) {
    return event.dataTransfer.setData("tile", target.id);
  };
  this.drop = function(target, event) {
    var id;
    id = event.dataTransfer.getData("tile");
    target.appendChild(document.getElementById(id));
    return event.preventDefault();
  };
}).call(this);
