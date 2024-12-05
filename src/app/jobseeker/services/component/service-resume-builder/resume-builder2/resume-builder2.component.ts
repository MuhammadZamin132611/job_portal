import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DashboardJobsService } from 'src/app/jobseeker/dashboard/services/dashboard-jobs.service';
import { ProfileBasicDetailsService } from 'src/app/jobseeker/dashboard/components/jobseeker-profile/Services/profile-basic-details.service';
import { ProfileLanguageService } from 'src/app/jobseeker/dashboard/services/profile-language.service';
import { ProfileEducationService } from 'src/app/jobseeker/dashboard/components/jobseeker-profile/Services/profile-education.service';
import { JobExperienceService } from 'src/app/jobseeker/dashboard/components/jobseeker-profile/Services/job-experience.service';
import { CertificateService } from 'src/app/jobseeker/dashboard/components/jobseeker-profile/Services/certificate.service';
import { EditProjectService } from 'src/app/jobseeker/dashboard/components/jobseeker-profile/components/profile-project/services/edit-project.service';
import { AddAchievementService } from 'src/app/jobseeker/dashboard/components/jobseeker-profile/components/profile-achievements/services/add-achievement.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-resume-builder2',
  templateUrl: './resume-builder2.component.html',
  styleUrls: ['./resume-builder2.component.css']
})
export class ResumeBuilder2Component implements OnInit {
  letter: string | null;
  imageUri: string | null;
  IsShow: boolean;
  imagePath: any;
  sbucketName = "https://job-check.s3.ap-south-1.amazonaws.com/";


  constructor(
    private location: Location,
    private basicDetails: ProfileBasicDetailsService,
    private skill: DashboardJobsService,
    private profileLanguageService: ProfileLanguageService,
    private profileEducationService: ProfileEducationService,
    private jobExperienceService: JobExperienceService,
    private certificate: CertificateService,
    private editProjectService: EditProjectService,
    private achiee: AddAchievementService) {
    this.letter = localStorage.getItem('letter')
    // console.log(this.letter,'letter   ghnjhymgh');
    this.imageUri = localStorage.getItem('imageUri')
    // console.log(this.imageUri,'letter   ghnjhymgh');
    this.IsShow = this.imageUri ? true : false;
    // console.log(this.IsShow,'IsShow   ghnjhymgh');
    this.imagePath = this.sbucketName + this.imageUri
    // console.log("path",this.imagePath)
    this.storeImgPath = this.imagePath
  }
  storeImgPath: string = '';

  goBack(): void {
    this.location.back();
  }
  profileId: any

  // @ViewChild('resumeDesign', { static: false }) resumeDesign!: ElementRef;
  // downloadResume(): void {
  //   const doc = new jsPDF();
  //   const resumeDesign = this.resumeDesign.nativeElement;

  //   html2canvas(resumeDesign).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');
  //     console.log("check imgData", imgData)
  //     doc.addImage(imgData, 'PNG', 10, 10, doc.internal.pageSize.getWidth() - 20, doc.internal.pageSize.getHeight() - 20);
  //     doc.save('resume.pdf');
  //   });
  // }




  downloadAsPDF() {
    const htmlCode = `<html>

    <body>
        <main class="px-5 w-60">
            <div class="text-black font-bold" style="font-size:6px;">${this.basicDetailsgetdata.name}</div>
            <div class="w-full flex">
                <div class="w-2/3 py-1">
                    <div class="bg-blue-400 h-px w-full"></div>
                </div>
                <div class="w-12 bg-blue-400">
                    <div class="text-white p-px whitespace-nowrap" style="font-size:3px;">ADMINISTRATIVE ASSISTANT</div>
                </div>
            </div>
            <div class="w-full flex gap-2">
                <div class="w-12 text-end">
                    <div>
                        <h3 class="text-black font-bold" style="font-size:4px;">Contact</h3>
                        <div class="bg-blue-400 mt-1 h-px w-full"></div>
                        <p class="text-gray-900" style="font-size:3px;">${this.basicDetailsgetdata.phoneNumber}</p>
                        <p class="text-gray-900" style="font-size:3px;">${this.basicDetailsgetdata.email}</p>
                        <p class="text-gray-900" style="font-size:3px;">${this.basicDetailsgetdata.city}</p>
                    </div>
                    <div class="pt-px">
                        <h3 class="text-black font-bold" style="font-size:4px;">Education</h3>
                        <div class="bg-blue-400 mt-1 h-px w-full"></div>
                        ${this.getEducationDetails.map((detail: any) =>
      `<p class="font-semibold text-gray-900" style="font-size:3px;">${detail.endDate}</p>
                        <p class="font-semibold text-gray-900" style="font-size:3px;">${detail.qualification}</p>
                        <p class="text-gray-900" style="font-size:3px;">${detail.collegeName}</p>`).join('')}
                    </div>
                    <div class="pt-px">
                        <h3 class="text-black font-bold" style="font-size:4px;">Key Skills</h3>
                        <div class="bg-blue-400 mt-1 h-px w-full"></div>
                        <ul class="">
                        ${this.skillgetData.map((detail: any) =>
        `<li class="text-gray-900" style="font-size:3px;">${detail.skillName}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="pt-px">
                        <h3 class="text-black font-bold" style="font-size:4px;">Awards</h3>
                        <div class="bg-blue-400 mt-1 h-px w-full"></div>
                        <p class="text-gray-900" style="font-size:3px;">(May 2018)</p>
                        <p class="text-gray-900" style="font-size:3px;">AWARD TITLE / Brand</p>
                    </div>
                </div>
                <div class="w-32">
                    <div>
                        <h3 class="text-black" style="font-size:5px;">Profile</h3>
                        <div class="bg-blue-400 mt-1 h-px w-full"></div>
                        <p class="text-gray-900" style="font-size:3.5px;">
                        ${this.persionaleBio.personalDescription}
                        </p>
                    </div>
                    <div>
                        <h3 class="text-black font-bold" style="font-size:4.5px;">Professional Experience</h3>
                        <div class="bg-blue-400 mt-1 h-px w-full"></div>
                        <div class="mb-5">
                            ${this.getallWorkExperience.map((detail: any) =>
          `<div>
                            <div class="flex justify-between">
                                    <div>
                                        <p class="font-bold text-gray-900" style="font-size:3px;">${detail.jobTitle}
                                        </p>
                                        <p class="text-gray-900" style="font-size:3px;">${detail.companyName}</p>
                                    </div>
                                    <div>
                                        <p class="text-gray-900 font-bold" style="font-size:3px;">${detail.startDate}</p>
                                        <p class="text-gray-900 font-bold" style="font-size:3px;">– ${detail.endDate}</p>
                                    </div>
                                </div>
                                <ul class="px-1 list-disc">
                                    <li class="text-gray-900" style="font-size:3px;">
                                    ${detail.description}
                                    </li>
                                    <li class="text-gray-900" style="font-size:3px;">
                                        Trained 2 administrative assistants during a period of company expansion to
                                        ensure attention to detail and adherence to company
                                    </li>
                                    <li class="text-gray-900" style="font-size:3px;">
                                    ${detail.currentSalary}
                                    <span class="font-medium">${detail.salaryType}</span>
                                    </li>
                                    <li class="text-gray-900" style="font-size:3px;">
                                    ${detail.location}
                                    </li>
                                    <li class="text-gray-900" style="font-size:3px;">
                                        Manage travel and expense reports for department team members
                                    </li>
                                </ul>
                            </div>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </body>
    
    </html>`; // Replace with your HTML code

    // this.print(htmlCode)
    const doc = new jsPDF();
    doc.html(htmlCode, {
      callback: function (doc) {
        doc.save('downloaded.pdf'); // Provide a desired filename for the downloaded PDF
      }
    });
  }
  
  ngOnInit(): void {
    this.allGetFunction()
  }

  allGetFunction = () => {
    this.profileId = localStorage.getItem('profileID');
    console.log(this.profileId, "its profile id");
    this.basicDetailsGet();
    this.getSkills();
    this.getAllLanguages();
    this.getperbio();
    this.geteducation();
    this.getWorkExperience();
    this.getCertificate();
    this.getAllProjectsDetails();
    this.getachievement();

  }

  basicDetailsgetdata: any;

  basicDetailsGet = () => {
    this.basicDetails.apiJcProfile1(this.profileId).subscribe({
      next: (data) => {
        this.basicDetailsgetdata = data
      }, error: (error: any) => {
        console.log(error, "No Basic details found")
      }
    })
  }


  skillgetData: any[] = [];
  getSkills() {
    this.skill.Selectedskills(this.profileId).subscribe({
      next: (data) => {
        this.skillgetData = data
        this.transferSkill()
        console.log(this.skillgetData, "Skill data")
      }, error: (error: any) => {
        console.log(error, "No skill found")
      }
    })
  }

  skillArray: any[] = []

  transferSkill = () => {
    console.log(this.skillgetData.length)
    this.skillgetData.forEach((data) => {
      this.skillArray.push(data.skillName)
    })
    console.log('transfer data ', this.skillArray)

  }

  storeLanguages: any[] = []
  languageArray: any[] = []
  getAllLanguages() {
    this.profileLanguageService.getLanguages(this.profileId).subscribe((data) => {
      this.storeLanguages = data;
      this.storeLanguages.forEach((res) => {
        this.languageArray.push(res.languageName)
      })
      console.log(data, "------------------>language data ")
    })
  }


  persionaleBio: any
  getperbio() {
    this.basicDetails.summary(this.profileId).subscribe((res: any) => {
      this.persionaleBio = res;
      console.log('====getdata', res);

    });
  }



  getEducationDetails: any[] = [];
  geteducation() {
    this.profileEducationService.getEducation(this.profileId).subscribe((data: any) => {
      this.getEducationDetails = data
      this.getEducationDetails.forEach((res) => {

      })
      console.log(this.getEducationDetails, 'education details')
    })
  }

  getallWorkExperience: any
  getWorkExperience() {
    this.jobExperienceService.getWorkExperience(this.profileId).subscribe((data: any) => {
      this.getallWorkExperience = data;
      console.log(this.getallWorkExperience, 'Work Experience');

    });
  }

  getAllcertificates: any
  getCertificate() {
    this.certificate.getCertificate(this.profileId).subscribe((res) => {
      this.getAllcertificates = res
      console.log("get Data allcertificates:", res)
    })
  }

  projectsDetails: any = [];
  getAllProjectsDetails() {
    this.editProjectService.getProjectDetails(this.profileId).subscribe((data) => {
      this.projectsDetails = data;
      console.log(data, "------------------>data get ")
      // console.log(this.projectsDetails.value, "------------------>projects details ")
    })
  }


  data: any[] = [];
  Allachievement: any = [];
  getachievement() {
    this.achiee.getAchievement(this.profileId).subscribe((data: any) => {
      this.Allachievement = data
      console.log("all achivement .....", this.Allachievement);
    })
  }
}
