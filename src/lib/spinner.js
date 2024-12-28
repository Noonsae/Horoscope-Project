import Spinner from 'basic-loading';

export default function loading() {
  const option = {
    size: 50
  };

  return <Spinner option={option} />;
}
