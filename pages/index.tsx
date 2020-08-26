import { ReactElement } from "react";
import {promises as fs} from 'fs';
import TeamTable from "../Components/TeamTable";
import Head from 'next/head';

//#region <teams>
export interface TeamOverview {
    index: number;
    teamId: number;
    seriesCount: number;
    seriesWins: number;
    matchCount: number;
    matchWins: number;
    tmp: number;
}
interface Stats {
    index: number;
    teamId: number;
    kills: number;
    deaths: number;
    assists: number;
    cs: number;
    gpm: number;
    xpm: number;
    heal: number;
    heroDamage: number;
    towerDamage: number;
    duration: number;
}
interface TeamHeroes {
    index: number;
    teamId: number;
    values: Array<{
        heroId: number;
        matchCount: number;
        matchWins: number;
        imp: number;
    }>;
}
interface PlayerHero {
    index: number;
    steamId: number;
    values: Array<{
        heroId: number;
        matchCount: number;
        matchWins: number;
        imp: number;
    }>;
}

interface PlayerOverview {
    index: number;
    steamId: number;
    points: number;
    earnings: number;
    seriesCount: number;
    seriesWins: number;
    matchCount: number;
    matchWins: number;
    imp: number;
}

interface PlayerStats {
    index: number;
    steamId: number;
    kills: number;
    deaths: number;
    assists: number;
    cs: number;
    gpm: number;
    xpm: number;
    heal: number;
    heroDamage: number;
    towerDamage: number;
    killContribution: number;
}

export interface LeaguePlayer {
    id: number;
    steamId: number;
    lastActiveTime: string;
    profileUri: string;
    realName: string;
    timeCreated: number;
    countryCode: string;
    cityId: number;
    communityVisibleState: number;
    name: string;
    avatar: string;
    primaryClanId: number;
    soloRank: number;
    partyRank: number;
    isDotaPlusSubscriber: boolean;
    dotaPlusOriginalStartDate: number;
    isAnonymous: boolean;
    isStratzAnonymous: boolean;
    seasonRank: number;
    seasonLeaderboardRank: number;
    seasonLeaderboardDivisionId: number;
    proSteamAccount?: {
        steamId: number;
        name: string;
        fantasyRole: number;
        teamId: number;
        sponsor: string;
        isLocked: boolean;
        isPro: boolean;
        totalEarnings: number;
        tiWins: number;
        isTIWinner: boolean
    };
    smurfFlag: number;
    smurfCheckDate: number;
    lastMatchDateTime: number;
    lastMatchRegionId: number;
}

export interface TeamStats {
    leagueTableTeam: {
        overview: Array<TeamOverview>;
        stats: Array<Stats>;
        teamCount: number;
        heroes: Array<TeamHeroes>;
    }
    leagueTablePlayer: {
        overview: Array<PlayerOverview>;
        stats: Array<PlayerStats>;
        playerCount: number;
        heroes: Array<PlayerHero>;

    };
    leagueTeams: {
        [x: string]: {
            name: string;
            avatar: string;
            points?: number;
        };
    };
    leaguePlayers: {
        [x: string]: LeaguePlayer;
    }
}

export interface MappedTeamStats {
    teamId: number;
    name: string;
    avatar: string;
    matchCount: number;
    matchWins: number;
    kills: number;
    deaths: number;
    assists: number;
    cs: number;
    gpm: number;
    xpm: number;
    heal: number;
    heroDamage: number;
    towerDamage: number;
    duration: number;
    points: number;
}
//#endregion

const points = {
    1055544: 42,
    4448822: 24,
    7734344: 33,
    7750343: 42,
    7766084: 0,
    7871207: 18,
    7938593: 9,
    7958903: 36,
    7976730: 54,
    7978292: 39,
    7978409: 45,
    7979749: 18,
};

const Index = ({teams}: {teams: MappedTeamStats[]}): ReactElement => {
    return <>
        <Head>
            <title>ESLM Season 1 - Streamdota</title>
            <meta charSet="UTF-8" />
            <meta name="google" content="notranslate" />
            <meta httpEquiv="Content-Language" content="de" />
            <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />

            <meta property="og:site_name" content="StreamDota - Your toolbox for streaming dota"/>
            <meta property="og:title" content={'Dota bot, overlays, stats & more'}/>
            <meta property="og:description" content={'Your toolbox for streaming dota2 | Dota Win Loss Overlay | Bet System | Roshan Timer | Live Stats of Picks & Bans | and much more...'}/>
            <meta property="og:image" content={'/shared/share.png'}/>
            <meta property="og:url" content="https://streamdota.com/"/>
            <meta property="og:type" content="website"/>
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="description" content="Your toolbox for streaming dota2 | Dota Win Loss Overlay | Bet System | Roshan Timer | Live Stats of Picks & Bans | and much more..."/>

            <link rel="apple-touch-icon" sizes="180x180" href="/shared/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/shared/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/shared/favicon-16x16.png" />
            <link rel="manifest" href="/shared/site.webmanifest" />
            <link rel="mask-icon" href="/shared/safari-pinned-tab.svg" color="#5bbad5" />
            <link rel="shortcut icon" href="/shared/favicon.ico" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="msapplication-config" content="/shared/browserconfig.xml" />
            <meta name="theme-color" content="#ffffff" />
        </Head>
        <TeamTable teams={teams} />
    </>;
}

export async function getStaticProps() {
    const rawTeams = await fs.readFile('./data/teams.json');
    const response: TeamStats = JSON.parse(rawTeams as unknown as string);

    const teams = response.leagueTableTeam.overview.map(({teamId, matchCount, matchWins}) => {
        const teamStats = response.leagueTableTeam.stats.find(({teamId: id}) => id === teamId);
        const teamInfo = response.leagueTeams[teamId];
        delete teamStats.index;

        return {
            name: teamInfo.name,
            avatar: teamInfo.avatar ?? '',
            points: points[teamId] ?? 0,
            matchCount,
            matchWins,
            ...teamStats
        }
    })


    return {
      props: {
        teams
      },
    }
  }
  

export default Index;