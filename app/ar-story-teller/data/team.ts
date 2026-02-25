interface TeamMember {
  name: string;
  role: string;
}

interface Team {
  title: string;
  members: TeamMember[];
}

const team: Team = {
  title: "The Team",
  members: [
    { name: "Antonio Aranda Eggermont", role: "Lead Designer & UX Engineer" },
    { name: "Ting Yen Wang", role: "Technology Manager AI/ML " },
    { name: "Erik Thornquist", role: "Sr. Software Engineer" },
    { name: "Sergio Torres", role: "Sr. Software Engineer" },
    { name: "Christina Vickers", role: "Software Engineer" },
    { name: "Jeffrey Li", role: "Sr. Software Engineer" },
    { name: "Nathan Bruno", role: "Sr. Software Engineer" },
  ],
};

export default team;
