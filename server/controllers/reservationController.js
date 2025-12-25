import nodemailer from 'nodemailer';

// Configure the Email Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email (e.g., flavortown@gmail.com)
    pass: process.env.EMAIL_PASS  // Your App Password (not your regular password)
  }
});

export const createReservation = async (req, res) => {
  try {
    const newReservation = new Reservation(req.body);
    const savedBooking = await newReservation.save();

    const mailOptions = {
  from: `"Flavor Town" <${process.env.EMAIL_USER}>`,
  to: savedBooking.email,
  subject: 'Reservation Confirmed - Flavor Town',
  html: `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 15px;">
      <h2 style="color: #f97316;">Table Confirmed!</h2>
      <p>Hi ${savedBooking.name}, your table is ready at <strong>Flavor Town</strong>.</p>
      
      <div style="background: #fff7ed; padding: 15px; border-radius: 10px; margin: 20px 0;">
        <p><strong>Date:</strong> ${savedBooking.date}</p>
        <p><strong>Time:</strong> ${savedBooking.time}</p>
        <p><strong>Table:</strong> ${savedBooking.tableNumber} (${savedBooking.floor})</p>
      </div>

      <p style="font-size: 12px; color: #666;">Changed your mind? You can cancel your reservation by clicking the button below:</p>
      
      <a href="http://localhost:5173/cancel-reservation/${savedBooking._id}" 
         style="background-color: #ef4444; color: white; padding: 10px 20px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
         Cancel Reservation
      </a>
    </div>
  `
};
    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};