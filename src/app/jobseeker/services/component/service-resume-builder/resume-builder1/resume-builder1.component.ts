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
  selector: 'app-resume-builder1',
  templateUrl: './resume-builder1.component.html',
  styleUrls: ['./resume-builder1.component.css']
})
export class ResumeBuilder1Component implements OnInit {
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



  // print resume start
  print() {
    window.print();
  }
  // print resume end



  downloadAsPDF() {
    const htmlCode = `<html>

    <body>
        <div class="grid grid-cols-2 gap-2 p-2 w-56">
            <div class="bg-[#5868A5] px-2">
                <p class="text-white md:text-lg font-medium uppercase" style="font-size:7px;">${this.basicDetailsgetdata.name}</p>
                <p class="text-white md:text-xs pb-2" style="font-size:5px;">Administrative Assistant</p>
            </div>
            <div class="flex gap-1 place-content-end">
                <div class="text-end">
                    <p class="text-[#010101] text-[0.5rem] font-medium" style="font-size:4px;">${this.basicDetailsgetdata.phoneNumber}<span
                            class="bg-[#010101] absolute mt-1.5 h-0.5 w-0.5 rounded-full"></span></p>
                    <p class="text-[#010101] text-[0.5rem] font-medium" style="font-size:4px;">${this.basicDetailsgetdata.email}
                    <span class="bg-[#010101] absolute mt-1.5 h-0.5 w-0.5 rounded-full"></span></p>
                    <p class="text-[#010101] text-[0.5rem] font-medium" style="font-size:4px;">${this.basicDetailsgetdata.city}
                        <span class="bg-[#010101] absolute mt-1.5 h-0.5 w-0.5 rounded-full"></span>
                    </p>
                </div>
                <div class="bg-[#5868A5] w-2 mr-3"></div>
            </div>
        </div>
        <div class="px-2">
            <div class="flex gap-1 w-56">
                <h3 class="uppercase text-[#5868A5] font-medium" style="font-size:4px;">OBJECTIVE</h3>
                <div class="mt-1.5 w-40 border-t border-dotted border-gray-500"></div>
    
            </div>
            <p class="w-48 font-normal" style="font-size:4px;">${this.persionaleBio.personalDescription}
            </p>
        </div>
    
        <div class="px-2 pt-1">
            <div class="flex gap-2 w-56">
                <h3 class="uppercase text-[#5868A5] whitespace-nowrap font-medium" style="font-size:4px;">PROFESSIONAL
                    EXPERIENCE
                </h3>
                <div class="mt-2 w-24 border-t border-dotted border-gray-500"></div>
            </div>
            ${this.getallWorkExperience.map((detail: any) =>
      `<div class="w-48">
                <p class="font-medium" style="font-size:4px;">${detail.companyName}</p>
                <p class="font-normal" style="font-size:4px;">${detail.jobTitle}, ${detail.startDate} -
                ${detail.endDate}</p>
                <ul class="px-1 list-disc">
                    <li class="font-normal text-[#010101]" style="font-size:4px;">${detail.description}</li>
                    <li class="font-normal text-[#010101]" style="font-size:4px;">Trained 2 administrative assistants during a
                        period of company expansion to ensure attention to detail and adherence
                        to company policy</li>
                    <li class="font-normal text-[#010101]" style="font-size:4px;">${detail.currentSalary}
                    <span class="font-medium">${detail.salaryType}</span></li>
                    <li class="font-normal text-[#010101]" style="font-size:4px;">Maintain utmost discretion when dealing with
                        sensitive topics</li>
                    <li class="font-normal text-[#010101]" style="font-size:4px;">Manage travel and expense reports for
                        department
                        team members</li>
                </ul>
            </div>`).join('')}
        </div>

        <div class="px-2 pb-5">
            <div class="flex gap-1 w-48">
                <div class="w-24">
                    <div class="flex gap-1">
                        <h3 class="uppercase text-[#5868A5] whitespace-nowrap font-medium" style="font-size:4px;">EDUCATION</h3>
                        <div class="mt-1.5 w-full border-t border-dotted border-gray-500"></div>
                    </div>
                    <div class="px-1">
                    ${this.getEducationDetails.map((detail: any) =>
        `<p class="font-semibold text-black" style="font-size:4px;">${detail.collegeName}</p>
                    <p class="font-normal text-[#010101]" style="font-size:4px;">${detail.qualification},
                    ${detail.endDate}</p>
                    <p class="font-medium text-[#010101]" style="font-size:4px;">Graduated magna cum laude</p>`).join('')}
                </div>
                </div>
                <div class="w-24">
                    <div class="flex gap-1">
                        <h3 class="uppercase text-[#5868A5] whitespace-nowrap font-medium" style="font-size:4px;">ADDITIONAL
                            SKILLS
                        </h3>
                        <div class="mt-1.5 w-full border-t border-dotted border-gray-500"></div>
                    </div>
                    <ul class="px-1 list-disc">
                    ${this.skillgetData.map((detail: any) =>
          `<li class="font-semibold text-black" style="font-size:4px;">${detail.skillName}
                        </li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    </body>
    
    </html>`; // Replace with your HTML code

    const doc = new jsPDF();
    doc.html(htmlCode, {
      callback: function (doc) {
        doc.save('downloaded.pdf'); // Provide a desired filename for the downloaded PDF
      }
    });
  }
  // <li class="font-normal text-[#010101]" style="font-size:4px;">Bilingual in Spanish and English</li>
  //                         <li class="font-medium text-[#010101]" style="font-size:4px;">Web and tech savvy, require little to no
  //                             training</li>
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
