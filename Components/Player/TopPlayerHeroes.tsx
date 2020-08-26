import { ReactElement, useMemo, Fragment } from "react";
import { LeagueMatch, HeroPlayer } from "../../pages/team/[teamId]";
import { LeaguePlayer } from "../../pages";
import Hero from "../Hero";

interface Props {
    matches: LeagueMatch[];
    player: LeaguePlayer;
}

export default function TopPlayerHeroes({matches, player}: Props): ReactElement {
    const topHeroes = useMemo(() => {
        const games = matches.reduce<HeroPlayer[]>((acc, match) => {
            const performance = match.players.find(({steamAccountId}) => steamAccountId === player.steamId);
            if(performance) {
                acc.push(performance);
            }
            return acc;
        }, []);

        const heroMap = games.reduce<{[x: string]: {games: number; won: number}}>((acc, hero) => {
            if(!acc[hero.heroId]) {
                acc[hero.heroId] = {
                    games: 0,
                    won: 0,
                };
            }

            acc[hero.heroId].games = acc[hero.heroId].games + 1;
            acc[hero.heroId].won = acc[hero.heroId].won + (hero.isVictory ? 1 : 0);

            return acc;
        }, {});

        return Object.entries(heroMap).sort(([, {games: a, won: aW}], [, {games: b, won: bW}]) => b - a || bW - aW).slice(0, 5).map(([id, stats]) => ({id, ...stats}));
    }, [matches, player]);

    return <div className={'heroGrid'}>
        {topHeroes.map((hero, idx) => <Fragment key={hero.id}>
            <Hero id={hero.id} pos={idx + 1} addition={<div className={'right'}><span className={'weak'}>{Math.floor((hero.won * 100) / hero.games)}%</span> {hero.games} {hero.games === 1 ? 'Spiel' : 'Spiele'}</div>}/>
        </Fragment>)}

        <style jsx>{`
            .heroGrid {
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
    </div>;
}