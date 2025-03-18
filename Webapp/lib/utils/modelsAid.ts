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
