import { ReactElement, useMemo, Fragment } from "react";
import { LeagueMatch } from "../pages/team/[teamId]";
import Hero from "./Hero";
import {Card, Col, Row, Typography} from 'antd';
import { requireHeroStats, getPhase } from "./TopPicks";

interface HeroStats {
    games: number;
    won: number;
    phase1: number;
    phase2: number;
    phase3: number;
}

export default function TopBans({matches, teamId}: {matches: LeagueMatch[]; teamId: number}): ReactElement {
    const pickStats = useMemo(() => {
        return matches.reduce<{[x: string]: HeroStats}>((acc, match) => {
            const {pickBans, radiantTeamId, didRadiantWin} = match;
            const wasRadiant = teamId === radiantTeamId;

            pickBans.forEach(({order, isPick, heroId, isRadiant}) => {
                if(!isPick && isRadiant !== wasRadiant) {
                    const stats = requireHeroStats(heroId, acc);
                    stats.games = stats.games + 1;
                    const phase = getPhase(order, match.gameVersionId);
                    if(phase === 1) {
                        stats.phase1 = stats.phase1 + 1;
                    } else if(phase === 2) {
                        stats.phase2 = stats.phase2 + 1;
                    } else {
                        stats.phase3 = stats.phase3 + 1;
                    }
                }
            });
            return acc;
        }, {})
    }, [matches]);

    const topBans = useMemo(() => {
        return Object.entries(pickStats).sort(([, {games: a}], [, {games: b}]) => b - a).slice(0, 15).map(([id, data]) => ({id, ...data}));
    }, [pickStats]);
    const topBansFirstPhase = useMemo(() => {
        return Object.entries(pickStats).sort(([, {phase1: a, games: gA}], [, {phase1: b, games: gB}]) => b - a || gB - gA).slice(0, 5).map(([id, data]) => ({id, ...data}));
    }, [pickStats]);
    const topBansSecondPhase = useMemo(() => {
        return Object.entries(pickStats).sort(([, {phase2: a, games: gA}], [, {phase2: b, games: gB}]) => b - a || gB - gA).slice(0, 5).map(([id, data]) => ({id, ...data}));
    }, [pickStats]);
    const topBansThirdPhase = useMemo(() => {
        return Object.entries(pickStats).sort(([, {phase3: a, games: gA}], [, {phase3: b, games: gB}]) => b - a || gB - gA).slice(0, 5).map(([id, data]) => ({id, ...data}));
    }, [pickStats]);

    return <>
        <Typography.Title>Statistiken zu Bans gegen das Team</Typography.Title>
        <Row gutter={[{ xs: 8, sm: 16, lg: 24 }, { xs: 8, sm: 16, lg: 24 }]} align="middle">
            <Col className="gutter-row" xs={24} md={24} lg={12} xl={8}>
                <Card style={{boxShadow: '2px 2px 15px 0 rgba(0,0,0,.1)'}} title={<div className={'header'}>
                    <div>Am häufigsten gegen das Team gebannt</div>
                    <div className={'weak'}>{matches.length} {matches.length === 1 ? 'Spiel' : 'Spiele'}</div>
                </div>}>
                    <div className={'topPicks'}>
                        {topBans.map(({id, games}, idx) => <Fragment key={id}>
                            <Hero id={id} key={id} pos={idx + 1} addition={<div className={'right'}>{games} {games === 1 ? 'Spiel' : 'Spiele'}</div>}/>
                        </Fragment>)}
                    </div>
                </Card>
            </Col>
            <Col xs={24} sm={24} lg={12} xl={16}>
                <Row gutter={[{ xs: 8, sm: 16, lg: 24 }, { xs: 8, sm: 16, lg: 24 }]}>
                    <Col className="gutter-row" xs={24} sm={12} lg={24} xl={12}>
                    <Card style={{boxShadow: '2px 2px 15px 0 rgba(0,0,0,.1)'}} title={<div className={'header'}>
                            <div>Am häufigsten in der 1. Phase</div>
                            <div className={'weak'}>aus Bans</div>
                        </div>}>
                            <div className={'topPicks'}>
                                {topBansFirstPhase.map(({id, phase1, games}, idx) => <Fragment key={id}>
                                    <Hero id={id} key={id} pos={idx + 1} addition={<div className={'right'}>{phase1} aus {games}</div>}/>
                                </Fragment>)}
                            </div>
                        </Card>
                    </Col>
                    <Col className="gutter-row" xs={24} sm={12} lg={24} xl={12}>
                        <Card style={{boxShadow: '2px 2px 15px 0 rgba(0,0,0,.1)'}} title={<div className={'header'}>
                                <div>Am häufigsten in der 2. Phase</div>
                                <div className={'weak'}>aus Bans</div>
                            </div>}>
                            <div className={'topPicks'}>
                                {topBansSecondPhase.map(({id, phase2, games}, idx) => <Fragment key={id}>
                                    <Hero id={id} key={id} pos={idx + 1} addition={<div className={'right'}>{phase2} aus {games}</div>}/>
                                </Fragment>)}
                            </div>
                        </Card>
                    </Col>
                    <Col className="gutter-row" xs={24} sm={12} lg={24} xl={12}>
                        <Card style={{boxShadow: '2px 2px 15px 0 rgba(0,0,0,.1)'}} title={<div className={'header'}>
                                <div>Am häufigsten in der 3. Phase</div>
                                <div className={'weak'}>aus Bans</div>
                            </div>}>
                            <div className={'topPicks'}>
                                {topBansThirdPhase.map(({id, phase3, games}, idx) => <Fragment key={id}>
                                    <Hero id={id} key={id} pos={idx + 1} addition={<div className={'right'}>{phase3} aus {games}</div>}/>
                                </Fragment>)}
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>


        <style jsx>{`        
            .header {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .topPicks {
                display: grid;
                grid-template-columns: max-content 56px max-content 1fr;
                align-items: center;
                grid-column-gap: 10px;
                grid-row-gap: 5px;
            }

            .right {
                text-align: right;
            }

            .weak {
                font-size: 12px;
                color: #999;
            }
        `}</style>
    </>;
} 