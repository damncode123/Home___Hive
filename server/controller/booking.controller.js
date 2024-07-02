// import { Booking } from "../model/Booking.model.js";
import { User } from "../model/user.model.js";
import nodemailer from 'nodemailer';
// mail vala kaam hua hai yaha.
const CreateBooking = async (req, res) => {
  try {
    const { customerId, Owner_email } = req.body;
    console.log(customerId, Owner_email);

    // Find the user related to the customer ID
    const user = await User.findOne({ _id: customerId });
    const owner = await User.findOne({ email: Owner_email });
    console.log(owner.firstName, owner.lastName);

    if (!user) {
      return res.status(404).json({ message: 'No user found for the customer ID' });
    }

    const user_email = user.email;
    const user_name = user.firstName;
    console.log(user_email);

    if (user_email === Owner_email) {
      return res.status(404).json({ message: 'Sorry you cannot do this' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.USER_EMAIL, //sender email homehive@gmail.com
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Perform any additional actions with the user or email
    let mailOptions = {
      from: process.env.USER_EMAIL,
      to: Owner_email,
      subject: "Regarding the Property Rental",
      text: `Dear ${owner.firstName} ${owner.lastName},

      I trust this message finds you well. I am reaching out to introduce an individual of interest, ${user_name} ${user.lastName}, who is eager to explore the possibility of becoming a tenant for your esteemed property.
      
      ${user_name} ${user.lastName} brings with them a genuine enthusiasm and interest in your property, and I believe they would make an excellent tenant. Additionally, I wanted to provide their contact information for your convenience:
      
      Email: ${user_email}
      
      Should you require any further details or wish to discuss this opportunity further, please do not hesitate to contact ${user_name} ${user.lastName} or us.
      
      Thank you for considering this inquiry.
      
      Warm regards,
      
      Homehive_support_team`
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent successfully");
        res.status(200).json(user);
      }
    });

  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Export the CreateBooking function to make it accessible from other modules.
export { CreateBooking };
