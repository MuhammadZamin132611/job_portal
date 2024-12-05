export class locationDetails {
  // Primary location of the user (e.g., City, State, or Country)
  primaryLocation: string;

  // Pin code or postal code of the primary location
  pinCode: number;

  // Secondary location (optional, e.g., additional address details)
  secondaryLocation: string;

  // Array of other preferred locations (e.g., cities or areas the user prefers)
  otherPreferedLocation: string[];
}

export class LaungageDetails {
  // Array of languages the user knows or is proficient in
  languages: string[] = [];

  // Fluency level in the specified languages (e.g., Fluent, Intermediate, Basic, etc.)
  fluency: string;
}
