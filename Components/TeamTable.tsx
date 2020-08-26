import { ReactElement, useState, useMemo } from "react";
import { MappedTeamStats } from "../pages";
import {Button, Input, Table, Tooltip} from 'antd';
import Link from 'next/link';
import accounting from 'accounting';

const important = new Set([7976730, 7978409, 7750343, 7978292])

const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text, record) => <>{text.length > 0 && <img src={text} alt={'logo-' + record.name} width={60} />}</>,
      width: '80px',
      fixed: 'left',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      width: '120px',
    },
    {
      title: 'Punkte',
      dataIndex: 'points',
      key: 'points',
      sorter: (a:MappedTeamStats, b: MappedTeamStats) => a.points - b.points,
      defaultSortOrder: 'descend',
      width: '100px',
      align:'center',
    },
    {
        title: 'Spiele',
        dataIndex: 'games',
        key: 'games',
        align:'center',
        render: (_text, record: MappedTeamStats) => <>
            {record.matchWins}/{record.matchCount} <span className={'weak'}>{Math.round((record.matchWins * 100) / record.matchCount)}%</span>

            <style jsx>{`
                .weak {
                    color: #999;
                    font-size: 12px;
                }
            `}</style>
        </>,
        sorter: (a:MappedTeamStats, b: MappedTeamStats) => a.matchCount > 2 && b.matchCount > 2 ? Math.round((a.matchWins * 100) / a.matchCount) - Math.round((b.matchWins * 100) / b.matchCount) : a.matchCount - b.matchCount,
        width: '150px',
    },
    {
        title: 'AVG',
        children: [
            {
              title: <Tooltip title="Kills"><div>Kills</div></Tooltip>,
              dataIndex: 'kills',
              key: 'kills',
              width: '80px',
              align:'center',
              render: (text) => <>{accounting.format(Math.round(text), 0, '.')}</>,
            },
            {
                title: <Tooltip title="Kills"><div>Deaths</div></Tooltip>,
              dataIndex: 'deaths',
              key: 'deaths',
              width: '80px',
              align:'center',
              render: (text) => <>{accounting.format(Math.round(text), 0, '.')}</>,
            },
            {
                title: <Tooltip title="Kills"><div>Assists</div></Tooltip>,
              dataIndex: 'assists',
              key: 'assists',
              width: '80px',
              align:'center',
              render: (text) => <>{accounting.format(Math.round(text), 0, '.')}</>,
            },
            {
              title: <Tooltip title="Last Hits"><div>CS</div></Tooltip>,
              dataIndex: 'cs',
              key: 'cs',
              width: '80px',
              align:'center',
              render: (text) => <>{accounting.format(Math.round(text), 0, '.')}</>,
            },
            {
              title: <Tooltip title="Gold pro Minute"><div>GPM</div></Tooltip>,
              dataIndex: 'gpm',
              key: 'gpm',
              width: '80px',
              align:'center',
              render: (text) => <>{accounting.format(Math.round(text), 0, '.')}</>,
            },
            {
              title: <Tooltip title="EXP pro Minute"><div>XPM</div></Tooltip>,
              dataIndex: 'xpm',
              key: 'xpm',
              width: '80px',
              align:'center',
              render: (text) => <>{accounting.format(Math.round(text), 0, '.')}</>,
            },
            {
              title: <Tooltip title="Healing"><div>Heal</div></Tooltip>,
              dataIndex: 'heal',
              key: 'heal',
              width: '80px',
              align:'center',
              render: (text) => <>{accounting.format(Math.round(text), 0, '.')}</>,
            },
            {
              title: <Tooltip title="Hero Damage"><div>H DMG</div></Tooltip>,
              dataIndex: 'heroDamage',
              key: 'heroDamage',
              width: '80px',
              align:'center',
              render: (text) => <>{accounting.format(Math.round(text), 0, '.')}</>,
            },
            {
              title: <Tooltip title="Tower Damage"><div>T DMG</div></Tooltip>,
              dataIndex: 'towerDamage',
              key: 'towerDamage',
              width: '80px',
              align:'center',
              render: (text) => <>{accounting.format(Math.round(text), 0, '.')}</>,
            },
            {
              title: 'Länge',
              dataIndex: 'duration',
              key: 'duration',
              width: '100px',
              align:'center',
              render: (text) => {
                  let hrs = Math.floor(+text / 60);
                  let min: string | number = Math.floor(+text % 60);
                  min = min < 10 ? '0' + min : min;

                  return `${hrs}:${min}`
              }
            },
        ],
    },
    {
        title: '',
        dataIndex: 'actions',
        key: 'actions',
        width: '100px',
        align:'center',
        fixed: 'right',
        render: (_text, record: MappedTeamStats) => <Link href={'/team/[teamId]'} as={'/team/' + record.teamId}><Button>Breakdown</Button></Link>
    },
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
        <Table rowSelection={{selectedRowKeys: important.values(), selections: false, columnWidth: 0}} dataSource={filtered} columns={columns} rowKey={'teamId'} pagination={false} scroll={{ x: 1600}} />
    </>;
}