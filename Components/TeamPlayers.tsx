import { ReactElement, CSSProperties } from "react";
import { TeamStats } from "../pages";
import { Typography, Row, Col, Card } from "antd";
import PlayerName from "./Player/PlayerName";
import { LeagueMatch } from "../pages/team/[teamId]";
import TopPlayerHeroes from "./Player/TopPlayerHeroes";

interface Props {
    playersInTeam: number[]; 
    players: TeamStats['leaguePlayers'];
    matches: LeagueMatch[];
}

const inactivePlayer = new Set([
    127248003,
    127617979,
    313198707,
    55649904,
    253261807,
    92322038,
]);

const inactiveStyle: CSSProperties = {
    filter: 'grayscale(80%)',
}

const activeStyle: CSSProperties = {
    boxShadow: '2px 2px 15px 0 rgba(0,0,0,.1)'
}

export default function TeamPlayers({players, playersInTeam, matches}: Props): ReactElement {
    return <>
        <Typography.Title>Spieler</Typography.Title>
        <Row gutter={[{ xs: 8, sm: 16, lg: 24 }, { xs: 8, sm: 16, lg: 24 }]} align="middle">
            {playersInTeam && playersInTeam.map((id) => <Col key={id} className="gutter-row" xs={24} md={12} lg={12} xl={8}>
                <Card title={<div className={'header'}>
                    <PlayerName player={players[id]} />
                </div>} style={inactivePlayer.has(id) ? inactiveStyle : activeStyle}>

                    <TopPlayerHeroes matches={matches} player={players[id]} />
                </Card>
            </Col>)}
        </Row>

    </>;
}