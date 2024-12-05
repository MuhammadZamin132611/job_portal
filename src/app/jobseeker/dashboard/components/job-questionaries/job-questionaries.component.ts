import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardJobsService } from '../../services/dashboard-jobs.service';
import { HomeService } from '../../services/home.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-job-questionaries',
  templateUrl: './job-questionaries.component.html',
  styleUrls: ['./job-questionaries.component.css']
})



export class JobQuestionariesComponent implements OnInit {
  isPopupVisible2 = false;
  togglePopup2() {

    this.isPopupVisible2 = !this.isPopupVisible2;

  }


  isPopupVisible3 = false;
  togglePopup3() {
    this.isPopupVisible3 = !this.isPopupVisible3;
  }
  constructor(private location1: Location,
    private router: ActivatedRoute,
    private route: Router,
    private job: DashboardJobsService,
    private api: HomeService,) { }
  goBack(): void {
    this.location1.back();
  }


  ngOnInit(): void {
    this.router.queryParams.subscribe((params: any) => {
      this.requirementId = params.requirementId;
    });
    console.log('Requirement id', this.requirementId)
    this.profileId = localStorage.getItem('profileID');
    this.requirementDetails()
  }

  requirementId: string = '';
  profileId: string | null = '';
  storeQuestions: any;

  requirementDetails = () => {
    this.job.getReqDetails(this.profileId, this.requirementId).subscribe({
      next: (data: any) => {
        console.log(data, "Requirements collected");
        this.storeQuestions = data.questions
        console.log(this.storeQuestions, "Store Questions are :-")
        this.jobseeker()
        console.log(this.storeShortAnswer, "1111")
        console.log(this.storemultipleChoice, "222")
        console.log(this.storeDropdown, "333")
        console.log(this.storeCheckbox, "444")
      },
      error: (error: any) => {
        console.log(error, "Error occurred");
      }
    });
  }

  storeShortAnswer: any[] = [];
  storemultipleChoice: any[] = [];
  storeDropdown: any[] = []
  storeCheckbox: any[] = [];

  jobseeker() {
    // console.log(this.storeQuestions, "jobseekerrrr")
    // console.log(this.storeQuestions.shortAnswer, "jobseekerrrr")
    for (let i = 0; i < this.storeQuestions.length; i++) {
      const quesType = this.storeQuestions[i].shortAnswer
      console.log(this.storeQuestions[i].shortAnswer, "jobseekerrrr")
      if (quesType === 'Short Answer') {
        this.storeShortAnswer.push(this.storeQuestions[i])
      }
      else if (quesType === 'Multiple Choice') {
        this.storemultipleChoice.push(this.storeQuestions[i])
      }
      else if (quesType === 'Dropdown') {
        this.storeDropdown.push(this.storeQuestions[i])
      }
      else if (quesType === 'Checkboxes' || quesType === 'Dropdown') {
        this.storeCheckbox.push(this.storeQuestions[i])
      }
      else {
        console.log("Short answer not matching")
      }
    }
  }


  storeShortAnswer1: Answer[] = [
    {

      questionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      answers: []
    }
  ]

  inputValues = [''];

  // Function to handle input changes
  inputbox(event: any, questionId: string, index: number) {
    const value = event.target.value;

    // Check if the object at the specified index exists
    if (!this.storeShortAnswer1[index]) {
      // If it doesn't exist, create a new object and add it to the array
      this.storeShortAnswer1[index] = {
        questionId: questionId,
        answers: [value]
      };
    } else {
      // If it exists, update the answers property
      this.storeShortAnswer1[index].answers = [value];
    }

    console.log(this.storeShortAnswer1, questionId);
  }

  // Component class
  // Component class
  storemultipleChoice1: any[] = [];
  storeShortAnswer2: Answer[] = [];

  handleCheckboxChange(questionId: string, option: string, isChecked: any) {
    const index = this.storeShortAnswer2.findIndex(answer => answer.questionId === questionId);

    if (isChecked.checked) {
      if (index === -1) {
        // If the object doesn't exist, create a new object and add it to the storeShortAnswer2 array
        this.storeShortAnswer2.push({
          questionId: questionId,
          answers: [option]
        });
      } else {
        // If the object already exists, add the option to its answers array
        this.storeShortAnswer2[index].answers.push(option);
      }
    } else {
      // If the checkbox is unchecked, remove the option from the answers array
      if (index !== -1) {
        const optionIndex = this.storeShortAnswer2[index].answers.indexOf(option);
        if (optionIndex !== -1) {
          this.storeShortAnswer2[index].answers.splice(optionIndex, 1);
        }

        // If no options are selected for the question, remove the object from storeShortAnswer2
        if (this.storeShortAnswer2[index].answers.length === 0) {
          this.storeShortAnswer2.splice(index, 1);
        }
      }
    }

    console.log(this.storeShortAnswer2);
  }

  isSelected(questionId: string, option: string): boolean {
    const selectedQuestion = this.storeShortAnswer2.find(answer => answer.questionId === questionId);
    return selectedQuestion ? selectedQuestion.answers.includes(option) : false;
  }


  // Create the storeCheckbox1 array
  storeCheckbox1: Answer[] = [];


  // Method to check if a radio button is selected
  isRadioButtonSelected(questionId: string, option: string): boolean {
    const answers = this.getAnswersByQuestionId(questionId);
    return answers.includes(option);
  }

  // Method to handle radio button change
  handleRadioButtonChange(questionId: string, option: string) {
    const index = this.storeCheckbox1.findIndex(answer => answer.questionId === questionId);

    if (index === -1) {
      // If the object doesn't exist, create a new object and add it to the storeCheckbox1 array
      this.storeCheckbox1.push({
        questionId: questionId,
        answers: [option]
      });
    } else {
      // If the object already exists, update the answers array
      this.storeCheckbox1[index].answers = [option];
    }

    console.log(this.storeCheckbox1);
  }

  // Method to retrieve answers for a specific question
  getAnswersByQuestionId(questionId: string): string[] {
    const question = this.storeCheckbox1.find(answer => answer.questionId === questionId);
    return question ? question.answers : [];
  }

  finalResult: any[] = []

  finalAnswer = () => {
    this.finalResult = [...this.storeShortAnswer1, ...this.storeShortAnswer2, ...this.storeCheckbox1]
    console.log(this.finalResult)
    this.apply()
  }


  apply() {
    this.api.applyJob(this.profileId, this.requirementId, this.storeShortAnswer1).subscribe((res: any) => {
      console.log(res, "Job appliedddd");
      this.api.answerPost(this.profileId, this.requirementId, this.finalResult).subscribe((ans) => {
        console.log(ans, "Answer Posted")
        this.route.navigate(['/jobs'])
      })
    });
  }


  formData = {
    requiredField: '',
    optionalField: ''
  };


  isRequiredField(value: string): boolean {
    return value === 'YES';
  }


  submitForm(form: NgForm) {
    if (form.valid) {
      // console.log(this.arr1);
      console.log("Form validated");
      // (click)="togglePopup3()"
      this.togglePopup3();
      // You can send the form data to an API or perform any other actions here
    } else {
      console.log( "form is invalid");
    }
  }




}

interface Answer {
  questionId: string;
  answers: string[];
}
