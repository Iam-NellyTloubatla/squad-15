/* ============================================================ */
/* CHALLENGE 1: DOM interaction + dynamic typing                 */
/* ============================================================ */
const input = document.getElementById("userInput");
const button = document.getElementById("analyzeBtn");
const output = document.getElementById("output");
// TODO 1: Attach a click event listener to `button` that runs an `analyze` function.

button.addEventListener("click", analyze);

function analyze() {
  input.value = input.value.trim(); // <-- remove whitespace from the input
  // TODO 2: Read the current value from `input`.
  //         (Remember: everything coming out of the DOM is ALWAYS one specific type — which one?)
  const raw = Number(input.value); // <-- replace null
  // TODO 3: Try to convert `raw` into a Number.
  const converted = Number(input.value); // <-- replace null, e.g. using Number(...)
  // TODO 4: Log to the console:
  //   - the raw value and its type (typeof)
  //   - the converted value and its type (typeof)
  function logValues() {
    console.log("Raw value:", input.value, "Type:", typeof input.value);
    console.log("Converted value:", converted, "Type:", typeof converted);
  }
  // TODO 5: Decide whether the conversion produced a valid number (hint: isNaN).
  //         If valid, add the CSS class "valid-number" to #output.
  //         If not valid, add the CSS class "not-number" to #output instead.
  //         (Tip: output.classList.add(...) / output.classList.remove(...))
  if (!isNaN(converted)) {
    output.classList.add("valid-number");
    output.classList.remove("not-number");
  } else {
    output.classList.add("not-number");
    output.classList.remove("valid-number");
  }

  // TODO 6: Update output.textContent to show both the raw value+type
  //         and the converted value+type, e.g.:
  //         "Raw: 'abc' (string) fi Converted: NaN (number)"
  output.textContent = `Raw: '${input.value}' (${typeof input.value}) fi Converted: ${converted} (${typeof converted})`;
}
// TODO 7 (record your engine): log navigator.userAgent to the console
// and copy the browser/engine info into your annotation notes on the page.
console.log(navigator.userAgent);
/* ============================================================ */
/* CHALLENGE 2: dynamic typing / coercion (console)              */
/* ============================================================ */
// STEP 1: Before reloading, fill in your PREDICTION for each expression (same index = same pair).
const expressions = [
  "'5' + 3",
  "'5' - 3",
  "true + true",
  "[] + []",
  "'10' == 10",
  "'10' === 10",
];
const predictions = ["???", "???", "???", "???", "???", "???"];
console.log("--- Challenge 2: Type Coercion Quiz ---");
// TODO 1: Loop over `expressions` by index. For each index:
//   - evaluate expressions[i] to get the REAL result
//     (hint: eval(expressions[i]) works here, since these are trusted, hard-coded strings)
//   - log: the expression, your prediction (predictions[i]), the real result, and typeof the real result
//   - flag with "n" if your prediction matches the real result (as a string), else "n"
function checkPredictions() {
  let correctCount = 0;
  for (let i = 0; i < expressions.length; i++) {
    const realResult = eval(expressions[i]);
    const prediction = predictions[i];
    const isCorrect = prediction === String(realResult);
    if (isCorrect) {
      correctCount++;
    }
    console.log(
      `${expressions[i]}: Prediction: ${prediction}, Real: ${realResult} (${typeof realResult}) ${isCorrect ? "n" : "n"}`,
    );
  }
  console.log(
    `You got ${correctCount} out of ${expressions.length} predictions right.`,
  );
}
// TODO 2: After the loop, log how many predictions you got right out of the total.
checkPredictions();
// TODO 3: Record your runtime/engine version: console.log(navigator.userAgent);
console.log(navigator.userAgent);
/* ============================================================ */
/* CHALLENGE 3: interpreted execution / hoisting (console)       */
/* ============================================================ */
console.log("--- Challenge 3: Execution Order Puzzle ---");
console.log("1: top of script");
sayHello(); // calling this BEFORE its declaration below
var mood = "curious";
function sayHello() {
  console.log("2: inside sayHello, mood is currently:", mood);
}
console.log("3: mood after sayHello ran:", mood);
setTimeout(() => {
  console.log("5: inside setTimeout callback");
}, 0);
console.log("4: end of synchronous code (setTimeout already scheduled above)");
// Now watch what happens accessing a `let` variable before its declaration.
// This line is expected to throw — that's the point. It runs LAST on purpose
// so it doesn't stop anything above it from executing.
console.log(greeting); // TODO: predict what happens here — value? error?
let greeting = "hi";
// TODO 1: Reload the page. Compare the ACTUAL console order to your prediction above.
if (typeof greeting === "undefined") {
  console.log("greeting is undefined");
}
// TODO 2: In a comment here, explain in your own words WHY:
//   (a) `sayHello()` worked even though it's called before its declaration
//       - Function declarations are hoisted during the creation phase. The
//         JavaScript engine creates the function binding before executing code,
//         so the function exists at call time even if its definition appears
//         later in the source.
//
//   (b) `mood` was `undefined` inside `sayHello()` rather than "curious"
//       - `var` declarations are hoisted (the name is created) but their
//         assignments happen at runtime where the statement appears. At the
//         time `sayHello()` runs, `mood` has been declared (so no ReferenceError)
//         but not yet assigned the value "curious", so its value is `undefined`.
//
//   (c) accessing `greeting` threw an error instead of printing `undefined`
//       - `let` (and `const`) are hoisted but remain in the Temporal Dead Zone
//         (TDZ) until their initialization runs. Accessing a `let` before its
//         initialization raises a `ReferenceError` rather than returning
//         `undefined`.
//
//   (d) "4" printed before "5" even though `setTimeout` has a 0ms delay
//       - `setTimeout(..., 0)` schedules the callback to run asynchronously.
//         The callback is queued and only runs after the current call stack
//         completes and the event loop processes the task queue. Synchronous
//         code (printing "4") always runs before queued callbacks (printing "5").

// TODO 3: Record your runtime/engine version: console.log(navigator.userAgent):
console.log(navigator.userAgent);
