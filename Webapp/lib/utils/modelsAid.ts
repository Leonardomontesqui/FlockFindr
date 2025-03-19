import Mappedin from "@mappedin/react-sdk";

/**
 * Determines if a point is inside a polygon using the ray casting algorithm
 */
const isPointInPolygon = (
  point: Mappedin.Coordinate,
  polygon: Mappedin.Coordinate[]
): boolean => {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].longitude;
    const yi = polygon[i].latitude;
    const xj = polygon[j].longitude;
    const yj = polygon[j].latitude;
    
    const intersect = ((yi > point.latitude) !== (yj > point.latitude)) &&
      (point.longitude < (xj - xi) * (point.latitude - yi) / (yj - yi) + xi);
    
    if (intersect) inside = !inside;
  }
  
  return inside;
};

/**
 * Generates random coordinates within a polygon boundary
 * @param count Number of coordinates to generate
 * @param coordinates Array of coordinates forming the polygon boundary
 * @returns Array of random coordinates
 */
export const generateRandomCoordinates = (
  count: number,
  coordinates: Mappedin.Coordinate[]
): Mappedin.Coordinate[] => {
  if (coordinates.length < 3) {
    throw new Error("At least 3 coordinates are required to form a polygon");
  }

  // Find bounding box of the polygon for efficient initial point generation
  const lats = coordinates.map(c => c.latitude);
  const lngs = coordinates.map(c => c.longitude);
  const latMin = Math.min(...lats);
  const latMax = Math.max(...lats);
  const lngMin = Math.min(...lngs);
  const lngMax = Math.max(...lngs);

  const randomCoordinates: Mappedin.Coordinate[] = [];
  let attemptsCount = 0;
  const maxAttempts = count * 20; // Allow more attempts for complex polygons

  while (randomCoordinates.length < count && attemptsCount < maxAttempts) {
    // Generate a random point within the bounding box
    const lat = latMin + Math.random() * (latMax - latMin);
    const lng = lngMin + Math.random() * (lngMax - lngMin);
    const point = new Mappedin.Coordinate(lat, lng);

    // Check if the point is inside the polygon
    if (isPointInPolygon(point, coordinates)) {
      randomCoordinates.push(point);
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

/**
 * Generates random coordinates within an outer polygon but excluding an inner polygon
 * @param count Number of coordinates to generate
 * @param coordinates Array of 8 coordinates - first 4 form outer polygon, next 4 form inner exclusion zone
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

  // Extract outer and inner polygon coordinates
  const outerPolygon = coordinates.slice(0, 4);
  const innerPolygon = coordinates.slice(4, 8);

  // Find bounding box of the outer polygon
  const lats = outerPolygon.map(c => c.latitude);
  const lngs = outerPolygon.map(c => c.longitude);
  const latMin = Math.min(...lats);
  const latMax = Math.max(...lats);
  const lngMin = Math.min(...lngs);
  const lngMax = Math.max(...lngs);

  const randomCoordinates: Mappedin.Coordinate[] = [];
  let attemptsCount = 0;
  const maxAttempts = count * 20;

  while (randomCoordinates.length < count && attemptsCount < maxAttempts) {
    // Generate a random point within the bounding box
    const lat = latMin + Math.random() * (latMax - latMin);
    const lng = lngMin + Math.random() * (lngMax - lngMin);
    const point = new Mappedin.Coordinate(lat, lng);

    // Check if the point is inside the outer polygon but not inside the inner polygon
    const isInOuterPolygon = isPointInPolygon(point, outerPolygon);
    const isInInnerPolygon = isPointInPolygon(point, innerPolygon);

    if (isInOuterPolygon && !isInInnerPolygon) {
      randomCoordinates.push(point);
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