import MeetupDetail from "../../components/meetups/MeetupDetail";

import classes from "./index.module.css";
import Router from "next/router";

import { useState } from "react";

import { MongoClient, ObjectId } from "mongodb";

import Head from "next/head";
import MeetupUpdateForm from "../../components/meetups/MeetupUpdateForm";

function DetailPage({ singlemeetup }) {
  const [formIsOpened, setFormIsOpened] = useState(false);

  const onUpdatingMeetupHandler = () => {
    setFormIsOpened((prevState) => !prevState);
  };
  const deleteMeetupHandler = async () => {
    const response = await fetch("/api/delete-meetup", {
      method: "DELETE",
      body: JSON.stringify(singlemeetup),
      headers: { "Content-type": "application/json" },
    });

    const data = await response.json();

    console.log(data.deletedMeetup.value);

    Router.replace("/");
  };

  const updateMeetupHandler = async (updatedMeetup) => {
    console.log(JSON.stringify(updatedMeetup));
    const response = await fetch("/api/update-meetup", {
      method: "PUT",
      body: JSON.stringify(updatedMeetup),
      headers: { "Content-type": "application/json" },
    });

    const data = await response.json();

    console.log(data);

    setFormIsOpened((prevState) => !prevState);

    Router.push(`/${singlemeetup.id}`);
  };

  return (
    <>
      <Head>
        <title>{singlemeetup.title}</title>
        <meta name="description" content={singlemeetup.description}></meta>
      </Head>
      <h1 className={classes.h1}>Detail Page here!!!</h1>
      <MeetupDetail
        id={singlemeetup.id}
        img={singlemeetup.img}
        title={singlemeetup.title}
        description={singlemeetup.description}
        address={singlemeetup.address}
      />

      {!formIsOpened && (
        <div className={classes.actions}>
          <button onClick={deleteMeetupHandler}>Delete</button>

          <button onClick={onUpdatingMeetupHandler}>Update</button>
        </div>
      )}

      {formIsOpened && (
        <MeetupUpdateForm
          singlemeetup={singlemeetup}
          onPassingUpdatedMeetup={updateMeetupHandler}
        />
      )}
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://chris69:atenasaulab196@cluster0.qykmw.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetupdata = await meetupsCollection.find({}, { _id: 1 }).toArray();

  console.log(meetupdata);

  client.close();

  const formattedMeetupData = meetupdata
    .map((meetup) => ({
      _id: meetup._id.toString(),
    }))
    .map((meetup) => ({
      params: {
        meetupId: meetup._id,
      },
    }));

  return {
    fallback: "blocking",
    paths: formattedMeetupData,
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  console.log(meetupId);

  const client = await MongoClient.connect(
    "mongodb+srv://chris69:atenasaulab196@cluster0.qykmw.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  const formatSelectedMeetupId = selectedMeetup._id.toString();

  const formattedSelectedMeetup = {
    id: formatSelectedMeetupId,
    title: selectedMeetup.title,
    address: selectedMeetup.address,
    img: selectedMeetup.image,
    description: selectedMeetup.description,
  };

  return {
    props: {
      singlemeetup: formattedSelectedMeetup,
    },
  };
}

export default DetailPage;
