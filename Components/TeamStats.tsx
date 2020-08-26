import { ReactElement } from "react";
import { Typography, Row, Col, Card, Statistic } from "antd";
import { TeamOverview, Stats } from "../pages";

interface Props {
    teamStats: Stats;
    teamOverview: TeamOverview;
}

export default function TeamStats({teamStats, teamOverview}: Props): ReactElement {
    if(teamOverview) {
        const hrs = Math.floor(teamStats.duration / 60);
        let min: number | string = Math.floor(teamStats.duration % 60);
        min = min < 10 ? '0' + min : min;

        return <>
            <Typography.Title>Team Statistik</Typography.Title>
            <Row gutter={[{ xs: 8, sm: 16, lg: 24 }, { xs: 8, sm: 16, lg: 24 }]} align="middle">
                <Col className="gutter-row" xs={12} md={8} lg={4}>
                    <Card style={{boxShadow: '2px 2px 15px 0 rgba(0,0,0,.1)'}}>
                        <Statistic
                            title="Spiele"
                            value={teamOverview.matchCount}
                            precision={0}
                            valueStyle={{ color: '#555' }}
                        />
                    </Card>
                </Col>
                <Col className="gutter-row" xs={12} md={8} lg={4}>
                    <Card style={{boxShadow: '2px 2px 15px 0 rgba(0,0,0,.1)'}}>
                        <Statistic
                            title="Gewonnen"
                            value={teamOverview.matchWins}
                            precision={0}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                <Col className="gutter-row" xs={12} md={8} lg={4}>
                    <Card style={{boxShadow: '2px 2px 15px 0 rgba(0,0,0,.1)'}}>
                        <Statistic
                            title="Gewinnrate"
                            value={Math.floor((teamOverview.matchWins * 100) / teamOverview.matchCount)}
                            precision={0}
                            valueStyle={{ color: '#cf1322' }}
                            suffix={'%'}
                        />
                    </Card>
                </Col>
                <Col className="gutter-row" xs={12} md={8} lg={4}>
                    <Card style={{boxShadow: '2px 2px 15px 0 rgba(0,0,0,.1)'}}>
                        <Statistic
                            title="Durchschnittliche Spielzeit"
                            value={hrs + ':' + min}
                            precision={0}
                            valueStyle={{ color: 'rgb(102, 19, 207)' }}
                        />
                    </Card>
                </Col>
            </Row>
    
        </>;
    }


    return <></>;
}