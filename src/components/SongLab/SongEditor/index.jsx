import { Tabs } from 'antd';

import Header from '@components/Header';

import Resources from '@components/SongLab/Resources';
import Composer from '@components/SongLab/Composer';
import Editor from '@components/SongLab/Editor';

const items = [
  {
    key: '1',
    label: 'Recursos',
    children: <Resources />,
  },
  {
    key: '2',
    label: 'Compositor',
    children: <Composer />,
  },
];

const SongEditor = () => {
  return (
    <section className="flex flex-col w-full min-h-[calc(100vh-96px)] px-5">
      <Header />
      <div className="flex flex-col px-5 md:flex-row bg-slate-300 dark:bg-[#1e293b99] rounded-xl">
        <Tabs defaultActiveKey="1" className="w-full md:w-[500px] pt-10" items={items} />
        <Editor />
      </div>
    </section>
  );
};

export default SongEditor;
