import TeamInfo from '../ui/TeamInformation';

const Footer = () => {
  const teamMembersInfo = [
    {
      name: '최민석',
      github: 'https://github.com/Noonsae'
    },
    {
      name: '정은혜',
      github: 'https://github.com/gracejelly125'
    },
    {
      name: '김민정',
      github: 'https://github.com/minjung7'
    },
    {
      name: '신상용',
      github: 'https://github.com/tkddyd0817'
    },
    {
      name: '박우석',
      github: 'https://github.com/wooseok-react7'
    },
    {
      name: '주호빈',
      github: 'https://github.com/Hobin-joo/'
    }
  ];

  return (
    // full-back

    <footer className="bg-[#000] w-full h-[200px] py-[40px]">
      {/* footer - inner */}
      <div className="mx-auto w-full h-full max-w-[600px] py-6 text-center flex flex-col items-center justify-around">
        {/* copyright text */}
        <p className="mb-[15px] ml-[30px] text-[#FFDA68] text-[16px]">
          @ Copyright 2024 pa5rangers. All rights reserved
        </p>
        {/* developer intro */}
        <div className="mx-auto flex justify-between text-[13px] text-[#FFDA68]">
          {teamMembersInfo.map((member) => (
            <TeamInfo key={member.github} name={member.name} github={member.github} />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
