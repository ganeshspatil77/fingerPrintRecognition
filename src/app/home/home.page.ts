import { Component, OnInit } from '@angular/core';
import { BiometryType, NativeBiometric } from "capacitor-native-biometric";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  userName:string = 'Ganesh';
  pass:string = '12345678'
  constructor() { }

  async ngOnInit() {
    await this.setCrediantials();
    await this.performBiometricVerificatin();
  }

  setCrediantials = async () => {
    await NativeBiometric.setCredentials({
      username:this.userName,
      password:this.pass,
      server: "www.example.com",
    });
  }

  async performBiometricVerificatin() {
    const result = await NativeBiometric.isAvailable();

    if (!result.isAvailable) return;

    const isFaceID = result.biometryType == BiometryType.FACE_ID;

    console.log('isFaceID',isFaceID);
    

    const verified = await NativeBiometric.verifyIdentity({
      reason: "For easy log in",
      title: "Log in",
      subtitle: "Maybe add subtitle here?",
      description: "Maybe a description too?",
    }).then(() =>
      console.log('success')
    ).catch(() => false);
    console.log('verified', verified)
    if (!verified) return;

    const credentials = await NativeBiometric.getCredentials({
      server: "www.example.com",
    });

    console.log('credentials',credentials)


  

    // NativeBiometric.deleteCredentials({
    //   server: "www.example.com",
    // }).then();
  }



}
