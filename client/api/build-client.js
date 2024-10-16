import axios from "axios";

export default ({ req }) => {
  if (typeof window === "undefined") {
    //create a preconfigured version of axios using axios.create()
    //we are on the server
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    //we are on the client
    return axios.create({
      baseURL: "/",
    });
  }
};
