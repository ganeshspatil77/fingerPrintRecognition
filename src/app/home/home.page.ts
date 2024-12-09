import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BiometryType, NativeBiometric } from "capacitor-native-biometric";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  userName:string = 'Ganesh';
  pass:string = '12345678'
  constructor(private router:Router) { }

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

    const verified = await NativeBiometric.verifyIdentity({
      reason: "For easy log in",
      title: "Log in",
      subtitle: "Fingerprint Authentication",
    }).then(() =>true).catch(() => false);
    console.log('verified', verified)
    if (!verified){
      this.performBiometricVerificatin();
    };

    if (verified){
      this.router.navigateByUrl('/landing');
    }

    const credentials = await NativeBiometric.getCredentials({
      server: "www.example.com",
    });

    console.log('credentials',credentials)


  

    // NativeBiometric.deleteCredentials({
    //   server: "www.example.com",
    // }).then();
  }



}
