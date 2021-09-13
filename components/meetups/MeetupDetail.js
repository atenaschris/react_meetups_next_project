import classes from "./MeetupDetail.module.css";


function MeetupDetail(props) {
  const {  img, title, description, address } = props;

  return (
    <>
      <section className={classes.section}>
        <h2>{title}</h2>
        <img src={img} />
        <address> {address}</address>
        <p>{description}</p>
      </section>
    </>
  );
}




export default MeetupDetail;
