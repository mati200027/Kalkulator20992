const screen = document.getElementById("screen");
const historyEl = document.getElementById("history");

let current = "0";
let previous = null;
let operator = null;
let justEvaluated = false;

function prettyOp(op) {
    return op === "*" ? "×" : op === "/" ? "÷" : op;
}

function update() {
    screen.value = current;
    historyEl.textContent = (previous !== null && operator) ? `${previous} ${prettyOp(operator)}` : "";
}

function inputDigit(d) {
    if (justEvaluated) {
        current = d;
        justEvaluated = false;
        update();
        return;
    }
    if (current === "0") current = d;
    else current += d;
    update();
}

function inputDot() {
    if (justEvaluated) {
        current = "0.";
        justEvaluated = false;
        update();
        return;
    }
    if (!current.includes(".")) current += ".";
    update();
}

function clearAll() {
    current = "0";
    previous = null;
    operator = null;
    justEvaluated = false;
    update();
}

function backspace() {
    if (justEvaluated) {
        current = "0";
        justEvaluated = false;
        update();
        return;
    }
    current = (current.length <= 1) ? "0" : current.slice(0, -1);
    update();
}

function setOperator(op) {
    if (operator && previous !== null && !justEvaluated) {
        evaluate();
    }
    previous = Number(current);
    operator = op;
    justEvaluated = false;
    current = "0";
    update();
}

function evaluate() {
    if (operator === null || previous === null) return;

    const a = previous;
    const b = Number(current);

    let result;
    switch (operator) {
        case "+": result = a + b; break;
        case "-": result = a - b; break;
        case "*": result = a * b; break;
        case "/":
            if (b === 0) {
                current = "Błąd";
                previous = null;
                operator = null;
                justEvaluated = true;
                update();
                return;
            }
            result = a / b;
            break;
        default: return;
    }

    current = Number.isInteger(result) ? String(result) : String(Number(result.toFixed(12)));
    previous = null;
    operator = null;
    justEvaluated = true;
    update();
}

document.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    const digit = btn.getAttribute("data-digit");
    const op = btn.getAttribute("data-op");
    const action = btn.getAttribute("data-action");

    if (digit !== null) return inputDigit(digit);
    if (op !== null) return setOperator(op);

    if (action === "clear") return clearAll();
    if (action === "backspace") return backspace();
    if (action === "dot") return inputDot();
    if (action === "equals") return evaluate();
});

update();
