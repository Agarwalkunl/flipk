const express = require("express");
let { MongoClient } = require("mongodb");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const Razorpay = require("razorpay");

// const upload = multer({ dest: "last/" });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../flip/public");
  },
  filename: function (req, file, cb) {
    return cb(null, file.originalname);
  },
});

const upload = multer({ storage });
var crypto = require("crypto");
const bc = require("bcryptjs");
require("dotenv").config();
const sk = "kunal@123";
const POR = process.env.PORT || 1000;
const app = express();
app.use(express.json());
app.use(cors());
const client = new MongoClient(process.env.DATABASE);
let re, db, col, coll, colll;
const dealData = [
  {
    id: "product1",
    url:
      "https://rukminim1.flixcart.com/image/200/200/khf63680/cases-covers/back-cover/d/7/g/spigen-acs02256-original-imafxfgbffqaugur.jpeg?q=70",
    detailUrl: "",
    title: "Mobile Covers",

    description:
      "The Molife Sense 500, a brilliant smartwatch with a beautiful large display. Say hello to the infinity 1.7-inch display with 2.5D curved edges. Thanks to seamless Bluetooth 5.0 connectivity, you wont have to keep waiting. Bring a change to your outfit every day with changeable straps. A splash of color every day keeps the boredom away.",
    discount: "Extra 10% Off",
    tagline: "Deal of the day",
    price: "245",
    uprice: "675",
    qnty: "0",
  },

  {
    id: "product2",
    url:
      "https://rukminim1.flixcart.com/image/200/200/k5lcvbk0/moisturizer-cream/9/w/g/600-body-lotion-aloe-hydration-for-normal-skin-nivea-lotion-original-imafz8jb3ftt8gf9.jpeg?q=70",
    title: "Skin & Hair Care",

    discount: "From 99+5% Off",
    description:
      "The Molife Sense 500, a brilliant smartwatch with a beautiful large display. Say hello to the infinity 1.7-inch display with 2.5D curved edges. Thanks to seamless Bluetooth 5.0 connectivity, you wont have to keep waiting. Bring a change to your outfit every day with changeable straps. A splash of color every day keeps the boredom away.",
    tagline: "Shampoos, Face Washes & More",
    price: "241",
    uprice: "639",
    qnty: "0",
  },
  {
    id: "product3",
    url:
      "https://rukminim1.flixcart.com/flap/200/200/image/74bc985c62f19245.jpeg?q=70",
    title: "Skybags & Safari",

    description:
      "The Molife Sense 500, a brilliant smartwatch with a beautiful large display. Say hello to the infinity 1.7-inch display with 2.5D curved edges. Thanks to seamless Bluetooth 5.0 connectivity, you wont have to keep waiting. Bring a change to your outfit every day with changeable straps. A splash of color every day keeps the boredom away.",
    discount: "Upto 70% Off",
    tagline: "Deal of the Day",
    price: "45",
    uprice: "270",
    qnty: "0",
  },
  {
    id: "product4",
    url:
      "https://rukminim1.flixcart.com/image/300/300/kll7bm80/smartwatch/c/1/n/43-mo-sw-sense-500-android-ios-molife-original-imagyzyycnpujyjh.jpeg?q=70",
    detailUrl:
      "https://rukminim1.flixcart.com/image/416/416/kll7bm80/smartwatch/c/1/n/43-mo-sw-sense-500-android-ios-molife-original-imagyzyycnpujyjh.jpeg?q=70",
    title: "Smart Watches",

    price: {
      mrp: 6999,
      cost: 4049,
      discount: "42%",
    },
    description:
      "The Molife Sense 500, a brilliant smartwatch with a beautiful large display. Say hello to the infinity 1.7-inch display with 2.5D curved edges. Thanks to seamless Bluetooth 5.0 connectivity, you wont have to keep waiting. Bring a change to your outfit every day with changeable straps. A splash of color every day keeps the boredom away.",
    discount: "Grab Now",
    tagline: "Best Seller",
    price: "25",
    uprice: "175",
    qnty: "0",
  },

  {
    id: "product5",
    url:
      "https://rukminim1.flixcart.com/flap/150/150/image/b616a7aa607d3be0.jpg?q=70",
    title: "Sports & Fitness Essentials",

    description:
      "The Molife Sense 500, a brilliant smartwatch with a beautiful large display. Say hello to the infinity 1.7-inch display with 2.5D curved edges. Thanks to seamless Bluetooth 5.0 connectivity, you wont have to keep waiting. Bring a change to your outfit every day with changeable straps. A splash of color every day keeps the boredom away.",
    discount: "Upto 80% Off",
    tagline: "Ab Exerciser, Yoga & more",
    price: "95",
    uprice: "85",
    qnty: "0",
  },
];

const fealData = [
  {
    id: "product1",
    url:
      "https://rukminim1.flixcart.com/image/200/200/khf63680/cases-covers/back-cover/d/7/g/spigen-acs02256-original-imafxfgbffqaugur.jpeg?q=70",
    detailUrl: "",
    title: "Mobile Covers",

    description:
      "The Molife Sense 500, a brilliant smartwatch with a beautiful large display. Say hello to the infinity 1.7-inch display with 2.5D curved edges. Thanks to seamless Bluetooth 5.0 connectivity, you wont have to keep waiting. Bring a change to your outfit every day with changeable straps. A splash of color every day keeps the boredom away.",
    discount: "Extra 10% Off",
    tagline: "Deal of the day",
    price: 245,
    uprice: "675",
    qnty: "0",
    cat: "mobile",
    all: "all",
  },
  {
    id: "product1",
    url:
      "https://rukminim1.flixcart.com/image/200/200/khf63680/cases-covers/back-cover/d/7/g/spigen-acs02256-original-imafxfgbffqaugur.jpeg?q=70",
    detailUrl: "",
    title: "Mobile Covers",

    description:
      "The Molife Sense 500, a brilliant smartwatch with a beautiful large display. Say hello to the infinity 1.7-inch display with 2.5D curved edges. Thanks to seamless Bluetooth 5.0 connectivity, you wont have to keep waiting. Bring a change to your outfit every day with changeable straps. A splash of color every day keeps the boredom away.",
    discount: "Extra 10% Off",
    tagline: "Deal of the day",
    price: 245,
    uprice: "675",
    qnty: "0",
    cat: "mobile",
    all: "all",
  },
  {
    id: "product1",
    url:
      "https://rukminim1.flixcart.com/image/200/200/khf63680/cases-covers/back-cover/d/7/g/spigen-acs02256-original-imafxfgbffqaugur.jpeg?q=70",
    detailUrl: "",
    title: "Mobile Covers",

    description:
      "The Molife Sense 500, a brilliant smartwatch with a beautiful large display. Say hello to the infinity 1.7-inch display with 2.5D curved edges. Thanks to seamless Bluetooth 5.0 connectivity, you wont have to keep waiting. Bring a change to your outfit every day with changeable straps. A splash of color every day keeps the boredom away.",
    discount: "Extra 10% Off",
    tagline: "Deal of the day",
    price: 245,
    uprice: "675",
    qnty: "0",
    cat: "mobile",
    all: "all",
  },

  {
    id: "product2",
    url:
      "https://rukminim1.flixcart.com/image/200/200/k5lcvbk0/moisturizer-cream/9/w/g/600-body-lotion-aloe-hydration-for-normal-skin-nivea-lotion-original-imafz8jb3ftt8gf9.jpeg?q=70",
    title: "Skin & Hair Care",

    discount: "From 99+5% Off",
    description:
      "The Molife Sense 500, a brilliant smartwatch with a beautiful large display. Say hello to the infinity 1.7-inch display with 2.5D curved edges. Thanks to seamless Bluetooth 5.0 connectivity, you wont have to keep waiting. Bring a change to your outfit every day with changeable straps. A splash of color every day keeps the boredom away.",
    tagline: "Shampoos, Face Washes & More",
    price: 241,
    uprice: "639",
    qnty: "0",
    cat: "face wash",
    all: "all",
  },
  {
    id: "product2",
    url:
      "https://rukminim1.flixcart.com/image/200/200/k5lcvbk0/moisturizer-cream/9/w/g/600-body-lotion-aloe-hydration-for-normal-skin-nivea-lotion-original-imafz8jb3ftt8gf9.jpeg?q=70",
    title: "Skin & Hair Care",

    discount: "From 99+5% Off",
    description:
      "The Molife Sense 500, a brilliant smartwatch with a beautiful large display. Say hello to the infinity 1.7-inch display with 2.5D curved edges. Thanks to seamless Bluetooth 5.0 connectivity, you wont have to keep waiting. Bring a change to your outfit every day with changeable straps. A splash of color every day keeps the boredom away.",
    tagline: "Shampoos, Face Washes & More",
    price: 241,
    uprice: "639",
    qnty: "0",
    cat: "face wash",
    all: "all",
  },
  {
    id: "product2",
    url:
      "https://rukminim1.flixcart.com/image/200/200/k5lcvbk0/moisturizer-cream/9/w/g/600-body-lotion-aloe-hydration-for-normal-skin-nivea-lotion-original-imafz8jb3ftt8gf9.jpeg?q=70",
    title: "Skin & Hair Care",

    discount: "From 99+5% Off",
    description:
      "The Molife Sense 500, a brilliant smartwatch with a beautiful large display. Say hello to the infinity 1.7-inch display with 2.5D curved edges. Thanks to seamless Bluetooth 5.0 connectivity, you wont have to keep waiting. Bring a change to your outfit every day with changeable straps. A splash of color every day keeps the boredom away.",
    tagline: "Shampoos, Face Washes & More",
    price: 241,
    uprice: "639",
    qnty: "0",
    cat: "face wash",
    all: "all",
  },
  {
    id: "product3",
    url:
      "https://rukminim1.flixcart.com/flap/200/200/image/74bc985c62f19245.jpeg?q=70",
    title: "Skybags & Safari",

    description:
      "The Molife Sense 500, a brilliant smartwatch with a beautiful large display. Say hello to the infinity 1.7-inch display with 2.5D curved edges. Thanks to seamless Bluetooth 5.0 connectivity, you wont have to keep waiting. Bring a change to your outfit every day with changeable straps. A splash of color every day keeps the boredom away.",
    discount: "Upto 70% Off",
    tagline: "Deal of the Day",
    price: 45,
    uprice: "270",
    qnty: "0",
    cat: "smart watch",
    all: "all",
  },
  {
    id: "product4",
    url:
      "https://rukminim1.flixcart.com/image/300/300/kll7bm80/smartwatch/c/1/n/43-mo-sw-sense-500-android-ios-molife-original-imagyzyycnpujyjh.jpeg?q=70",
    detailUrl:
      "https://rukminim1.flixcart.com/image/416/416/kll7bm80/smartwatch/c/1/n/43-mo-sw-sense-500-android-ios-molife-original-imagyzyycnpujyjh.jpeg?q=70",
    title: "Smart watch",

    price: {
      mrp: 6999,
      cost: 4049,
      discount: "42%",
    },
    description:
      "The Molife Sense 500, a brilliant smartwatch with a beautiful large display. Say hello to the infinity 1.7-inch display with 2.5D curved edges. Thanks to seamless Bluetooth 5.0 connectivity, you wont have to keep waiting. Bring a change to your outfit every day with changeable straps. A splash of color every day keeps the boredom away.",
    discount: "Grab Now",
    tagline: "Best Seller",
    price: 25,
    uprice: "175",
    qnty: "0",
    cat: "smart watch",
    all: "all",
  },

  {
    id: "product5",
    url:
      "https://rukminim1.flixcart.com/flap/150/150/image/b616a7aa607d3be0.jpg?q=70",
    title: "Sports & Fitness Essentials",

    description:
      "The Molife Sense 500, a brilliant smartwatch with a beautiful large display. Say hello to the infinity 1.7-inch display with 2.5D curved edges. Thanks to seamless Bluetooth 5.0 connectivity, you wont have to keep waiting. Bring a change to your outfit every day with changeable straps. A splash of color every day keeps the boredom away.",
    discount: "Upto 80% Off",
    tagline: "Ab Exerciser, Yoga & more",
    price: 95,
    uprice: "85",
    qnty: "0",
    cat: "smart watch",
    all: "all",
  },
];
async function ged() {
  re = await client.connect();
  db = re.db("data");
  col = db.collection("datas");
  coll = db.collection("signup");
  cola = db.collection("admins");
  colaa = db.collection("adminl");
  colll = db.collection("login");
  co = db.collection("filter");
  console.log("connect");
  fun();
}
app.post("/sign", async (req, resp) => {
  let { firstname, lastname, username, email, cfpassword, password } = req.body;
  req.body.password = await bc.hash(password, 10);

  if (
    firstname == "" ||
    firstname == undefined ||
    email == "" ||
    email == undefined ||
    password == "" ||
    password == undefined ||
    cfpassword == "" ||
    cfpassword == undefined ||
    lastname == "" ||
    lastname == undefined ||
    password.length < 6
  ) {
    resp.json({ status: 400 });
  } else {
    if (password != cfpassword) {
      resp.send({ status: 400 });
    } else {
      let resuu = await coll.find({ email }).toArray();
      if (resuu.length == 0 || resuu == undefined) {
        let resu = await coll.save(req.body);
        if (resu) {
          resp.send({ status: 200, message: "ok" });
        } else resp.send({ status: 500, message: "error" });
      } else if (resuu) {
        resp.json({ status: 401 });
      }
    }
  }
});
app.post("/uadmin", upload.single("image"), async (req, resp) => {
  let { title, price, uprice, discount, id } = req.body;
  let mab = req.body;
  let tit;
  console.log("ioasdfasd");
  if (req.file) {
    console.log("ioasasfasdfdf");
    let ma = req.file.originalname;
    let resu = await col.save({ url: ma });
    console.log("ioasdf");
  }

  if (
    price == "" ||
    price == undefined ||
    uprice == "" ||
    uprice == undefined ||
    discount == "" ||
    discount == undefined ||
    title == "" ||
    title == undefined ||
    id == "" ||
    id == undefined
  ) {
    resp.json({ status: 400 });
  } else {
    let resu = await col.save(mab);
    if (resu) {
      resp.send({ status: 200, message: "ok" });
    } else resp.send({ status: 500, message: "error" });
  }
});

app.put("/edmin", async (req, resp) => {
  let { title, price, id, discount } = req.body;
  let mab = req.body;

  if (
    id == "" ||
    id == undefined ||
    price == "" ||
    price == undefined ||
    discount == "" ||
    discount == undefined ||
    title == "" ||
    title == undefined
  ) {
    resp.json({ status: 400 });
  } else {
    let resu = await col.update({ id: req.body.id }, { $set: req.body });
    if (resu) {
      resp.send({ status: 200, message: "ok" });
    } else resp.send({ status: 500, message: "error" });
  }
});
app.post("/asign", async (req, resp) => {
  let { name, email, cfpassword, password } = req.body;
  req.body.password = await bc.hash(password, 10);

  if (
    email == "" ||
    email == undefined ||
    password == "" ||
    password == undefined ||
    cfpassword == "" ||
    cfpassword == undefined ||
    name == "" ||
    name == undefined ||
    password.length < 6
  ) {
    resp.json({ status: 400 });
  } else {
    if (password != cfpassword) {
      resp.send({ status: 400 });
    } else {
      let resuu = await cola.find({ email }).toArray();
      if (resuu.length == 0 || resuu == undefined) {
        let resu = await cola.save(req.body);
        if (resu) {
          resp.send({ status: 200, message: "ok" });
        } else resp.send({ status: 500, message: "error" });
      } else if (resuu) {
        resp.json({ status: 401 });
      }
    }
  }
});
app.post("/login", async (req, resp) => {
  let { email, name } = req.body;

  if (email == "" || name == "" || name == undefined || email == undefined) {
    resp.json({ status: 400 });
  } else {
    let resuu = await coll.find({ email }).toArray();

    if (resuu.length == 0) {
      resp.json({ status: 204 });
    } else {
      const pass = await bc.compare(name, resuu[0].password);
      if (resuu[0].email == email && pass) {
        let resu = await colll.save(req.body);
        if (resu) {
          jwt.sign({ resu }, sk, { expiresIn: "2h" }, (e, token) => {
            resp.json({ status: 205, token: token, email: email });
          });
        } else {
          resp.json({ status: 206 });
        }
      } else {
        resp.json({ status: 500 });
      }
    }
  }
});
app.post("/slogin", async (req, resp) => {
  let { email, name } = req.body;

  if (email == "" || name == "" || name == undefined || email == undefined) {
    resp.json({ status: 400 });
  } else {
    let resuu = await cola.find({ email }).toArray();

    if (resuu.length == 0) {
      resp.json({ status: 204 });
    } else {
      const pass = await bc.compare(name, resuu[0].password);
      if (resuu[0].email == email && pass) {
        let resu = await colaa.save(req.body);
        if (resu) {
          jwt.sign({ resu }, sk, { expiresIn: "2h" }, (e, token) => {
            resp.json({ status: 205, token: token, email: email });
          });
        } else {
          resp.json({ status: 206 });
        }
      } else {
        resp.json({ status: 500 });
      }
    }
  }
});
app.get("/read", async (req, resp) => {
  let resuu = await col.find().toArray();
  resp.json({ status: 200, data: resuu });
});
app.get("/pread", async (req, resp) => {
  let resuu = await cola.find().toArray();
  resp.json({ status: 200, data: resuu });
});
app.post("/dread", async (req, resp) => {
  let resuu = await col.deleteMany({ id: req.body.id });
  let resuuu = await col.find().toArray();
  resp.json({ status: 200, data: resuuu });
});
app.get("/paread", async (req, resp) => {
  let resuu = await col.find().toArray();
  resp.json({ status: 200, data: resuu });
});
app.post("/aread", async (req, resp) => {
  let { emaill } = req.body;

  let resuu = await cola.find({ email: JSON.parse(emaill) }).toArray();
  resp.json({ status: 200, data: resuu });
});
app.post("/fread", async (req, resp) => {
  if (req.body.t) {
    let resuu = await co.find({ cat: req.body.t }).toArray();
    resp.json({ status: 200, data: resuu });
  }
});
app.post("/ffread", async (req, resp) => {
  if (req.body.t) {
    let resuu = await co.find({ all: req.body.t }).toArray();
    resp.json({ status: 200, data: resuu });
  }
});
app.post("/fffread", async (req, resp) => {
  if (req.body.tt) {
    let resuuu = await co
      .find({ price: { $gt: req.body.tt[0], $lt: req.body.tt[1] } })
      .toArray();
    resp.json({ status: 200, data: resuuu });
  }
});

app.post("/readd", async (req, resp) => {
  let resuu = await col.find({ id: req.body.id }).toArray();
  resp.json({ status: 200, data: resuu });
});
app.get("/search/:key", async (req, resp) => {
  const sf = req.params.key;

  const regex = new RegExp(sf, "i");

  col
    .find({
      $or: [{ title: regex }],
    })
    .toArray((err, result) => {
      if (err) return console.log(err);
      resp.status(200).send(result);
    });
});

async function fun() {
  await col.deleteMany({});
  let resu = await col.insert(dealData);
  if (resu) {
    console.log("data is saved");
  } else {
    console.log("something went wrong");
  }
  await co.deleteMany({});
  let rresu = await co.insert(fealData);
  if (rresu) {
    console.log("data is again  saved");
  } else {
    console.log("something went wrong");
  }
}

app.post("/verify", (req, res) => {
  let body =
    req.body.response.razorpay_order_id +
    "|" +
    req.body.response.razorpay_payment_id;

  var expectedSignature = crypto
    .createHmac("sha256", "FRZDowR7wPNLWrv1eaoaOg6w")
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === req.body.response.razorpay_signature)
    res.send({ message: "vaild", status: 210 });
  else res.send({ message: "invaild", status: 211 });
});
app.post("/orders", (req, resp) => {
  var instance = new Razorpay({
    key_id: "rzp_test_2KyAK1mLCm4yPc",
    key_secret: "FRZDowR7wPNLWrv1eaoaOg6w",
  });

  var options = {
    amount: req.body.dd * 100, // amount in the smallest currency unit
    currency: "INR",
  };
  instance.orders.create(options, function (err, order) {
    if (err) {
      return resp.send({ status: 500, message: "server err" });
    } else {
      return resp.send({ status: 200, message: "order created", order: order });
    }
  });
});
ged();
app.listen(PORT, console.log("server"));
