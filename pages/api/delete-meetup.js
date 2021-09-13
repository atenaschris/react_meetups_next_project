import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "DELETE") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://chris69:atenasaulab196@cluster0.qykmw.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const deletedMeetup = await meetupsCollection.findOneAndDelete({
      _id: ObjectId(data.id),
    });
    client.close();

    res.status(201).json({
      message: "Meetup Deleted Successfully",
      deletedMeetup: deletedMeetup,
    });
  }
}

export default handler;
