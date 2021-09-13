import MeetUpList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

function HomePage({ meetups }) {
  console.log(meetups);

  let content = <MeetUpList meetups={meetups} />;

  if (meetups.length <= 0) {
    content = <p>There are no meetups. Please start adding one</p>;
  }

  return (
    <>
      <Head>
        <title>React meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React mmeetups"
        ></meta>
      </Head>
      {content}
    </>
  );
}

/* export async function getServerSideProps(content) {
  const req = content.req;
  const res = content.res;

  return {
    props: {
      meetups: DUMMY_DATA,
    },
  };
} */

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://chris69:atenasaulab196@cluster0.qykmw.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const data = await meetupsCollection.find().toArray();

  client.close();

  const formattedData = data.map((meetup) => {
    return {
      id: meetup._id.toString(),
      title: meetup.title,
      image: meetup.image,
      address: meetup.address,
      description: meetup.description,
    };
  });

  return {
    props: {
      meetups: formattedData,
    },
    revalidate: 1,
  };
}

export default HomePage;
