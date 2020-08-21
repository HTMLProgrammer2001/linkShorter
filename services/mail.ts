import {Transporter} from 'nodemailer';
import * as mailer from 'nodemailer';


class Mail{
	private transporter: Transporter;

	async connect(){
		let account = await mailer.createTestAccount();

		this.transporter = mailer.createTransport({
			host: "smtp.ethereal.email",
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: account.user, // generated ethereal user
				pass: account.pass, // generated ethereal password
			}
		});
	}

	async send(config){
		let info = await this.transporter.sendMail({
			from: "LinkShorter@gmail.com", // sender address
			...config
		});

		console.log("Message sent: %s", info.messageId);

		// Preview only available when sending through an Ethereal account
		console.log("Preview URL: %s", mailer.getTestMessageUrl(info));
	}
}

const mail = new Mail();
mail.connect();

export default mail;
