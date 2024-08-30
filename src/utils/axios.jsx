import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzE5NTFkMWE1ZjY4MjZjYzkyYmJhMTIyNGU3OTE4MSIsIm5iZiI6MTcxOTQ2NTcxMS40NDM5MDQsInN1YiI6IjY2N2NmMDQxZmRjNzVlZGExNzliZDdhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.waSIbbo64FF3WdKlRlYWZkwp3XPa4pvkhcOcuuh42Kw'
    },
})


export default instance;