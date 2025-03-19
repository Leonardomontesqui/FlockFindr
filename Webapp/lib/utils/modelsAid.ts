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
 * Sorts polygon vertices in clockwise order to ensure proper polygon definition
 */
const sortPolygonVertices = (vertices: Mappedin.Coordinate[]): Mappedin.Coordinate[] => {
  if (vertices.length < 3) return vertices;
  
  // Find center point of the polygon
  const center = vertices.reduce(
    (acc, vertex) => {
      acc.latitude += vertex.latitude / vertices.length;
      acc.longitude += vertex.longitude / vertices.length;
      return acc;
    },
    { latitude: 0, longitude: 0 }
  );
  
  // Sort vertices by angle from center point
  return [...vertices].sort((a, b) => {
    const angleA = Math.atan2(a.latitude - center.latitude, a.longitude - center.longitude);
    const angleB = Math.atan2(b.latitude - center.latitude, b.longitude - center.longitude);
    return angleA - angleB;
  });
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

  // Sort vertices to ensure proper polygon definition
  const sortedPolygon = sortPolygonVertices(coordinates);

  // Find bounding box of the polygon for efficient initial point generation
  const lats = sortedPolygon.map(c => c.latitude);
  const lngs = sortedPolygon.map(c => c.longitude);
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
    if (isPointInPolygon(point, sortedPolygon)) {
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

  // Sort vertices to ensure proper polygon definition
  const sortedOuterPolygon = sortPolygonVertices(outerPolygon);
  const sortedInnerPolygon = sortPolygonVertices(innerPolygon);

  // Find bounding box of the outer polygon
  const lats = sortedOuterPolygon.map(c => c.latitude);
  const lngs = sortedOuterPolygon.map(c => c.longitude);
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
    const isInOuterPolygon = isPointInPolygon(point, sortedOuterPolygon);
    const isInInnerPolygon = isPointInPolygon(point, sortedInnerPolygon);

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