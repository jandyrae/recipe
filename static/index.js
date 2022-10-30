const URL_PARAMS = new URLSearchParams(window.location.search);
const TOKEN = URL_PARAMS.get('token');

const show = (selector) => {
    document.querySelector.apply(selector).style.display = 'block';
}

const hide = (selector) => {
    document.querySelector.apply(selector).style.display = 'none';
}

if (TOKEN) {
    hide('.unauthorized');
    show('.authorized');
}


// app.get("/auth", (req, res) => {
//     res.redirect(`https://github.com/login/oath/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
//   });
//   app.get("/oath-callback", ({query: {code} }, res) => {
//   const body = {
//     client_id: process.env.GITHUB_CLIENT_ID,
//     client_secret: process.env.GITHUB_SECRET,
//     code,
//   };
//   const opts = { headers: {accept: 'application/json'} };
//   axios
//     .post('https://github.com/login/oath/access_token', body, opts)
//     .then((_res) => _res.data.access_token)
//     .then((token => {
//       console.log('My token: ', token);
//       res.redirect(`/?token=${token}`);
//     })
//     .catch((err) => res.status(500).json({ err: err.message }))
//     )
// })