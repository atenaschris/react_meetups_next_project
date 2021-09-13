import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "PUT") {
    const data = req.body;

    console.log(data);

    const client = await MongoClient.connect(
      "mongodb+srv://chris69:atenasaulab196@cluster0.qykmw.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const meetupUpdated = await meetupsCollection.findOneAndReplace(
      { _id: ObjectId(data.id) },
      {
        _id: ObjectId(data.id),
        title: data.title,
        address: data.address,
        description: data.description,
        image: data.image,
      },
      { returnNewDocument: true }
    );

    client.close();

    res.status(201).json({
      message: "Meetup updated successfully!!!",
      updatedMeetup: meetupUpdated,
    });
  }
}

export default handler;
