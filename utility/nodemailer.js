const nodemailer = require("nodemailer");

module.exports.sendMail = async function sendMail(str, data) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "075bct019.bigyan@pcampus.edu.np",
      pass: "adoynetnffjqcpzv",
    },
  });

  var Osubject, Ohtml;
  if (str == "signup") {
    Osubject = `Thank you for signing ${data.name}`;
    var id=data._id;
    Ohtml = `
    <h1>Welcome to Agro-Tech</h1>
    <p>Hope you have a good time ahead!</p>
    <p>Your details:</p>
    <p>Name: ${data.name}</p>
    <p>Email: ${data.email}</p>
    <a href="${
      "http://localhost:3000/verify/" + id + "?id=" + id
    }">Click here</a>
    `;
  } else if (str == "resetpassword") {
    Osubject = `Reset Password`;
    Ohtml = `
    <h1>Agro-Tech.com</h1>
    Here is your link to reset your password.
    ${data.resetPasswordLink}
    `;
  }

  let info = await transporter.sendMail({
    from: '"Agro-Tech" <075bct019.bigyan@pcampus.edu.np>',
    to: data.email,
    subject: Osubject,
    html: Ohtml,
  });

  console.log("Message sent: %s", info.messageId);
};
