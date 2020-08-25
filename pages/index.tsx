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
interface TeamStats {
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

interface TeamStats {
    leagueTableTeam: {
        overview: Array<TeamOverview>;
        stats: Array<TeamStats>;
        teamCount: number;
        heroes: Array<TeamHeroes>;
    }
    leagueTeams: {
        [x: string]: {
            name: string;
            avatar: string;
            points?: number;
        };
    };
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
            points: teamInfo.points ?? 0,
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