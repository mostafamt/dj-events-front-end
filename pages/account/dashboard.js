import Layout from "@/components/Layout";
import { parseCookies } from "@/helpers/index";
import { API_URL } from "@/config/index";
import styles from "@/styles/Dashboard.module.css";
import DashboardEvent from "@/components/DashboardEvent";
import React from "react";

function DashboardPage({ serverSideEvents, token }) {
  const [events, setEvents] = React.useState(serverSideEvents);
  const deleteEvent = async (id) => {
    const res = await fetch(`${API_URL}/events/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const removedEvent = await res.json();
    const { id: id_of_removed_event } = removedEvent;
    // setEvents(evts);
    const new_events = events.filter((e) => e.id !== id_of_removed_event);
    setEvents(new_events);
    // console.log("events= ");
    // console.log(events);
    // console.log("evts= ");
    // console.log(evts);
  };

  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>
        {events.map((evt) => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  console.log(token);
  const res = await fetch(`${API_URL}/events/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const serverSideEvents = await res.json();
  return {
    props: { serverSideEvents, token },
  };
}

export default DashboardPage;
