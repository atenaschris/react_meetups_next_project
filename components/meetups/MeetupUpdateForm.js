import Card from "../ui/Card";

import classes from "./MeetupUpdateForm.module.css";
import { useRef } from "react";

const MeetupUpdateForm = ({ singlemeetup,onPassingUpdatedMeetup }) => {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    onPassingUpdatedMeetup({
      id: singlemeetup.id,
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    });
  };
  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input
            type="text"
            required
            id="title"
            ref={titleInputRef}
            defaultValue={singlemeetup.title}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input
            type="url"
            required
            id="image"
            ref={imageInputRef}
            defaultValue={singlemeetup.img}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            required
            id="address"
            ref={addressInputRef}
            defaultValue={singlemeetup.address}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            rows="5"
            ref={descriptionInputRef}
            defaultValue={singlemeetup.description}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Update</button>
        </div>
      </form>
    </Card>
  );
};

export default MeetupUpdateForm;
