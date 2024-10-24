import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
// import * as path from 'path';
export class mailerConfig implements MailerAsyncOptions {
  useFactory = () => ({
    transport: {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SSL === 'true', // SSL 사용 여부
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    },
    defaults: {
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
    },
    // template: {
    //   dir: path.join(__dirname, '../templates'),
    //   adapter: new HandlebarsAdapter(),
    //   options: {
    //     strict: false,
    //   },
    // },
  });
}
