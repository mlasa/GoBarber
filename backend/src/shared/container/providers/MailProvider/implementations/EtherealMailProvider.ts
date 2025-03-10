import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

@injectable()
class EtherealMailProvider implements IMailProvider {
	private client: Transporter;

	constructor(
		@inject('MailTemplateProvider')
		private mailTemplateProvider: IMailTemplateProvider,
	) {
		nodemailer.createTestAccount().then(account => {
			const transporter = nodemailer.createTransport({
				host: account.smtp.host,
				port: account.smtp.port,
				secure: account.smtp.secure,
				auth: {
					user: account.user,
					pass: account.pass,
				},
			});

			console.log(account);
			this.client = transporter;
		});
	}

	public async sendMail({
		from,
		to,
		subject,
		templateData,
	}: ISendMailDTO): Promise<void> {
		const message = await this.client.sendMail({
			from: {
				name: from?.name || 'Time de Suporte GoBarber',
				address: from?.email || 'team@gobarber.com.br',
			},
			to: {
				name: to.name,
				address: to.email,
			},
			subject,
			text: await this.mailTemplateProvider.parse(templateData),
		});
		console.log('Message sent: %s', message.messageId);
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
	}
}
export default EtherealMailProvider;
