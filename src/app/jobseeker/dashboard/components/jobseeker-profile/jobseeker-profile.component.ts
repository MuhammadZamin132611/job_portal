import { Component, OnInit, ViewChild } from '@angular/core';
import { ExampleService } from '../../services/example.service';
// import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { LoginEmailService } from 'src/app/jobseeker/authentication/services/login-email.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ProfileBasicDetailsService } from './Services/profile-basic-details.service';
import { NgOtpInputModule } from 'ng-otp-input';
import { Location } from '@angular/common';
import { HomeService } from '../../services/home.service';
import { PhoneFormatPipe } from 'src/app/jobseeker/shared/Pipes/phone-format.pipe';
import { fromEvent, Observable, Subscription, catchError } from 'rxjs';

// import { CameraOptions } from '@ionic-native/camera';


@Component({
  selector: 'app-jobseeker-profile',
  templateUrl: './jobseeker-profile.component.html',
  styleUrls: ['./jobseeker-profile.component.css']
})
export class JobseekerProfileComponent implements OnInit {
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];
  connectionStatusMessage: string;
  connectionStatus: string;
  status: string;
  buttonName: any;
  show1: boolean = false;
  tick: boolean = false;
  existUser: string = '';
  backButtonListener: any;

  current: any;
  max: number = 100;
  stroke: number = 15;
  radius: number = 125;
  semicircle: boolean = true;
  rounded: boolean = false;
  responsive: boolean = false;
  clockwise: boolean = true;
  color: string = '#00A2E0';
  background: string = '#ffffff';            //'#eaeaea';
  duration: number = 800;
  animation: string = 'easeOutCubic';
  animationDelay: number = 0;
  animations: Array<string> = [
    'linearEase',
    'easeInQuad',
    'easeOutQuad',
    'easeInOutQuad',
    'easeInCubic',
    'easeOutCubic',
    'easeInOutCubic',
    'easeInQuart',
    'easeOutQuart',
    'easeInOutQuart',
    'easeInQuint',
    'easeOutQuint',
    'easeInOutQuint',
    'easeInSine',
    'easeOutSine',
    'easeInOutSine',
    'easeInExpo',
    'easeOutExpo',
    'easeInOutExpo',
    'easeInCirc',
    'easeOutCirc',
    'easeInOutCirc',
    'easeInElastic',
    'easeOutElastic',
    'easeInOutElastic',
    'easeInBack',
    'easeOutBack',
    'easeInOutBack',
    'easeInBounce',
    'easeOutBounce',
    'easeInOutBounce',
  ];
  gradient: boolean = true;
  showContent1: boolean = false;
  videoElement: any;
  camera: any;
  CameraOptions: any;
  show: boolean;
  gmail: any;
  sms: any;
  //////////////////////////image types///////////////
  isPopupVisibleImage = false;
  isPopupOfflineStatus = false;
  imageUri: any;
  /////////////////////////email verify data types///////////////////////
  notAuthenticated: boolean = true;
  blueTick: boolean = false
  PhoneNumberverify: boolean = true;
  EmailVerify: boolean = true;
  svgClickedEmail: boolean = false;
  svgClickedPhone: boolean = false;
  private errorMessage_ = new BehaviorSubject('');
  public errorMessage = this.errorMessage_.asObservable();
  private busy_ = new BehaviorSubject(false);
  public busy = this.busy_.asObservable();
  //////////////////////////////////////////otp ng config
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '56px',
      'height': '40px',
      // 'border':'2px solid #D0D5DD',
      'border-radius': '8px',
      'outline': 'none'
    },
    inputClass: 'each_input',
  };


  /////////////////////////////////////////////////////////////////
  Everify: boolean = false;

  constructor(private exampleService: ExampleService, private auth: LoginEmailService, private router: Router, private location: Location, private home: HomeService) {
    this.gettinglogindata();

  }

  goBack(): void {
    this.location.back();
  }


  gettinglogindata() {
    this.gmail = localStorage.getItem('Email') || localStorage.getItem('fedemail');
    this.sms = localStorage.getItem('sms');
    try {
      if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.gmail)) {
        this.EmailVerify = false;
        // console.log('coming is phone number')
      }
      else if (/^\+91\d{10}$/.test(this.sms)) {
        this.PhoneNumberverify = false;
        // console.log('coming email number')

      }

    }
    catch (err: any) {
      this.EmailVerify = false;
      this.PhoneNumberverify = false;
    }
  }
  ngOnInit(): void {
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'connected';

      this.connectionStatus = 'online';

      setTimeout(() => {

        this.connectionStatusMessage = '';

        this.connectionStatus = '';

      }, 2000);
    }));

    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      this.connectionStatusMessage = 'No internet connection! ';
      this.connectionStatus = 'offline';

      // console.log('Offline...');
    }));


    this.gettingData1();
    this.getBasicDetail();
    this.imageUri = localStorage.getItem("finalName" || '{}');
    this.getImage();

    this.uploadImage();
  }



  msg: any;
  selectedFiles: any;
  url: any;
  selectFile(event: any) {
    this.show = true;
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Please upload in .jpg , .jpeg or .png format";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    this.selectedFiles = event.target.files;;
    this.uploadImage();
    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;
    }
  }


  toggleUploadeImage() {
    this.isPopupVisibleImage = !this.isPopupVisibleImage
  }
  toggleOfflineStatus() {
    this.isPopupOfflineStatus = !this.isPopupOfflineStatus
  }
  toggleDiversity() {
    this.showContent1 = !this.showContent1;
    // console.log(this.showContent1)
  }
  showContent: boolean = false
  showContent2: boolean = false
  toggleDiversity1() {
    this.showContent = !this.showContent;
    // console.log(this.showContent);
    this.postdiver();
  }
  toggleDiversity2() {
    this.showContent2 = !this.showContent2;
    // console.log(this.showContent2);
    this.postdiver();
  }

  verified: any;
  letter: any;
  basicDetail: any = '';
  name: any = '';
  phnNumber:any;
  Profilename: any = '';

  getBasicDetail() {
    let ID = localStorage.getItem('profileID');

    this.exampleService.apiJcProfile5(ID).subscribe((resp: any) => {
      this.basicDetail = resp;
      // console.log("===============",this.basicDetail.name)
      this.letter = this.basicDetail.name.substr(0, 1).toUpperCase();
      this.verified = this.basicDetail.verifiedAccount;
      // console.log("Verified done",this.verified)

      this.exampleService.apiJcProfile(ID).subscribe((resp: any) => {
        this.basicDetail = resp;
        this.name = this.basicDetail.name; // Assign the 'name' property from 'basicDetail' to 'name'
        this.phnNumber = this.basicDetail.phoneNumber;
        localStorage.setItem('username', this.name);
        this.Profilename = localStorage.getItem('username'); // Assign Profilename here
        console.log("con", this.Profilename);
        console.log("NNNNNNNNNNNNn", this.name);
        console.log(resp, "Basic Details");
        console.log("Basic Name", this.basicDetail.name);
        console.log("Basic email", this.basicDetail.email);

        // >>>>>>> b33ae02636b7d9dd340b44cce3f60640e9c17644
        if (this.verified == 'TRUE') {
          this.blueTick = true;
          this.notAuthenticated = false;
        }
        else {
          this.blueTick = false;
          this.notAuthenticated = true;
        }
        if (this.basicDetail.openToWork) {
          this.isOpen = true;
          this.notOpen = false;
        }
        else {
          this.isOpen = false;
          this.notOpen = true;
        }
      })
    })
  }
//  startCamera() {
//   navigator.mediaDevices.getUserMedia({ video: true })
//     .then(stream => {
//       this.videoElement.nativeElement.srcObject = stream;
//     })
//     .catch(error => {
//       console.error('Error opening camera', error);
//     });
// }
jobseekerprofile: any
id: any
currentFileUpload: any;
    // selectedFiles: any;
    uploadImage() {
      this.jobseekerprofile = localStorage.getItem("profileID");
      this.id = this.jobseekerprofile;
      this.currentFileUpload = this.selectedFiles.item(0);
      // console.log("this.currentFileUpload", this.currentFileUpload)
      this.exampleService.pushImage(this.currentFileUpload, this.id).subscribe((event: any) => {
        // console.log(event, "uploadimage");
        this.selectedFiles = undefined;


        // if (event.type == 4) {
        //   this.imageName = JSON.stringify(event.body).replace("File uploaded : ", "");
        //   this.imageUri = "https://job-check.s3.ap-south-1.amazonaws.com/" + JSON.parse(this.imageName.value);
        //   localStorage.setItem('imageUri', JSON.stringify(this.imageUri));
        //   this.imageStatus = true;
        // }
        this.getImage()
      });
      // console.log(this.currentFileUpload ,"current file");
    }
    Data: any
    sbucketName: any
    imageName: any
    hideImage: any
    hideName: any
    Imagedata: any
    IsShow = true;
    getImage() {
      let ID = localStorage.getItem('profileID');

      this.exampleService.getImage(ID).subscribe((resp: any) => {
        // console.log("================IIIIIIIIIIIIIIIIIII===========", resp)
        this.Data = resp;
        // console.log("sdbhbjhsdjfkh", this.Data , "type",typeof(this.Data) , "value" , typeof(this.Data.value))
        this.sbucketName = "https://job-check.s3.ap-south-1.amazonaws.com/";
        this.imageName = JSON.parse(this.Data);
        // console.log(this.Data);
        if (this.Data.value === null) {
          this.IsShow = true;
          // console.log("blank")
          // this.imageUri = this.basicDetail.name.substr(0, 1).toUpperCase();
          this.exampleService.apiJcProfile(ID).subscribe((resp: any) => {
            this.basicDetail = resp;
            // console.log("===============",this.basicDetail.name)
          }
          )
        }

        // if(JSON.stringify(this.imageUri) == '{}') {
        //   this.hideImage = 'hidden';
        //   this.hideName = '';
        //   this.letter = this.basicDetail.name.substr(0, 1).toUpperCase();
        //   localStorage.setItem("nameFirstLetter", this.letter);
        // }

        // console.log("jjjjjjjj", this.imageName)
        // console.log("hello",this.imageName.value , typeof(this.imageName.value))
        // console.log("final name", this.sbucketName + this.imageName.value)
        localStorage.setItem("finalName", this.sbucketName + this.imageName.value)
        this.Imagedata = this.sbucketName + this.imageName.value
        this.imageUri = this.sbucketName + this.imageName.value;
        // console.log(this.imageUri)
        if (typeof this.imageName.value != 'string') {
          // console.log('not string')

          this.IsShow = true
        } else {
          this.IsShow = false
          localStorage.setItem('imageUri', this.imageName.value);
        }

      },
        (err: any) => {
          // console.log(err)
        })
    }

    deleteImageData(){

      let getImage = localStorage.getItem("profileID");
      this.IsShow = true;
      this.exampleService.deleteImage(getImage).subscribe((resp: any) => {
        localStorage.removeItem('imageUri');
        this.getImage();
        // console.log("resp" , resp)
      });
    }
    // imageUrl: string;
    // async takePicture() {
    // const image = await Camera.getPhoto({
    // quality: 90,
    // allowEditing: false,
    // resultType: CameraResultType.Base64,
    //  source: CameraSource.Camera
    //  });
    // console.log("imageee",image)
    // const imageUrl = `data:image/jpeg;base64,${image.base64String}`;
    // this.imageUrl = imageUrl;
    // this.imageUri = imageUrl
    // console.log("imageee22",imageUrl)
    // this.IsShow=false;
    // // Do something with the image URL, like displaying it in an image element
    //  }
    Data1: any;
    gettingData1() {
      this.exampleService.apiJcProfile1().subscribe((resp: any) => {
        //  console.log(resp,"sdfghjkdfgh")
        this.Data1 = resp

      })
    }

    answer1: string;
    isInputValid: boolean;
    onOtpChange(otp: any) {
      this.answer1 = otp;
      if (this.answer1.length == 4) {
        this.isInputValid = true;
        this.submit();
      }
      else {
        this.isInputValid = false;
      }
    }
   //add routing    processing
   public async submit() {
    try {
      this.busy_.next(true);
      const OtpVarification = await this.auth.answerCustomChallenge(this.answer1);
      // console.log(this.answer1.length);
      // console.log(OtpVarification);
      if (OtpVarification) {
        this.router.navigate(['/dashboard/profile']);
        this.onSvgClickEmail();
        // this.svgClickedEmail=true;
        this.onSvgClickPhone();
        this.blueTick = true;
        this.notAuthenticated = false;
      } else {
        this.errorMessage_.next('Incorrect OTP. Please enter correct OTP');
        setTimeout(() => {
          this.errorMessage_.next('')
        }, 3000);
      }
    } catch (err: any) {
      this.errorMessage_.next('Please enter OTP');
      setTimeout(() => {
        this.errorMessage_.next('')
      }, 3000);
    } finally {
      this.busy_.next(false);
    }
  }
  resendtime: boolean = false;
  display: any;
  timer: any;

  starttimer(minute: number) {

    let seconds: number = minute * 30;
    let textSec: any = "0";
    let statSec: number = 30;

    const prefix = minute < 10 ? "0" : "";

    this.timer = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 29;

      if (statSec < 10) {
        textSec = "0" + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 30)}:${textSec}`;

      if (seconds == 0) {
        // console.log("finished");
        clearInterval(this.timer);
        this.resendtimef();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }
  onSvgClickEmail() {
    this.svgClickedEmail = false;
    this.resendtime = false;
    this.stopTimer();
  }
  onSvgClickPhone() {
    this.svgClickedPhone = false;
    this.resendtime = false;
    this.stopTimer();
  }

  resendtimef() {
    this.resendtime = true;
  }


  public async signInEmail() {
    this.starttimer(1);
    this.resendtime = false;
    this.svgClickedEmail = true;
    this.busy_.next(true);
    try {
      await this.auth.signInEmail(this.basicDetail.email);
      this.getVerified();
    } catch (err: any) {
      this.auth.signUpEmail(this.basicDetail.email);
    }
    finally {
      this.busy_.next(false);

    }
  }


  public async signInPhone() {
    this.starttimer(1);
    this.resendtime = false;
    this.svgClickedPhone = true;
    this.busy_.next(true);
    try {
      await this.auth.signInEmail(this.basicDetail.phoneNumber);
      this.getVerified();
    } catch (err: any) {
      this.auth.signUpEmail(this.basicDetail.phoneNumber);
    }
    finally {
      this.busy_.next(false);
    }
  }

  isOpen = true;
  notOpen = false;
  OfficeOpen = () => {
    this.isOpen = true;
    this.notOpen = false;
    // console.log(this.isOpen)
    this.openToWork()
  }

  OfficeClose = () => {
    this.isOpen = false
    this.notOpen = true;
    // console.log( this.isOpen)
    this.openToWork()
  }
  getVerified() {
    let ID = localStorage.getItem('profileID');
    this.exampleService.verification(ID, this.isOpen).subscribe((data: any) => {
      // console.log("Vaish++++++++", data)
      // console.log("It is doneee")
    })
  }

  jobData: any;
  openToWork() {
    let ID = localStorage.getItem('profileID');
    this.exampleService.openToWork(ID, this.isOpen).subscribe((data: any) => {
      // console.log("Shoaib+++++++++", data)
    })
  }

  postdiver() {
    let ID = localStorage.getItem('profileID');
    this.home.postDiver(ID, this.showContent, this.showContent2).subscribe((data: any) => {
      // console.log(data)
    })
  }
}

