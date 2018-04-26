import { ConsultacepProvider } from './../../providers/consultacep/consultacep';
import { Component, ErrorHandler } from '@angular/core';
import { IonicPage, NavController, NavParams, IonicErrorHandler } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AlertController } from 'ionic-angular';



/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
  providers:[
    ConsultacepProvider
  ]
})
export class CadastroPage {
  public enderecos;
  public mensagem:String;
  public cep;
  public teste;
  public objcep ={
    cep:""
  }

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public ConsultacepProvider: ConsultacepProvider) {
  }
  
  doVoltaLogin(){
    this.navCtrl.push(LoginPage);
    this.mensagem ="Cancelado com Sucesso!"
    this.presentToast(this.mensagem);
    console.log(this.mensagem);
  }

  doConfirmar(){
    this.navCtrl.push(TabsPage);
  }
  presentToast(mensagem) {
    let toast = this.toastCtrl.create({
      message : mensagem,
      duration: 2000
    });
    toast.present();
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: "Realmente Deseja se Cadastar?",
      subTitle:"Aproveite tudo o que nossa plataforma pode oferecer."
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.teste = data;
        this.doConfirmar();
        this.presentToast("Login Criado com Sucesso!");
      }
    });
    alert.present();
    this.mensagem="";
  }

  buscarCep(cadastroCom){
    console.log(cadastroCom);
    this.preencherCamposEnd();
  }

  preencherCamposEnd(){
    this.ConsultacepProvider.getBuscaCep(this.objcep.cep).subscribe(
      data=>{
        this.enderecos = data;
        console.log(this.enderecos);
      },error=>{
        console.log(error);
      }
    )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

}