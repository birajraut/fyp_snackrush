const nodemailer = require("nodemailer");

// Create a transporter object
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "np03cs4a220196@heraldcollege.edu.np", // Replace with your Gmail address
        pass: "bstb qvdc fxee lgmu", // Use an App Password if using Gmail   
    },
});





const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from:'np03cs4a220196@heraldcollege.edu.np',
        to,
        subject,
        text,
    };
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error:", error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}

module.exports = { sendEmail }



