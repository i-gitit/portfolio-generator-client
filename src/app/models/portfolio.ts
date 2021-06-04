export interface Portfolio {
    [key:string]:any;
    "username":string,
    "sections":Section,
    "About": {},
    "Skills": [],
    "Resume": {},
    "Projects":[],
    "Services":[],
    "Contact":{}
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