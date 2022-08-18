import { useState } from "react";
import { FaImage } from "react-icons/fa";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import moment from "moment";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import { parseCookies } from "@/helpers/index";

export default function EditEventPage({ event, token }) {
  const [values, setValues] = useState({
    name: "",
    performers: "",
    venue: "",
    address: "",
    date: "",
    time: "",
    description: "",
  });
  const [imagePreview, setImagePreview] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    setValues({
      ...values,
      ...event,
      date: moment(event.date).format("yyyy-MM-DD"),
    });
    const imageUrl = event.image
      ? event.image.formats.thumbnail.url
      : event.image;
    setImagePreview(imageUrl);
  }, []);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      toast.error("Please fill in all fields");
    } else {
      console.log(event.id);
      const res = await fetch(`${API_URL}/events/${event.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        toast.error("Something Went Wrong");
      } else {
        const evt = await res.json();
        router.push(`/events/${evt.slug}`);
      }
    }
  };

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const imageUpload = async (e) => {
    const res = await fetch(`${API_URL}/events/${event.id}`);
    const data = await res.json();
    setImagePreview(data.image.formats.thumbnail.url);
    setShowModal(false);
  };

  return (
    <Layout title="Add New Event">
      <Link href="/events">Go Back</Link>
      <h1>Edit Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={styles.grid}>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={styles.grid}>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            name="description"
            id="description"
            type="text"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <input type="submit" value="Update Event" className="btn" />
      </form>

      <h2>Event Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170}></Image>
      ) : (
        <>
          <div>
            <p>No image uploaded</p>
          </div>
          <div>
            <button
              className="btn-secondary"
              onClick={() => setShowModal(true)}
            >
              <FaImage /> Set Image
            </button>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
              <ImageUpload evtId={event.id} imageUploaded={imageUpload} />
            </Modal>
          </div>
        </>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ params: { id }, req }) {
  const res = await fetch(`${API_URL}/events/${id}`);
  const event = await res.json();

  const { token } = parseCookies(req);

  return {
    props: {
      event,
      token,
    },
  };
}
