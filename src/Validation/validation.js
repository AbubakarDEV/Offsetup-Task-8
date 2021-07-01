import * as yup from "yup"
import { FirstName, LastName, Title, Company, Phone, Email, textArea, Country, CompanyHQ, HearAbout, Revenue, Industry, TimeFrame, Marketing, Sales } from "./Validator";
export const userSchema = yup.object().shape({
  FName: FirstName().label("First Name"),
  LName: LastName().label("Last Name"),
  Title: Title().label("Title"),
  Company: Company().label("Company"),
  Phone: Phone(),
  Email: Email().label("Email"),
  textArea: textArea().label("Text Area"),
  Country: Country(),
  CompanyHQ: CompanyHQ(),
  HearAbout: HearAbout(),
  Revenue: Revenue(),
  Industry: Industry(),
  TimeFrame: TimeFrame(),
  Marketing: Marketing().label("Please Chose atleat one or"),
  Sales: Sales().label("Please Chose atleat one or"),

})