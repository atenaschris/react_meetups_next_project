import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head";

function NewMeetupPage() {
  const router = useRouter();
  const addMeetupHandler = async (meetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    console.log(data);

    router.push("/");
  };

  return <>
  <Head>
    <title>
      Add a new meetup
    </title>
    <meta name="description" content="Add your own meetups and create amazing newworking opportunities." ></meta>
  </Head>
   <NewMeetupForm onAddMeetup={addMeetupHandler} />
  </>
}

export default NewMeetupPage;
