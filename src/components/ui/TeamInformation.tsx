import Link from 'next/link';

const TeamInfo = ({ github, name }) => {
  return (
    <Link
      href={github}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-row justify-between items-center"
    >
      <span className="block w-[24px] h-[24px] mx-[5px] -indent-[9999rem] bg-no-repeat bg-center bg-cover rounded-[50%]">
        dev.{name}&#39;s github
      </span>
      <p className="font-medium">
        {name}
      </p>
    </Link>
  );
};

export default TeamInfo;
