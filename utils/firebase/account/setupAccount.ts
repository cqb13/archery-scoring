import createScoringProfile from "@/utils/createScoringProfile";
import { setDoc } from "firebase/firestore";

export default async function setupAccount(user: any, userRef: any) {
  const profiles = [];

  const IndoorProfile = createScoringProfile({
    arrowsPerEnd: 3,
    ends: 10,
    splitEnds: 1,
    distance: 18,
    distanceUnit: "M (meters)",
    location: "Indoor",
    bow: "Olympic Recurve",
    profileName: "Indoor",
    profileId: 1
  });
  const OutdoorProfile = createScoringProfile({
    arrowsPerEnd: 6,
    ends: 6,
    splitEnds: 1,
    distance: 70,
    distanceUnit: "M (meters)",
    location: "Outdoor",
    bow: "Olympic Recurve",
    profileName: "Outdoor",
    profileId: 2
  });
  const IndoorTournamentProfile = createScoringProfile({
    arrowsPerEnd: 3,
    ends: 20,
    splitEnds: 2,
    distance: 18,
    distanceUnit: "M (meters)",
    location: "Indoor",
    bow: "Olympic Recurve",
    profileName: "Indoor Tournament",
    profileId: 3
  });
  const OutdoorTournamentProfile = createScoringProfile({
    arrowsPerEnd: 6,
    ends: 12,
    splitEnds: 2,
    distance: 70,
    distanceUnit: "M (meters)",
    location: "Outdoor",
    bow: "Olympic Recurve",
    profileName: "Outdoor Tournament",
    profileId: 4
  });
  const leagueProfile = createScoringProfile({
    arrowsPerEnd: 3,
    ends: 15,
    splitEnds: 3,
    distance: 18,
    distanceUnit: "M (meters)",
    location: "Indoor",
    bow: "Olympic Recurve",
    profileName: "League",
    profileId: 5
  });

  profiles.push(IndoorProfile);
  profiles.push(OutdoorProfile);
  profiles.push(IndoorTournamentProfile);
  profiles.push(OutdoorTournamentProfile);
  profiles.push(leagueProfile);

  await setDoc(userRef, {
    displayName: user.displayName,
    profileType: "private",
    photoURL: user.photoURL,
    email: user.email,
    profiles: profiles,
    setupDefaultProfile: 1,
    allScores: [],
    highScore: 0,
    lowScore: 0
  });
}
