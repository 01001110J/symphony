import { useContext } from 'react';
import Stars from '@layouts/Stars';
import Container from '@layouts/Container';

import SongEditor from '@components/SongLab/SongEditor';
import SongForm from '@components/SongLab/SongForm';

import { SongContext } from '@context/Song';

import './SongLab.css';

const SongLab = () => {
  const { showSongForm } = useContext(SongContext);

  return (
    <Container>
      {showSongForm ? (
        <>
          <Stars />
          <SongForm />
        </>
      ) : (
        <SongEditor />
      )}
    </Container>
  );
};

export default SongLab;
