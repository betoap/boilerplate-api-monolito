import Fs from 'fs';

import Nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import { Service } from './service';
// import
const mailCredenciais: object  = require('./../../config/.mail');

export class SendMailService extends Service {
    private mailer;
    private options: object;

    public title: string;
    public templatePath: string;
    public template: string;
    public data: Object;
    public from: string;
    public to: Array<string>  = [];
    public cc: Array<string>  = [];
    public bcc: Array<string> = [];
    public attachment: Array<object> = [];

    constructor (from: string, to: string, title: string, templatePath: string, data: Object ) {
        super();
        this.from = from;
        this.to.push(to);
        this.title = title;
        this.templatePath = `./dist/modules/${templatePath}`;
        this.data = data;
        this.mailer = Nodemailer.createTransport( mailCredenciais );
    }

    public AddTo( email: string, name?: string ) {
        this.to.push( `"${name}" <${email}>` );
    }

    public AddCc( email: string, name?: string ) {
        this.cc.push( `"${name}" <${email}>` );
    }

    public AddBcc( email: string, name?: string ) {
        this.bcc.push( `"${name}" <${email}>` );
    }

    public addAttachment(filename: string, path: string) {
        this.attachment.push({filename, path});
    }

    private loadTemplate () {
        const source = Fs.readFileSync(this.templatePath, {'encoding': 'utf8'});
        const template = Handlebars.compile( source );
        return template( this.data );
    }

    public async enviar() {
        this.template = await this.loadTemplate ();
        return this.mailer.sendMail(
            this.options = {
                from: this.from,
                to: this.to,
                cc: this.cc,
                bcc: this.bcc,
                subject: this.title,
                text: 'Versão texto',
                html: this.template,
                attachments: this.attachment
            }
        );
    }
}

// new SendMail(
//     'betoap.developer@gmail.com',
//     'betoap@msn.com',
//     'Email from teste',
//     'user/mail/add.hbs',
//     { variable1 : 'value1', variable2 : 'value2' }
// )
//     .enviar()
//     .then( ( resposta ) => {
//         if ( resposta )
//             console.log( 'Sucesso:', resposta );
//     })
//     .catch( erro => console.log( 'ERRO: ', erro ) )
// ;
