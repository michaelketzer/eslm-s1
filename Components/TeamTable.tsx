import { ReactElement, useState, useMemo } from "react";
import { MappedTeamStats } from "../pages";
import {Input, Table} from 'antd';

const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text, record) => <>{text.length > 0 && <img src={text} alt={'logo-' + record.name} width={80} />}</>,
      width: '100px',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Punkte',
      dataIndex: 'points',
      key: 'points',
      sorter: (a:MappedTeamStats, b: MappedTeamStats) => a.points - b.points,
      defaultSortOrder: 'descend',
      width: '100px',
    },
    {
        title: 'Spiele',
        dataIndex: 'games',
        key: 'games',
        render: (_text, record: MappedTeamStats) => <>
            {record.matchWins} - {record.matchCount} <span className={'weak'}>{Math.round((record.matchWins * 100) / record.matchCount)}%</span>
        </>,
        sorter: (a:MappedTeamStats, b: MappedTeamStats) => a.matchCount - b.matchCount,
        width: '150px'
    }
];

export default function TeamTable({teams}: {teams: MappedTeamStats[]}): ReactElement {
    const [search, setSearch] = useState('');

    const filtered = useMemo(() => teams.filter(({name}) => name.toLocaleLowerCase().includes(search.toLocaleLowerCase())), [teams, search]);

    return <>
        <div className={'filter'}>
            <Input.Search onChange={(e) => setSearch(e.target.value)} value={search} placeholder={'Suche Team...'} style={{width: '200px'}} />
        </div>
        <br />
        <br />

        {/**
         @ts-ignore */}
        <Table dataSource={filtered} columns={columns} rowKey={'teamId'} pagination={false} />
    </>;
}