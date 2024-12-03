import { useEffect } from 'react';
import Content from '../../Components/Content/Content.jsx';

function Home() {
  useEffect(() => {
    document.title = "DoNation - Home";
  }, []);

  return (
    <Content />
  );
}

export default Home;
