export class educationDetails {
    // Qualification obtained (e.g., Bachelor's degree, Master's degree, etc.)
    qualification: string;
  
    // Name of the college or educational institution
    collegeName: string;
  
    // Name of the course or program of study
    course: string;
  
    // Specialization or major within the course (if applicable)
    specialization: string;
  
    // Type of the course (e.g., Regular, Distance, Online, etc.)
    courseType: string;
  
    // Indicates whether the education is currently being pursued (true if currently pursuing, false otherwise)
    currentlyPursuing: boolean = false;
  
    // Start date of the education program (in ISO 8601 date-time format)
    startDate: string = "2023-03-04T06:32:39.393Z";
  
    // End date of the education program (in ISO 8601 date-time format)
    endDate: string = "2023-03-04T06:32:39.393Z";
  
    // Expected year of passing or graduation
    passoutYear: string;
  }
  