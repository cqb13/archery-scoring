type Props = {
  profileName: string;
  profileId: number;
  location: string;
  distance: number;
  distanceUnit: string;
  ends: number;
  arrowsPerEnd: number;
  splitEnds: number;
  bow: string;
};

export default function createScoringProfile({
  profileName,
  profileId,
  location,
  distance,
  distanceUnit,
  ends,
  arrowsPerEnd,
  splitEnds,
  bow
}: Props) {
  return {
    profileName,
    profileId,
    location,
    distance,
    distanceUnit,
    ends,
    arrowsPerEnd,
    splitEnds,
    bow
  };
}
