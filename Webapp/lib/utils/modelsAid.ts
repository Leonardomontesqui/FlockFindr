import Mappedin from "@mappedin/react-sdk";
export const generateRandomCoordinates = (
  count: number,
  coordinates: Mappedin.Coordinate[]
): Mappedin.Coordinate[] => {
  // Sort coordinates to create a proper bounding box
  const sortedLats = coordinates.map((c) => c.latitude).sort((a, b) => a - b);
  const sortedLngs = coordinates.map((c) => c.longitude).sort((a, b) => a - b);

  const latMin = sortedLats[0];
  const latMax = sortedLats[sortedLats.length - 1];
  const lngMin = sortedLngs[0];
  const lngMax = sortedLngs[sortedLngs.length - 1];

  const randomCoordinates: Mappedin.Coordinate[] = [];

  for (let i = 0; i < count; i++) {
    const lat = latMin + Math.random() * (latMax - latMin);
    const lng = lngMin + Math.random() * (lngMax - lngMin);
    randomCoordinates.push(new Mappedin.Coordinate(lat, lng));
  }

  return randomCoordinates;
};

/**
 * Generates random coordinates within an outer bounding box but excluding an inner bounding box
 * @param count Number of coordinates to generate
 * @param coordinates Array of 8 coordinates - first 4 form outer bounding box, next 4 form inner exclusion zone
 * @returns Array of random coordinates
 */
export const generateRandomCoordinatesWithExclusion = (
  count: number,
  coordinates: Mappedin.Coordinate[]
): Mappedin.Coordinate[] => {
  if (coordinates.length < 8) {
    throw new Error(
      "At least 8 coordinates are required - 4 for outer bounds and 4 for inner exclusion zone"
    );
  }

  // Extract and sort outer bounds (first 4 coordinates)
  const outerCoordinates = coordinates.slice(0, 4);
  const outerSortedLats = outerCoordinates
    .map((c) => c.latitude)
    .sort((a, b) => a - b);
  const outerSortedLngs = outerCoordinates
    .map((c) => c.longitude)
    .sort((a, b) => a - b);

  const outerLatMin = outerSortedLats[0];
  const outerLatMax = outerSortedLats[outerSortedLats.length - 1];
  const outerLngMin = outerSortedLngs[0];
  const outerLngMax = outerSortedLngs[outerSortedLngs.length - 1];

  // Extract and sort inner bounds (next 4 coordinates)
  const innerCoordinates = coordinates.slice(4, 8);
  const innerSortedLats = innerCoordinates
    .map((c) => c.latitude)
    .sort((a, b) => a - b);
  const innerSortedLngs = innerCoordinates
    .map((c) => c.longitude)
    .sort((a, b) => a - b);

  const innerLatMin = innerSortedLats[0];
  const innerLatMax = innerSortedLats[innerSortedLats.length - 1];
  const innerLngMin = innerSortedLngs[0];
  const innerLngMax = innerSortedLngs[innerSortedLngs.length - 1];

  const randomCoordinates: Mappedin.Coordinate[] = [];
  let attemptsCount = 0;
  const maxAttempts = count * 10; // Limit attempts to avoid infinite loops

  while (randomCoordinates.length < count && attemptsCount < maxAttempts) {
    // Generate a random point within the outer bounding box
    const lat = outerLatMin + Math.random() * (outerLatMax - outerLatMin);
    const lng = outerLngMin + Math.random() * (outerLngMax - outerLngMin);

    // Check if the point is outside the inner exclusion zone
    const isInExclusionZone =
      lat >= innerLatMin &&
      lat <= innerLatMax &&
      lng >= innerLngMin &&
      lng <= innerLngMax;

    if (!isInExclusionZone) {
      randomCoordinates.push(new Mappedin.Coordinate(lat, lng));
    }

    attemptsCount++;
  }

  if (randomCoordinates.length < count) {
    console.warn(
      `Could only generate ${randomCoordinates.length} out of ${count} requested coordinates after ${maxAttempts} attempts`
    );
  }

  return randomCoordinates;
};
