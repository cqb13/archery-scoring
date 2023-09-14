import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import mergeDateTimeToValue from "@utils/mergeDateTimeToValue";
import sortDateTime from "@utils/sortDateTime";
import { db } from "@lib/firebase";

export default async function getAllSessions(user: any) {
  const dateMap = new Map();

  const scoreCollection: any = collection(db, "users", user.uid, "scores");
  const scoreQuery = query(
    scoreCollection,
    orderBy("date", "desc"),
    limit(scoreCollection.length)
  );
  const scoreQuerySnapshot = await getDocs(scoreQuery);
  scoreQuerySnapshot.forEach((doc: any) => {
    const date: any = new Date(doc.data().date).toLocaleDateString();
    const time: any = new Date(doc.data().date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
    const name = doc.data().name;

    if (name) dateMap.set(date + " " + time + " | " + name, doc.id);
    else dateMap.set(date + " " + time, doc.id);
  });

  const sortedDates = sortDateTime(dateMap.keys());

  const sortedMap = mergeDateTimeToValue(sortedDates, dateMap);

  return { sortedMap, dateMap };
}
