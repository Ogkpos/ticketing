import buildClient from "../api/build-client";
import Link from "next/link";
const LandingPage = ({ currentUser, tickets }) => {
  const ticketList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>${ticket.price}</td>
        <td>
          <Link
            legacyBehavior
            href="/tickets/[ticketId]"
            as={`/tickets/${ticket.id}`}
          >
            <a>View</a>
          </Link>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  /*
  // console.log(req.headers);
  //check if we are on the server or browser
  if (typeof window === "undefined") {
    const response = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        //headers: {
        //  Host: "ticketing.dev",
        //},
        headers: req.headers,
      }
    );
    return response.data;
  } else {
    const response = await axios.get("/api/users/currentuser").catch((err) => {
      err.message;
    });
    return response.data;
  }
*/

  //const client = buildClient(context);
  //const { data } = await client.get("/api/users/currentUser");
  //return data;

  const { data } = await client.get("/api/tickets");
  return { tickets: data };
};
export default LandingPage;
