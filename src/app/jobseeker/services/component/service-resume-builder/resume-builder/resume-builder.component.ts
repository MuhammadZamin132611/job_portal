import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ProfileBasicDetailsService } from 'src/app/jobseeker/dashboard/components/jobseeker-profile/Services/profile-basic-details.service';
import { DashboardJobsService } from 'src/app/jobseeker/dashboard/services/dashboard-jobs.service';
import { ProfileLanguageService } from 'src/app/jobseeker/dashboard/services/profile-language.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ProfileEducationService } from 'src/app/jobseeker/dashboard/components/jobseeker-profile/Services/profile-education.service';
import { JobExperienceService } from 'src/app/jobseeker/dashboard/components/jobseeker-profile/Services/job-experience.service';
import { CertificateService } from 'src/app/jobseeker/dashboard/components/jobseeker-profile/Services/certificate.service';
import { EditProjectService } from 'src/app/jobseeker/dashboard/components/jobseeker-profile/components/profile-project/services/edit-project.service';
import { AddAchievementService } from 'src/app/jobseeker/dashboard/components/jobseeker-profile/components/profile-achievements/services/add-achievement.service';


interface MyData {
  rating: number;
  skillId: string;
  skillName: string;
  skillType: string | null;
}

@Component({
  selector: 'app-resume-builder',
  templateUrl: './resume-builder.component.html',
  styleUrls: ['./resume-builder.component.css']
})
export class ResumeBuilderComponent implements OnInit {
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
    private achiee:AddAchievementService) {
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
  storeImgPath:string='';

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
        <div class="flex mb-10">
            <div class="w-20 bg-blue-400 pb-10">
                <div class="flex place-content-center mt-2">
                    <img class="bg-white rounded-full h-5 w-5" src="" alt="">
                </div>
                <div class="px-1">
                    <h1 class="text-white font-semibold" style="font-size:4px;">${this.basicDetailsgetdata.name}</h1>
                    <h4 class="text-white font-medium" style="font-size:3.5px;">Software Developer</h4>
                    <div class="grid text-white">
                        <h4 class="text-white font-medium" style="font-size:3px;">${this.basicDetailsgetdata.email}</h4>
                        <h4 class="text-white font-medium" style="font-size:3px;">${this.basicDetailsgetdata.phoneNumber}</h4>
                        <h4 class="text-white font-medium" style="font-size:3px;">${this.basicDetailsgetdata.city}</h4>
                    </div>

                    <div class="grid">
                        <h1 class="text-white font-semibold" style="font-size:4px;">Skills</h1>
                        
                        <div class="grid grid-cols-2">
                            <div class="font-normal text-white" style="font-size:3px;">${this.skillArray}</div>
                        </div>
                       
                    </div>
                    <div class="grid">
                        <h1 class="text-white font-semibold" style="font-size:4px;">Languages</h1>
                        <div class="grid grid-cols-2">
                            <p class="font-normal text-white" style="font-size:3px;">${this.languageArray}</p>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div class="px-2">
                <div>
                    <div class="pt-2 text-gray-700 font-medium" style="font-size:6px;">About Me</div>
                    <div class="h-px w-2 bg-blue-600 rounded-lg mt-0.5"></div>
                    <p class="text-gray-700 font-normal w-36" style="font-size:4px;">${this.persionaleBio.personalDescription}
                    </p>
                </div>
                <div>
                    <div class="text-gray-700 font-medium" style="font-size:6px;">Education</div>
                    <div class="h-px w-2 bg-blue-600 rounded-lg mt-0.5"></div>
                    
                   
                  <div class="grid grid-cols-2">
                  ${this.getEducationDetails.map((detail: any) =>
                     ` <div class="text-gray-600 font-medium">
                     <p style="font-size:4px;">
                     ${detail.startDate} - ${detail.endDate} </p> 
                    
                      </div>
                      
                      <div>
                            <p class="text-blue-400 font-medium" style="font-size:4px;">${detail.course}</p>
                            <p class="text-blue-400 font-normal" style="font-size:4px;">${detail.collegeName}</p>
                            <p class="text-gray-600 font-medium" style="font-size:4px;">GPA:81.01</p>
                        </div>`).join('')}
                  </div>

                    
                </div>
                <div>
                    <div class="text-gray-700 font-medium" style="font-size:6px;">Work Experience</div>
                    <div class="h-px w-2 bg-blue-600 rounded-lg mt-0.5"></div>
                    <div class="grid grid-cols-2">
                    ${this.getallWorkExperience.map((detail: any) =>
                        `<div class="text-gray-600 font-medium">
                            <p style="font-size:4px;">${detail.startDate} - ${detail.endDate}</p>
                            <p style="font-size:4px;">${detail.location}</p>
                        </div>
                        <div>
                            <p class="text-blue-400 font-medium" style="font-size:4px;">${detail.companyName}</p>
                            <p class="text-blue-400 font-normal" style="font-size:4px;">${detail.jobTitle}</p>
                            <p class="text-gray-600 font-normal" style="font-size:4px;">${detail.description}</p>
                        </div>`).join('')}
                    </div>
                    
                </div>
                <div>
                    <div class="text-gray-700 font-medium" style="font-size:6px;">Projects</div>
                    <div class="h-px w-2 bg-blue-600 rounded-lg mt-0.5"></div>
                    <div>
                    ${this.projectsDetails.map((detail: any) =>
                        `<h3 class="text-blue-400 font-medium" style="font-size:4px;">Project Name</h3>
                        <h3 class="text-gray-600 font-medium" style="font-size:4px;">${detail.projectName}</h3>
                        <p class="text-gray-600 font-normal" style="font-size:4px;">${detail.projectDescription}</p>
                        <h3 class="text-blue-400 font-medium" style="font-size:4px;">Skill Used</h3>
                        <div class="flex gap-3">
                            <div class="text-gray-600 font-normal" style="font-size:4px;">${detail.skillsUsed}</div>
                        </div>
                        <h3 class="text-blue-400 font-medium" style="font-size:4px;">Project Location</h3>
                        <p class="text-gray-600 font-normal" style="font-size:4px;">${detail.location}</p>
                        <h3 class="text-blue-400 font-medium" style="font-size:4px;">Project URL</h3>
                        <p class="text-gray-600 font-normal" style="font-size:4px;">${detail.projectUrl}</p>
    
                        <h3 class="text-blue-400 font-medium" style="font-size:4px;">Role Description</h3>
                        <p class="text-gray-600 font-normal" style="font-size:4px;">${detail.roleDescription}</p>`).join('')}
                    </div>
                </div>
                <div>
                    <div class="text-gray-700 font-medium" style="font-size:6px;">Certifications</div>
                    <div class="h-px w-2 bg-blue-600 rounded-lg mt-0.5"></div>
                    ${this.getAllcertificates.map((detail: any) =>
                    `<p class="text-blue-600 font-semibold" style="font-size:4px;">${detail.certificationName}</p>
                    <p class="text-gray-600 font-semibold" style="font-size:4px;">${detail.issuedBy}</p>`).join('')}
                </div>
                <div>
                    <div class="text-gray-700 font-medium" style="font-size:6px;">Achivements</div>
                    <div class="h-px w-2 bg-blue-600 rounded-lg mt-0.5"></div>
                    ${this.Allachievement.map((detail: any) =>
                    `<p class="text-gray-600 font-medium" style="font-size:4px;">${detail.achievementName}</p>
                    <p class="text-gray-600 font-medium" style="font-size:4px;">${detail.achievementLevel}</p>
                    <p class="text-gray-600 font-medium" style="font-size:4px;">${detail.achievementDescription}</p>
                    <p class="text-gray-600 font-medium" style="font-size:4px;">${detail.achievementOrganization}</p>
                    <p class="text-gray-600 font-medium" style="font-size:4px;">${detail.award}</p>
                    <p class="text-gray-600 font-medium" style="font-size:4px;">${detail.date}</p>
                    <p class="text-gray-600 font-medium" style="font-size:4px;">${detail.teamPreference}</p>
                    <p class="text-gray-600 font-medium" style="font-size:4px;">${detail.skillsUsed}</p>`).join('')}
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


  data:any[]=[];
  Allachievement:any=[];
  getachievement(){
    this.achiee.getAchievement(this.profileId).subscribe((data:any)=>{
      this.Allachievement=data
      console.log("all achivement .....", this.Allachievement);
    })
  }
}
