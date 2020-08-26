import { ReactElement } from "react";
import { Typography, Row, Col, Card, Statistic } from "antd";
import { TeamOverview } from "../pages";

interface Props {
    teamStats: TeamOverview;
}

export default function TeamStats({teamStats}: Props): ReactElement {
    if(teamStats) {
        return <>
            <Typography.Title>Team Statistik</Typography.Title>
            <Row gutter={[{ xs: 8, sm: 16, lg: 24 }, { xs: 8, sm: 16, lg: 24 }]} align="middle">
                <Col className="gutter-row" xs={12} md={8} lg={4}>
                    <Card>
                        <Statistic
                            title="Spiele"
                            value={teamStats.matchCount}
                            precision={0}
                            valueStyle={{ color: '#555' }}
                        />
                    </Card>
                </Col>
                <Col className="gutter-row" xs={12} md={8} lg={4}>
                    <Card>
                        <Statistic
                            title="Gewonnen"
                            value={teamStats.matchWins}
                            precision={0}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                <Col className="gutter-row" xs={12} md={8} lg={4}>
                    <Card>
                        <Statistic
                            title="Gewinnrate"
                            value={Math.floor((teamStats.matchWins * 100) / teamStats.matchCount)}
                            precision={0}
                            valueStyle={{ color: '#cf1322' }}
                            suffix={'%'}
                        />
                    </Card>
                </Col>
            </Row>
    
        </>;
    }


    return <></>;
}