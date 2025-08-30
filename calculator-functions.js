(function () {
  "use strict";

  // Shortcut to get elements
  const el = function (element) {
    return element.charAt(0) === "#"
      ? document.querySelector(element)
      : document.querySelectorAll(element);
  };

  // Variables
  const viewer = el("#resultscreen"); // Calculator screen
  const equals = el("#equals");       // Equal button
  const nums = el(".num");            // Number buttons
  const ops = el(".ops");             // Operator buttons

  let theNum = "";     // Current input
  let oldNum = "";     // Previous input
  let resultNum = "";  // Result
  let operator = null; // Operator

  // Number clicked
  const setNum = function () {
    if (resultNum) {
      theNum = this.getAttribute("data-num");
      resultNum = "";
    } else {
      theNum += this.getAttribute("data-num");
    }
    viewer.innerHTML = theNum;
  };

  // Operator clicked
  const moveNum = function () {
    oldNum = theNum;
    theNum = "";
    operator = this.getAttribute("data-ops");
    equals.setAttribute("data-result", "");
  };

  // Equals clicked
  const displayNum = function () {
    oldNum = parseFloat(oldNum);
    theNum = parseFloat(theNum);

    switch (operator) {
      case "+":
        resultNum = oldNum + theNum;
        break;
      case "-":
        resultNum = oldNum - theNum;
        break;
      case "*":
        resultNum = oldNum * theNum;
        break;
      case "/":
        resultNum = oldNum / theNum;
        break;
      case "%":
        resultNum = oldNum % theNum;
        break;
      default:
        resultNum = theNum;
    }

    if (!isFinite(resultNum)) {
      resultNum = isNaN(resultNum)
        ? "You broke it!"
        : "Look at what you've done";
      el("#calculator").classList.add("broken");
    }

    viewer.innerHTML = resultNum;
    equals.setAttribute("data-result", resultNum);

    oldNum = 0;
    theNum = resultNum;
  };

  // Clear clicked
  const clearAll = function () {
    oldNum = "";
    theNum = "";
    viewer.innerHTML = "0";
    equals.setAttribute("data-result", resultNum);
  };

  // Bind events
  for (let i = 0; i < nums.length; i++) {
    nums[i].onclick = setNum;
  }

  for (let i = 0; i < ops.length; i++) {
    ops[i].onclick = moveNum;
  }

  equals.onclick = displayNum;
  el("#clear").onclick = clearAll;
})();