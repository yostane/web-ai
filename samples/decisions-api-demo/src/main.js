import "./style.css";

window.addEventListener("DOMContentLoaded", () => {
  const schema = {
    context: "Hotel reservation search filter converter.",
    expectedInputs: [{ type: "text", languages: ["en"] }],
    questions: [
      {
        id: "pet_friendly",
        type: "boolean",
        prompt: "Does the traveler require pet-friendly accommodations?",
      },
      {
        id: "property_type",
        type: "choice",
        prompt: "Which property type best matches the traveler's request?",
        options: [
          {
            label: "hotel",
            description: "Standard hotel, resort, or boutique inn",
          },
          {
            label: "rental",
            description: "Entire apartment, house, or cabin rental",
          },
          { label: "hostel", description: "Shared dormitory or budget hostel" },
          { label: "any", description: "No specific property type mentioned" },
        ],
      },
      {
        id: "price_tier",
        type: "score",
        prompt: "Rate the target price tier from 1 (budget) to 4 (luxury).",
        options: [
          { label: "1", description: "Budget or inexpensive stay" },
          { label: "2", description: "Moderate or mid-range price" },
          { label: "3", description: "Upscale or premium property" },
          { label: "4", description: "Luxury or five-star resort" },
        ],
      },
    ],
  };

  const form = document.querySelector("#search-form");
  const input = document.querySelector("#search-input");
  const button = document.querySelector("#search-button");
  const status = document.querySelector("#status");
  const results = document.querySelector("#results");
  const output = document.querySelector("#result-output");
  const petFriendly = document.querySelector("#pet-friendly");
  const propertyType = document.querySelector("#property-type");
  const priceTier = document.querySelector("#price-tier");

  if (!("DecisionModel" in window)) {
    status.textContent = "The Decisions API is not supported in this browser.";
    button.disabled = true;
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (button.disabled) return;

    const query = input.value.trim();
    if (!query) {
      status.textContent = "Enter a description of your stay.";
      input.focus();
      return;
    }

    button.disabled = true;
    results.hidden = true;
    status.textContent = "Checking model availability...";
    let model;

    try {
      const availability = await DecisionModel.availability(schema);
      if (availability === "unavailable") {
        status.textContent =
          "The decision model is unavailable on this device.";
        return;
      }

      status.textContent =
        "Preparing the model (a download may be required)...";
      model = await DecisionModel.create(schema);
      status.textContent = "Finding search filters...";
      const result = await model.decide(query);
      petFriendly.textContent =
        result.pet_friendly.label === "true" ? "Yes" : "No";
      propertyType.textContent = result.property_type.label;
      priceTier.textContent = result.price_tier.label;
      output.textContent = JSON.stringify(result, null, 2);
      results.hidden = false;
      status.textContent = "Search filters ready.";
    } catch (error) {
      console.error("Could not find search filters:", error);
      status.textContent = `Could not find search filters: ${error instanceof Error ? error.message : String(error)}`;
    } finally {
      button.disabled = false;
      model?.destroy();
    }
  });
});
