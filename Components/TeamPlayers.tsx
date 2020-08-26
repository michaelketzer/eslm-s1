import { ReactElement } from "react";
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

export default function TeamPlayers({players, playersInTeam, matches}: Props): ReactElement {
    return <>
        <Typography.Title>Spieler</Typography.Title>
        <Row gutter={[{ xs: 8, sm: 16, lg: 24 }, { xs: 8, sm: 16, lg: 24 }]} align="middle">
            {playersInTeam && playersInTeam.map((id) => <Col key={id} className="gutter-row" xs={24} md={12} lg={12} xl={8}>
                <Card title={<div className={'header'}>
                    <PlayerName player={players[id]} />
                </div>}>

                    <TopPlayerHeroes matches={matches} player={players[id]} />
                </Card>
            </Col>)}
        </Row>

    </>;
}