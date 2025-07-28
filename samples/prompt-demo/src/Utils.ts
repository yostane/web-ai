export function log(...args: string[]) {
  const logElement = document.querySelector("#logs");
  if (logElement) {
    logElement.innerHTML += `${args.join(" ")}<br>`;
  }
  console.log(...args);
}
