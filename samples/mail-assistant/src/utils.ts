export async function setupWriter(): Promise<Writer> {
  console.log("Setting up Writer...");
  console.log("is user active?", navigator.userActivation.isActive);

  if (!("Writer" in self)) {
    throw new Error("Writer not available");
  }
  const options: WriterCreateOptions = {
    sharedContext: `This is a contact email fur support issues or for general information.
      Output only one word.`,
    tone: "formal",
    format: "plain-text",
    length: "short",
    expectedContextLanguages: ["en"],
    expectedInputLanguages: ["en"],
    outputLanguage: "en",
  };

  console.log("Checking availability...");
  const available = await Writer.availability(options);
  console.log("Got availability", available);
  if (available === "unavailable") {
    // The Writer API isn't usable.
    throw new Error("Writer not available");
  }
  if (available === "available") {
    // The Writer API can be used immediately .
    return Writer.create(options);
  } else {
    return Writer.create({
      ...options,
      monitor(m) {
        m.ondownloadprogress = (e) => {
          const ratio = e.loaded / e.total;
          console.log(
            `Downloaded`,
            ratio,
            "loaded",
            e.loaded,
            "total",
            e.total,
          );
          document.getElementById("loading")!.innerHTML =
            `Downloading model... ${Math.round(ratio * 100)}%`;
        };
        console.log("monitor", m);
      },
    });
  }
}
