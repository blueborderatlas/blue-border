function unique(values) {
  return Array.from(new Set(values.filter(Boolean).map((value) => value.trim()).filter(Boolean)));
}

function allImageText(analysis) {
  return (analysis.images || [])
    .map((image) => [image.scene, image.rawDescription, ...(image.atmosphere || [])].filter(Boolean).join(" "))
    .join(" ")
    .toLowerCase();
}

function collectFacts(analysis, key) {
  return unique((analysis.images || []).flatMap((image) => image[key] || []));
}

function includesAny(values, terms) {
  return terms.some((term) => values.includes(term));
}

function textIncludesAny(text, terms) {
  return terms.some((term) => text.includes(term));
}

function buildUnderwater({ objects, activities, environment, text }) {
  const observations = [];

  if (includesAny(environment, ["underwater", "reef"]) || textIncludesAny(text, ["underwater", "coral reef"])) {
    observations.push("underwater reef scenes are documented");
  }

  if (includesAny(objects, ["coral", "reef"])) {
    observations.push("coral reef is visible");
  }

  if (includesAny(objects, ["diver", "person"]) || textIncludesAny(text, ["scuba divers", "scuba gear"])) {
    observations.push("multiple scuba divers appear");
  }

  if (objects.includes("fish")) {
    observations.push("fish and marine life appear in the reef photos");
  }

  if (activities.includes("swimming") || activities.includes("diving")) {
    observations.push("diving or swimming activity is visible");
  }

  return unique(observations);
}

function buildShore({ environment, text }) {
  const observations = [];

  if (environment.includes("beach") || textIncludesAny(text, ["beach", "shore", "ocean can be seen"])) {
    observations.push("beach or shore context is visible");
  }

  if (textIncludesAny(text, ["wooden deck", "blue benches", "pergola"])) {
    observations.push("seating by the water is documented");
  }

  if (textIncludesAny(text, ["umbrella", "next to the ocean"])) {
    observations.push("shoreline waiting or preparation area appears");
  }

  return unique(observations);
}

function buildEquipment({ objects, text }) {
  const observations = [];

  if (includesAny(objects, ["air tank", "tank"]) || textIncludesAny(text, ["oxygen tank", "air tank"])) {
    observations.push("air tanks are visible");
  }

  if (textIncludesAny(text, ["scuba gear", "diving equipment", "wetsuit", "wetsuits"])) {
    observations.push("scuba gear is visible");
  }

  if (textIncludesAny(text, ["flippers", "fins", "plastic baskets", "equipment"])) {
    observations.push("equipment handling area appears");
  }

  if (objects.includes("camera") || text.includes("camera")) {
    observations.push("underwater camera use is visible");
  }

  return unique(observations);
}

function buildPeople({ objects, activities, text }) {
  const observations = [];

  if (includesAny(objects, ["person", "diver"]) || textIncludesAny(text, ["people", "group"])) {
    observations.push("travelers and divers appear across multiple photos");
  }

  if (textIncludesAny(text, ["group of", "posing", "arms around"])) {
    observations.push("group photos suggest a social diving context");
  }

  if (activities.includes("sitting") || activities.includes("standing")) {
    observations.push("people are shown before or after the water activity");
  }

  return unique(observations);
}

function buildFacilities({ objects, visibleText, text }) {
  const observations = [];

  if (objects.includes("building") || textIncludesAny(text, ["wooden building", "office", "store setting"])) {
    observations.push("onshore building or office setting appears");
  }

  if (textIncludesAny(text, ["locker", "lockers"])) {
    observations.push("lockers or storage area are visible");
  }

  if (textIncludesAny(text, ["restaurant", "patio", "counter"])) {
    observations.push("food or front-desk area appears nearby");
  }

  if (visibleText.length > 0 || objects.includes("sign")) {
    observations.push("signage is visible in several photos");
  }

  return unique(observations);
}

function buildTravelSignals({ underwater, shore, equipment, people, facilities, text }) {
  const observations = [];

  if (underwater.length > 0 && shore.length > 0) {
    observations.push("the photos suggest a shore-connected diving experience rather than only underwater scenery");
  }

  if (equipment.length > 0 && facilities.length > 0) {
    observations.push("organized equipment handling is visible");
  }

  if (people.length > 0 && textIncludesAny(text, ["certificate", "course", "group"])) {
    observations.push("the photos suggest a social or training-oriented diving setting");
  }

  if (underwater.some((item) => item.includes("reef")) && equipment.length > 0) {
    observations.push("both reef conditions and diving preparation are documented");
  }

  return unique(observations);
}

function buildEditorialNotes({ underwater, shore, equipment, people, facilities, travelSignals }) {
  const notes = [];

  if (underwater.length > 0 && shore.length > 0) {
    notes.push("The photos show both underwater scenes and the shore-side context around the dive.");
  }

  if (equipment.length > 0 && facilities.length > 0) {
    notes.push("The image set documents more than scenery: gear, facilities and preparation areas are also visible.");
  }

  if (people.length > 0) {
    notes.push("People appear repeatedly, which gives the set a lived-in travel context rather than a purely scenic one.");
  }

  if (travelSignals.length > 0) {
    notes.push("Multiple photos point to an organized diving workflow, but the service quality still needs human verification.");
  }

  return unique(notes);
}

function buildMissingInformation() {
  return [
    "Opening hours not verified",
    "Prices not verified",
    "Instructor quality unknown",
    "Booking process unknown",
    "Safety standards not verified",
    "Exact business identity requires human confirmation",
  ];
}

export function createEditorialObservations(analysis) {
  const objects = collectFacts(analysis, "objects");
  const activities = collectFacts(analysis, "activities");
  const environment = collectFacts(analysis, "environment");
  const visibleText = collectFacts(analysis, "visible_text");
  const text = allImageText(analysis);

  const underwater = buildUnderwater({ objects, activities, environment, text });
  const shore = buildShore({ environment, text });
  const equipment = buildEquipment({ objects, text });
  const people = buildPeople({ objects, activities, text });
  const facilities = buildFacilities({ objects, visibleText, text });
  const travelSignals = buildTravelSignals({
    underwater,
    shore,
    equipment,
    people,
    facilities,
    text,
  });
  const editorialNotes = buildEditorialNotes({
    underwater,
    shore,
    equipment,
    people,
    facilities,
    travelSignals,
  });

  return {
    underwater,
    shore,
    equipment,
    people,
    facilities,
    visibleText,
    travelSignals,
    editorialNotes,
    missingInformation: buildMissingInformation(),
  };
}
