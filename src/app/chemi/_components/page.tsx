// ssg
import { chemiData } from '../data/data';

const Chemi = () => {
  const stella2 = Object.values(chemiData);
  const stella = Object.keys(stella2[0]);
  console.log(stella2);

  return (
    <div>
      {stella.map((p, _) => {
        return <div key={_}>{p}</div>;
      })}
    </div>
  );
};

export default Chemi;
