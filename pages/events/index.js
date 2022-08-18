import Layout from "@/components/Layout";
import { API_URL, PER_PAGE } from "@/config/index";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";
import Link from "next/link";

export default function EventsPage({ events, page, total }) {
  const lastPage = Math.ceil(total / PER_PAGE) - 1;
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 0 } }) {
  const start = +page ? +page * PER_PAGE : 0;
  const totalRes = await fetch(`${API_URL}/events/count`);
  const total = await totalRes.json();

  const res = await fetch(
    `${API_URL}/events?_sort=date:DESC&_start=${start}&_limit=${PER_PAGE}`
  );
  const events = await res.json();

  return {
    props: { events: events, page: +page, total },
  };
}
// export async function getServerSideProps() {
//   const res = await fetch(`${API_URL}/events`);
//   const events = await res.json();

//   return {
//     props: { events: events },
//   };
// }
