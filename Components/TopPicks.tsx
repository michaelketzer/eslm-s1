import { ReactElement, useMemo, Fragment } from "react";
import { LeagueMatch } from "../pages/team/[teamId]";
import Hero from "./Hero";
import {Card, Col, Row, Typography} from 'antd';

interface HeroStats {
    games: number;
    won: number;
    phase1: number;
    phase2: number;
    phase3: number;
}

export function requireHeroStats(heroId: number, acc: {[x: string]: HeroStats}): HeroStats {
    if(!acc[heroId]) {
        acc[heroId] = {
            games: 0,
            won: 0,
            phase1: 0,
            phase2: 0,
            phase3: 0,
        };
    }

    return acc[heroId];
}

export function getPhase(order: number, gameVersion: number): number {
    if(gameVersion <= 131) {
        return order < 12 ? 1 : (order < 18 ? 2 : 3);
    }
    return order < 8 ? 1 : (order < 18 ? 2 : 3);
}

export default function TopPicks({matches, teamId}: {matches: LeagueMatch[]; teamId: number}): ReactElement {
    const pickStats = useMemo(() => {
        return matches.reduce<{[x: string]: HeroStats}>((acc, match) => {
            const {pickBans, radiantTeamId, didRadiantWin} = match;
            const wasRadiant = teamId === radiantTeamId;
            const won = didRadiantWin === wasRadiant;;
        
            pickBans.forEach(({order, isPick, heroId, isRadiant}) => {
                if(isPick && wasRadiant === isRadiant) {
                    const stats = requireHeroStats(heroId, acc);
                    stats.games = stats.games + 1;
                    stats.won = stats.won + (won ? 1 : 0);
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

    const topPicks = useMemo(() => {
        return Object.entries(pickStats).sort(([, {games: a}], [, {games: b}]) => b - a).slice(0, 15).map(([id, data]) => ({id, ...data}));
    }, [pickStats]);
    const topWinRate = useMemo(() => {
        return Object.entries(pickStats).sort(
            ([, {games: gA, won: wA}], [, {games: gB, won: wB}]) => (gB > 3 && gA > 3 ? wB/gB - wA/gA : gB - gA) || gB - gA)
        .slice(0, 10).map(([id, data]) => ({id, ...data}));
    }, [pickStats]);
    const topPicksFirstPhase = useMemo(() => {
        return Object.entries(pickStats).sort(([, {phase1: a, games: gA}], [, {phase1: b, games: gB}]) => b - a || gB - gA).slice(0, 5).map(([id, data]) => ({id, ...data}));
    }, [pickStats]);
    const topPicksSecondPhase = useMemo(() => {
        return Object.entries(pickStats).sort(([, {phase2: a, games: gA}], [, {phase2: b, games: gB}]) => b - a || gB - gA).slice(0, 5).map(([id, data]) => ({id, ...data}));
    }, [pickStats]);
    const topPicksThirdPhase = useMemo(() => {
        return Object.entries(pickStats).sort(([, {phase3: a, games: gA}], [, {phase3: b, games: gB}]) => b - a || gB - gA).slice(0, 5).map(([id, data]) => ({id, ...data}));
    }, [pickStats]);

    return <>
        <Typography.Title>Statistiken zu Picks</Typography.Title>
        <Row gutter={[{ xs: 8, sm: 16, lg: 24 }, { xs: 8, sm: 16, lg: 24 }]} align="middle">
            <Col className="gutter-row" xs={24} md={24} lg={12} xl={8}>
                <Card title={<div className={'header'}>
                    <div>Am häufigsten gepickt</div>
                    <div className={'weak'}>{matches.length} Spiel(e)</div>
                </div>}>
                    <div className={'topPicks'}>
                        {topPicks.map(({id, games}, idx) => <Fragment key={id}>
                            <Hero id={id} key={id} pos={idx + 1} addition={<div className={'right'}>{games} Spiele</div>}/>
                        </Fragment>)}
                    </div>
                </Card>
            </Col>
            <Col xs={24} sm={24} lg={12} xl={16}>
                <Row gutter={[{ xs: 8, sm: 16, lg: 24 }, { xs: 8, sm: 16, lg: 24 }]}>
                    <Col className="gutter-row" xs={24} sm={12} lg={24} xl={12}>
                        <Card title={<div className={'header'}>
                            <div>Höchste Win Rate</div>
                            <div className={'weak'}>in Spielen</div>
                        </div>}>
                            <div className={'topPicks'}>
                                {topWinRate.map(({id, won, games}, idx) => <Fragment key={id}>
                                    <Hero id={id} key={id} pos={idx + 1} addition={<div className={'right'}>{Math.floor(won*100/games)}% in {games}</div>}/>
                                </Fragment>)}
                            </div>
                        </Card>
                    </Col>
                    <Col className="gutter-row" xs={24} sm={12} lg={24} xl={12}>
                    <Card title={<div className={'header'}>
                            <div>Am häufigsten in der 1. Phase</div>
                            <div className={'weak'}>aus Picks</div>
                        </div>}>
                            <div className={'topPicks'}>
                                {topPicksFirstPhase.map(({id, phase1, games}, idx) => <Fragment key={id}>
                                    <Hero id={id} key={id} pos={idx + 1} addition={<div className={'right'}>{phase1} aus {games}</div>}/>
                                </Fragment>)}
                            </div>
                        </Card>
                    </Col>
                    <Col className="gutter-row" xs={24} sm={12} lg={24} xl={12}>
                        <Card title={<div className={'header'}>
                                <div>Am häufigsten in der 2. Phase</div>
                                <div className={'weak'}>aus Picks</div>
                            </div>}>
                            <div className={'topPicks'}>
                                {topPicksSecondPhase.map(({id, phase2, games}, idx) => <Fragment key={id}>
                                    <Hero id={id} key={id} pos={idx + 1} addition={<div className={'right'}>{phase2} aus {games}</div>}/>
                                </Fragment>)}
                            </div>
                        </Card>
                    </Col>
                    <Col className="gutter-row" xs={24} sm={12} lg={24} xl={12}>
                        <Card title={<div className={'header'}>
                                <div>Am häufigsten in der 3. Phase</div>
                                <div className={'weak'}>aus Picks</div>
                            </div>}>
                            <div className={'topPicks'}>
                                {topPicksThirdPhase.map(({id, phase3, games}, idx) => <Fragment key={id}>
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