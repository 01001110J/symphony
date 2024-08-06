import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Divider, Empty, Upload } from 'antd';

import { CiFolderOn } from 'react-icons/ci';
import { BsFileEarmarkMusic } from 'react-icons/bs';

import { SongContext } from '@context/Song';

const Resources = () => {
  const { songList, playListEmitter, setSongList } = useContext(SongContext);

  const handleUpload = (info) => {
    const { file } = info;
    const url = URL.createObjectURL(file);
    const name = file.name;

    playListEmitter.emit('newtrack', file);

    if (url && name) {
      setSongList([
        ...songList,
        {
          name,
          url,
        },
      ]);
    }
  };

  const props = {
    name: 'file',
    customRequest: (e) => handleUpload(e),
    onChange: (info) => {
      if (info.file.status === 'done') {
        handleUpload(info.file);
      }
    },
    multiple: true,
    beforeUpload: (file) => {
      const isAudio = file.type.startsWith('audio/');
      if (!isAudio) {
        alert('Solo se permiten archivos de audio.');
      }
      return isAudio || Upload.LIST_IGNORE;
    },
  };

  // eslint-disable-next-line react/prop-types
  const ResourceItem = ({ name }) => (
    <div className="flex items-center w-full p-3">
      <BsFileEarmarkMusic className="mt-1" />
      <span className="px-3 ml-5 mr-10">{name}</span>
    </div>
  );

  return (
    <aside className="flex flex-col flex-1 h-full row-start-2 px-1 overflow-x-hidden overflow-y-auto ant-tabs-content bg-slate-200 rounded-xl dark:text-white">
      <h3 className="flex items-center my-3 text-lg font-bold ">
        <CiFolderOn className="mr-3" /> Tus recursos
      </h3>
      {songList.length === 0 && <Empty className="my-5" />}
      {songList.map(({ name, url }) => (
        <ResourceItem name={name} url={url} key={uuidv4()} />
      ))}
      <Divider />
      <h3 className="flex items-center text-lg font-bold">
        <CiFolderOn className="mr-3" /> Agrega nuevas pistas
      </h3>
      <Upload.Dragger {...props} showUploadList={false} accept="audio/*" className="mt-5">
        <p className="ant-upload-text">Sube tu canción o arrastra varios archivos de audio aquí.</p>
      </Upload.Dragger>
    </aside>
  );
};

export default Resources;
