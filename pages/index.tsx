import { ReactElement } from "react";
import {promises as fs} from 'fs';
import TeamTable from "../Components/TeamTable";

//#region <teams>
interface TeamOverview {
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
    return <TeamTable teams={teams} />;
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