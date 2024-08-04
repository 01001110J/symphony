import Stars from '@layouts/Stars';
import Container from '@layouts/Container';

import SongEditor from '@components/SongLab/SongEditor';
import SongForm from '@components/SongLab/SongForm';

const f = true;

import './SongLab.css';

const SongLab = () => {
  return (
    <Container>
      {f ? (
        <SongEditor />
      ) : (
        <>
          <Stars /> <SongForm />
        </>
      )}
    </Container>
  );
};

export default SongLab;
