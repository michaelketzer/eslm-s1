import { ReactElement } from "react";
import {promises as fs} from 'fs';
import { TeamStats } from "..";
import TopPicks from "../../Components/TopPicks";

//#region <interface>
interface PickBan {
    isPick: boolean;
    heroId: number;
    order: number;
    bannedHeroId: number;
    isRadiant: boolean;
    playerIndex: number;
    wasBannedSuccessfully: boolean;
}

interface HeroPlayer {
    matchId: number;
    playerSlot: number;
    heroId: number;
    steamAccountId: number;
    isRadiant: boolean;
    numKills: number;
    numDeaths: number;
    numAssists: number;
    leaverStatus: number;
    numLastHits: number;
    numDenies: number;
    goldPerMinute: number;
    experiencePerMinute: number;
    level: number;
    gold: number;
    goldSpent: number;
    heroDamage: number;
    towerDamage: number;
    isRandom: boolean;
    lane: number;
    intentionalFeeding: boolean;
    role: number;
    imp: number;
    award: number;
    item0Id: number;
    item1Id: number;
    item3Id: number;
    item4Id: number;
    behavior: number;
    heroHealing: number;
    roamLane: number;
    isVictory: boolean;
    networth: number;
    neutral0Id: number;
    imp2: number
}

export interface LeagueMatch {
    id: number;
    didRadiantWin: boolean;
    durationSeconds: number;
    startDateTime: number;
    clusterId: number;
    firstBloodTime: number;
    lobbyType: number;
    numHumanPlayers: number;
    gameMode: number;
    replaySalt: number;
    isStats: boolean;
    avgImp: number;
    parsedDateTime: number;
    statsDateTime: number;
    leagueId: number;
    radiantTeamId: number;
    direTeamId: number;
    seriesId: number;
    gameVersionId: number;
    regionId: number;
    sequenceNum: number;
    rank: number;
    bracket: number;
    endDateTime: number;
    analysisOutcome: number;
    predictedOutcomeWeight: number;
    pickBans: Array<PickBan>;
    players: Array<HeroPlayer>;
}
//#endregion

const Team = ({teamId, teamMatches}: {teamId: number; teamMatches: LeagueMatch[]}): ReactElement => {
    return <>
        <TopPicks matches={teamMatches} teamId={teamId}/>
    </>
}

export async function getStaticPaths() {
    const rawTeams = await fs.readFile('./data/teams.json');
    const response: TeamStats = JSON.parse(rawTeams as unknown as string);
    const teamIds = Object.keys(response.leagueTeams);

  return {
    paths: teamIds.map((teamId) => ({params: {teamId}})),
    fallback: false,
  };
}

export async function getStaticProps({params: {teamId}}) {
    const rawMatches = await fs.readFile('./data/matches.json');
    const allMatches: LeagueMatch[] = JSON.parse(rawMatches as unknown as string);
    const teamMatches = allMatches.filter(({radiantTeamId, direTeamId}) => direTeamId === +teamId || radiantTeamId === +teamId);

    return {
      props: {
          teamMatches,
          teamId: +teamId,
      },
    }
  }
  

export default Team;