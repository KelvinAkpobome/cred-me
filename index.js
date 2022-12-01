const Utils = require("./utils");
const utils = new Utils
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const { MessagingResponse } = require('twilio').twiml;

const app = express();
app.use(compression());
app.use(
  express.json({
    limit: "50mb",
    extended: true,
    parameterLimit: 1000000,
  })
);
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 1000000,
  })
);
app.use(
  bodyParser.json({
    limit: "50mb",
    extended: true,
    parameterLimit: 1000000,
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 1000000,
  })
);
app.use(cors("*"));
app.post('/sms', async (req, res) => {
  try {
    const twiml = new MessagingResponse();
    const message = twiml.message();

    message.body('Thanks, we have recieved your application');


    await utils.resolveBankAccount(req.body)
    return res.type('text/xml').status(200).send({
      responseCode: 200,
      status: "success",
      message: twiml.toString(),
      response: null
    });
  } catch (error) {
    return res.status(500).send({
      responseCode: 500,
      status: "failure",
      message: "An error occured",
      response: error
    });
  }

});

app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});
