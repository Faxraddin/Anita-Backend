const newsModel = require("../models/news");
const emailModel = require("../models/email");

const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();

const createNews = async (req, res) => {
  const { time, title, text } = req.body;

  try {
    const newNews = new newsModel({
      time,
      title,
      text,
      img: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    await newNews.save();

    return res
      .status(201)
      .json({ message: "News created successfully", news: newNews });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Error in server..." });
  }
};

const getNews = async (req, res) => {
  try {
    const allNews = await newsModel.find().lean();

    const newsWithImages = allNews.map((news) => {
      const plainNews = { ...news };

      if (plainNews.img && plainNews.img.data) {
        const imgData = plainNews.img.data.toString("base64");
        const contentType = plainNews.img.contentType;
        plainNews.img = `data:${contentType};base64,${imgData}`;
      }

      return plainNews;
    });

    return res.status(200).json({ news: newsWithImages });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Error in server..." });
  }
};

const sendEmail = async (email,message,name,company,number ) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'info@anitaimpex.com',
      subject: 'Client Inquiry',
      text: `
        Dear Team,
    
        fuck you all! cause you are scammers!!!
      `,
    };
    
  
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Email Error:", error);
    throw new Error("Error sending verification code via email");
  }
  };
  

const recieveEmail = async (req,res) => {
  const {email,message,name,company,number} = req.body;
  try {
    await sendEmail(email, name,number,company,message);
    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Error in server..." });
  }
}

module.exports = { createNews: createNews, getNews: getNews,recieveEmail:recieveEmail };
