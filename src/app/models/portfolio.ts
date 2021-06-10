export interface Portfolio {
    [key:string]:any;
    "url":string,
    "sections":Section,
    "About": About,
    "Skills": Skill[],
    "Resume": {
        "education": Education[],
        "experience":any
    },
    "Projects":Project[],
    "Services": Service[],
    "Contact":Contact
}

interface Section{
    [key:string]:any;
    "About": boolean,
    "Skills":boolean,
    "Resume": boolean,
    "Projects":boolean,
    "Services":boolean,
    "Contact":boolean
}

interface About{
    [key:string]:any;
    "profile": string,
    "dob": string,
    "city": string,
    "phone": string,
    "email": string,
    "degree": string,
    "freelance": string,
    "aboutSummary": string
}

interface Education{
    [key:string]:any;
    "courseName": any,
    "courseStart": any,
    "courseEnd": any,
    "institute": any,
    "detail": any
}

interface Skill{
    [key:string]:any;
    "skillName": string,
    "skillExpertise": any
}

interface Project{
    [key:string]:any;
    "title": string,
    "description": string,
    "link": string
}

interface Service{
    [key:string]:any;
    "title": string,
    "description": string
}

interface Contact{
    [key:string]:any;
    "email": string,
    "phone": string,
    "location": string,
    "socialMedia": {
        "twitter": string,
        "facebook": string,
        "instagram": string,
        "github": string,
        "linkedin": string
    }
}