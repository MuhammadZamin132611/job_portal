export interface dataModal {
    // Unique identifier for a user's profile
    profileId: string;

    // Full name of the user
    name: string;

    // Email address of the user
    email: string;

    // Gender of the user (e.g., Male, Female, Other)
    gender: string;

    // Date of birth of the user
    dateOfBirth: Date;

    // City or location where the user resides
    city: string;

    // Phone number of the user
    phoneNumber: string;
}

export interface dataModalNew {
    // Full name of the user
    name: string;

    // Email address of the user
    email: string;

    // Gender of the user (e.g., Male, Female, Other)
    gender: string;

    // Date of birth of the user in string format (e.g., "YYYY-MM-DD")
    dateOfBirth: string;

    // City or location where the user resides
    city: string;

    // Phone number of the user
    phoneNumber: string;
}
